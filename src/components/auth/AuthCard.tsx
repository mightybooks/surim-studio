// components/auth/AuthCard.tsx
export default function AuthCard({
  title,
  children,
  footer,
}: {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-sm rounded-xl bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-lg font-semibold">{title}</h1>
      <div className="space-y-4">{children}</div>
      {footer && <div className="mt-4 text-xs text-gray-500">{footer}</div>}
    </div>
  );
}
