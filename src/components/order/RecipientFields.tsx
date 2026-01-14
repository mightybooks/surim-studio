type RecipientFieldsProps = {
  recipientName: string;
  phone: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function RecipientFields({
  recipientName,
  phone,
  onChange,
}: RecipientFieldsProps) {
  return (
    <section className="space-y-3">
      <h2 className="font-medium">주문자 정보</h2>

      <input
        type="text"
        name="recipientName"
        placeholder="수령인 이름"
        value={recipientName}
        onChange={onChange}
        className="w-full rounded-md border px-3 py-2"
      />

      <input
        type="tel"
        name="phone"
        placeholder="연락처"
        value={phone}
        onChange={onChange}
        className="w-full rounded-md border px-3 py-2"
      />
    </section>
  );
}
