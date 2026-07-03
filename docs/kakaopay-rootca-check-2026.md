# 카카오페이 RootCA 변경 대응 점검

점검일: 2026-07-03

## 배경

- 카카오페이 공지 기준 2026-07-27 04:00~06:00에 `AAA Certificate Services` 교차서명이 제거되고 `USERTrust RSA Certification Authority` 단일 RootCA로 변경 예정.
- 2026-08-03 04:00~06:00에는 DigiCert에서 Sectigo로 인증서 통합 작업 예정.
- 영향 가능 도메인: `*.kakaopay.com`, `*.kakaopaycorp.com`, `*.kakaopaycorp.net`, `*.kakaopaysecure.net`.
- 주요 확인 대상: `open-api.kakaopay.com`, `biz-api.kakaopay.com`, `biz-dapi.kakaopay.com`, `biz-file.kakaopay.com`, `merchant.kakaopay.com`.

## 검색한 문자열

`kakaopay`, `kakaopay.com`, `kakaopaycorp`, `open-api.kakaopay.com`, `biz-api.kakaopay.com`, `biz-dapi.kakaopay.com`, `biz-file.kakaopay.com`, `merchant.kakaopay.com`, `kapi.kakao.com`, `kakao`, `portone`, `inicis`

## 판단

케이스 B와 C에 해당한다.

- 서버에서 카카오페이 API 도메인을 직접 호출하는 코드는 발견되지 않았다.
- 서버 결제 조회/웹훅 처리는 PortOne API(`https://api.portone.io`)만 호출한다.
- 프론트엔드 결제 요청은 PortOne V2 브라우저 SDK(`https://cdn.portone.io/v2/browser-sdk.js`)를 통해 수행한다.
- 카카오페이는 `NEXT_PUBLIC_PORTONE_KAKAOPAY_CHANNEL_KEY`를 선택하고 PortOne SDK에 `payMethod: "EASY_PAY"`를 넘기는 방식으로 사용한다.
- 별도 카카오 SDK 사용은 카카오 로그인/공유/지도 용도이며 카카오페이 결제 API 직접 호출과는 별개다.

## 발견된 관련 파일

- `src/app/layout.tsx`: PortOne V2 브라우저 SDK 로드, KakaoLoader 포함.
- `src/components/order-confirm/ConfirmForm.tsx`: `KAKAOPAY` 선택 시 PortOne `requestPayment` 호출.
- `src/components/order-confirm/ConfirmPaymentButtons.tsx`: 카카오페이 결제 버튼.
- `src/app/api/webhooks/portone/route.ts`: PortOne 웹훅 수신 후 PortOne 결제 상세 조회.
- `src/lib/portone.ts`: PortOne 결제 검증/조회 헬퍼.
- `src/app/api/orders/route.ts`, `src/app/api/orders/[orderId]/route.ts`: 주문의 PG/channel key 저장 및 조회.
- `src/types/portone.d.ts`: 브라우저 `window.PortOne` 타입 선언.
- `src/components/KakaoLoader.tsx`, `src/components/ShareButtons.tsx`, `src/app/projects/*/bookmaps/page.tsx`, `src/components/auth/LoginForm.tsx`: 카카오 SDK, 지도, 로그인, 공유 관련.

## 커스텀 인증서/CA 설정 점검

다음 항목을 검색했으며, 인증서 신뢰 저장소를 덮어쓰거나 TLS 검증을 우회하는 설정은 발견되지 않았다.

- `NODE_EXTRA_CA_CERTS`
- `NODE_TLS_REJECT_UNAUTHORIZED`
- `https.Agent`
- `rejectUnauthorized`
- `ca:`
- `BEGIN CERTIFICATE`
- `tls.connect`
- `setSecureContext`
- 인증서 pinning 관련 문자열

따라서 현재 저장소 기준으로는 Node.js/Next.js/Vercel 런타임의 기본 신뢰 저장소를 사용한다고 판단한다.

## 조치

- 결제 플로우, 주문 생성, 웹훅, confirm 로직은 수정하지 않았다.
- `npm run check:kakaopay-cert` 스크립트를 추가했다.
- 이 스크립트는 `https://cert-test.kakaopay.com`에 HTTPS 요청을 보내고, 실패 시 인증서 검증 오류와 네트워크 오류를 구분해 출력한다.

## 수동 확인 필요

- Vercel 프로젝트 환경변수에 `NODE_EXTRA_CA_CERTS`, `NODE_TLS_REJECT_UNAUTHORIZED`가 설정되어 있지 않은지 확인.
- Vercel 빌드/런타임 이미지의 Node.js 버전이 `package.json`의 `18.x` 또는 `20.x` 범위인지 확인.
- 배포 환경에서 `npm run check:kakaopay-cert` 또는 동일한 Node.js HTTPS 요청 테스트를 실행.
- PortOne 관리자 콘솔의 카카오페이 채널 상태와 2026-07-27 이후 PG 공지 반영 여부 확인.

## 2026-07-27 이후 실결제 테스트 항목

- PC Chrome에서 카카오페이 결제창 진입, 승인, 주문 완료 화면 이동 확인.
- 모바일 Safari/Chrome 및 카카오톡 인앱 브라우저에서 카카오페이 결제창 진입 및 redirect 복귀 확인.
- PortOne 웹훅 수신 후 주문 상태가 `paid`로 변경되는지 확인.
- 결제 실패/취소 시 주문 상태와 사용자 안내가 정상인지 확인.
- PortOne 관리자 콘솔 결제 내역과 DB `orders.portone_payment_id` 매칭 확인.
- 2026-08-03 DigiCert/Sectigo 통합 작업 이후 동일 항목 재확인.
