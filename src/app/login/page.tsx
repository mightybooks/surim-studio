import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { from?: string };
}) {
  const fromVerify = searchParams?.from === "verify";

  return (
    <main className="p-6">
      <h1 className="text-xl mb-4">로그인</h1>
      <LoginForm fromVerify={fromVerify} />
    </main>
  );
}
