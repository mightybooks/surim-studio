import https from "node:https";
import { URL } from "node:url";

const target = new URL("https://cert-test.kakaopay.com");

const certificateErrorCodes = new Set([
  "CERT_HAS_EXPIRED",
  "CERT_NOT_YET_VALID",
  "DEPTH_ZERO_SELF_SIGNED_CERT",
  "ERR_TLS_CERT_ALTNAME_INVALID",
  "SELF_SIGNED_CERT_IN_CHAIN",
  "UNABLE_TO_GET_ISSUER_CERT",
  "UNABLE_TO_GET_ISSUER_CERT_LOCALLY",
  "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
]);

const networkErrorCodes = new Set([
  "ECONNREFUSED",
  "ECONNRESET",
  "EAI_AGAIN",
  "ENETUNREACH",
  "ENOTFOUND",
  "ETIMEDOUT",
]);

function classifyError(error) {
  if (certificateErrorCodes.has(error.code)) return "certificate";
  if (networkErrorCodes.has(error.code)) return "network";
  if (error.message && /certificate|cert|issuer|self-signed|verify/i.test(error.message)) {
    return "certificate";
  }
  return "unknown";
}

const req = https.request(
  target,
  {
    method: "GET",
    timeout: 10_000,
    servername: target.hostname,
  },
  (res) => {
    res.resume();
    res.on("end", () => {
      console.log(
        `OK: HTTPS handshake succeeded for ${target.href} (HTTP ${res.statusCode}).`
      );
    });
  }
);

req.on("timeout", () => {
  req.destroy(Object.assign(new Error("Request timed out"), { code: "ETIMEDOUT" }));
});

req.on("error", (error) => {
  const type = classifyError(error);

  if (type === "certificate") {
    console.error(`CERTIFICATE_ERROR: ${error.code ?? "UNKNOWN"} - ${error.message}`);
    process.exitCode = 2;
    return;
  }

  if (type === "network") {
    console.error(`NETWORK_ERROR: ${error.code ?? "UNKNOWN"} - ${error.message}`);
    process.exitCode = 3;
    return;
  }

  console.error(`UNKNOWN_ERROR: ${error.code ?? "UNKNOWN"} - ${error.message}`);
  process.exitCode = 1;
});

req.end();
