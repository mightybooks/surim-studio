import "server-only";

export const MAX_CONTEST_FILE_SIZE = 5 * 1024 * 1024;

const MIME_BY_EXTENSION: Record<string, string[]> = {
  pdf: ["application/pdf"],
  hwp: ["application/x-hwp", "application/haansofthwp", "application/octet-stream"],
  hwpx: ["application/hwp+zip", "application/zip", "application/octet-stream"],
  doc: ["application/msword", "application/octet-stream"],
  docx: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  txt: ["text/plain"],
};

export function safeOriginalFileName(name: string) {
  const base = String(name).split(/[\\/]/).pop() ?? "submission";
  return base.replace(/[\u0000-\u001f\u007f]/g, "").replace(/[^\p{L}\p{N}._ -]/gu, "_").slice(0, 120);
}

export function getExtension(name: string) {
  return safeOriginalFileName(name).split(".").pop()?.toLowerCase() ?? "";
}

function startsWith(buffer: Buffer, signature: number[]) {
  return signature.every((value, index) => buffer[index] === value);
}

export function validateContestFile(file: File, allowedExtensions: readonly string[]) {
  if (file.size === 0) return "EMPTY_FILE";
  if (file.size > MAX_CONTEST_FILE_SIZE) return "FILE_TOO_LARGE";
  const extension = getExtension(file.name);
  if (!allowedExtensions.includes(extension)) return "INVALID_EXTENSION";
  const allowedMimes = MIME_BY_EXTENSION[extension] ?? [];
  if (!allowedMimes.includes(file.type.toLowerCase())) return "INVALID_MIME";
  return null;
}

export function validateContestSignature(extension: string, buffer: Buffer) {
  if (extension === "pdf") return startsWith(buffer, [0x25, 0x50, 0x44, 0x46, 0x2d]);
  if (extension === "hwp" || extension === "doc") {
    return startsWith(buffer, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]);
  }
  if (extension === "hwpx" || extension === "docx") {
    return startsWith(buffer, [0x50, 0x4b, 0x03, 0x04]) || startsWith(buffer, [0x50, 0x4b, 0x05, 0x06]);
  }
  if (extension === "txt") return !buffer.subarray(0, 4096).includes(0);
  return false;
}
