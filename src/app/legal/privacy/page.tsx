import { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 수림 스튜디오",
  description:
    "수림 스튜디오 개인정보처리방침입니다. 개인정보 수집 및 이용, 보호에 관한 내용을 안내합니다.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold mb-6">개인정보처리방침</h1>

     <section className="space-y-10 text-sm leading-relaxed text-slate-700">
        <section className="space-y-2">
            <p className="font-medium">마이티북스 (수림 스튜디오)</p>
            <p>
            마이티북스(이하 “회사”)는 「개인정보 보호법」 제30조에 따라 이용자의
            개인정보를 보호하고, 개인정보와 관련한 고충을 신속하고 원활하게 처리하기
            위하여 다음과 같이 개인정보처리방침을 수립·공개합니다.
            </p>
            <p>
            본 개인정보처리방침은 회사가 제공하는 서비스 전반에 적용됩니다.
            </p>
        </section>

        <section id="privacy-purpose" className="space-y-3">
            <h2 className="text-base font-semibold">1. 개인정보의 처리 목적</h2>
            <p>
            회사는 다음의 목적을 위하여 최소한의 개인정보를 처리합니다. 처리한
            개인정보는 아래 목적 외의 용도로는 이용되지 않으며, 목적이 변경되는 경우
            관련 법령에 따라 별도의 동의를 받습니다.
            </p>
            <ul className="list-disc pl-5 space-y-1">
            <li>회원 식별 및 인증</li>
            <li>서비스 이용에 따른 본인 확인</li>
            <li>부정 이용 방지</li>
            <li>고지사항 전달 및 문의 응대</li>
            <li>디지털 콘텐츠 제공</li>
            <li>결제 및 정산 처리</li>
            <li>고객 문의 대응</li>
            </ul>
        </section>

        <section id="privacy-retention" className="space-y-3">
            <h2 className="text-base font-semibold">2. 개인정보의 처리 및 보유 기간</h2>
            <p>
            회사는 개인정보 처리 목적이 달성되거나 이용자가 회원 탈퇴를 요청한 경우,
            해당 개인정보를 지체 없이 파기합니다.
            </p>
            <p>다만, 관계 법령에 따라 다음과 같이 일정 기간 보관할 수 있습니다.</p>
            <ul className="list-disc pl-5 space-y-1">
            <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
            <li>대금 결제 및 재화·서비스 제공에 관한 기록: 5년</li>
            <li>소비자 불만 또는 분쟁처리에 관한 기록: 3년</li>
            <li>서비스 이용 기록(접속 로그 등): 3개월</li>
            </ul>
            <p className="text-slate-600">
            (근거 법령: 전자상거래 등에서의 소비자보호에 관한 법률,
            통신비밀보호법 등)
            </p>
        </section>

        <section id="privacy-items" className="space-y-3">
            <h2 className="text-base font-semibold">3. 처리하는 개인정보의 항목</h2>
            <p>회사는 회원가입 및 서비스 이용 과정에서 다음의 개인정보만을 수집·처리합니다.</p>
            <ul className="list-disc pl-5 space-y-1">
            <li>회원가입 시: 이메일 주소</li>
            <li>서비스 이용 과정에서 자동 생성되는 정보</li>
            <li>서비스 이용 기록</li>
            <li>접속 로그 및 접속 IP 정보</li>
            <li>결제 기록</li>
            </ul>
            <p>
            회사는 위 항목 외의 개인정보는 원칙적으로 수집하지 않습니다.
            </p>
        </section>

        <section id="privacy-age-limit" className="space-y-3">
            <h2 className="text-base font-semibold">4. 만 14세 미만 아동의 개인정보 처리</h2>
            <p>
            회사는 만 14세 미만 아동의 개인정보를 수집하지 않습니다.
            본 서비스는 만 14세 이상 이용자만을 대상으로 하며,
            만 14세 미만 아동의 회원가입 및 서비스 이용을 허용하지 않습니다.
            </p>
        </section>

        <section id="privacy-third-party" className="space-y-3">
            <h2 className="text-base font-semibold">5. 개인정보의 제3자 제공</h2>
            <p>
            회사는 이용자의 개인정보를 원칙적으로 제3자에게 제공하지 않습니다.
            다만, 법령에 따라 제공이 요구되는 경우에는 관련 법령에 따라 처리합니다.
            </p>
        </section>

        <section id="privacy-outsourcing" className="space-y-3">
            <h2 className="text-base font-semibold">6. 개인정보 처리의 위탁</h2>
            <p>
            회사는 서비스 운영을 위하여 개인정보 처리 업무를 외부에 위탁하지 않습니다.
            </p>
            <p className="text-slate-600">
            ※ 향후 개인정보 처리 업무를 위탁하게 될 경우, 관련 법령에 따라 위탁
            사실 및 내용을 본 개인정보처리방침을 통해 사전에 공개하겠습니다.
            </p>
        </section>

        <section id="privacy-destruction" className="space-y-3">
            <h2 className="text-base font-semibold">7. 개인정보의 파기 절차 및 방법</h2>
            <ul className="list-disc pl-5 space-y-1">
            <li>전자적 파일 형태: 복구 불가능한 방법으로 삭제</li>
            <li>출력물 형태: 분쇄 또는 소각</li>
            </ul>
        </section>

        <section id="privacy-rights" className="space-y-3">
            <h2 className="text-base font-semibold">8. 정보주체의 권리 및 행사 방법</h2>
            <p>
            이용자는 언제든지 자신의 개인정보에 대해 열람, 정정, 삭제,
            처리정지를 요청할 수 있습니다.
            </p>
            <p>
            관련 요청은 개인정보 보호책임자에게 이메일로 접수할 수 있으며,
            회사는 지체 없이 필요한 조치를 취합니다.
            </p>
        </section>

        <section id="privacy-security" className="space-y-3">
            <h2 className="text-base font-semibold">9. 개인정보의 안전성 확보 조치</h2>
            <ul className="list-disc pl-5 space-y-1">
            <li>관리적 조치: 내부 관리 기준 수립 및 운영</li>
            <li>기술적 조치: 접근 권한 관리, 보안 시스템 운영</li>
            <li>물리적 조치: 개인정보 접근 통제</li>
            </ul>
        </section>

        <section id="privacy-cookie" className="space-y-3">
            <h2 className="text-base font-semibold">
            10. 개인정보를 자동으로 수집하는 장치의 설치·운영
            </h2>
            <p>
            회사는 서비스 이용 과정에서 접속 정보, 이용 기록 등을 자동으로 수집할 수
            있으며, 해당 정보는 서비스 안정성 확보 및 운영 개선을 위한 목적으로만
            사용됩니다.
            </p>
        </section>

        <section id="privacy-officer" className="space-y-3">
            <h2 className="text-base font-semibold">11. 개인정보 보호책임자</h2>
            <ul className="space-y-1">
            <li>개인정보 보호책임자: 이경민</li>
            <li>직책: 대표</li>
            <li>이메일: novelstudylab@naver.com</li>
            </ul>
        </section>

        <section id="privacy-change" className="space-y-3">
            <h2 className="text-base font-semibold">12. 개인정보처리방침의 변경</h2>
            <p>
            본 개인정보처리방침은 2026년 1월 10일부터 적용됩니다.
            내용의 추가, 삭제 또는 수정이 있을 경우, 변경 사항은 서비스 내 공지를
            통해 안내합니다.
            </p>
        </section>
      </section>
    </main>
  );
}
