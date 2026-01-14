type AddressFieldsProps = {
  zipcode: string;
  address: string;
  addressDetail: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function AddressFields({
  zipcode,
  address,
  addressDetail,
  onChange,
}: AddressFieldsProps) {
  return (
    <section className="space-y-3">
      <h2 className="font-medium">배송지 정보</h2>

      <input
        type="text"
        name="zipcode"
        placeholder="우편번호"
        value={zipcode}
        onChange={onChange}
        className="w-full rounded-md border px-3 py-2"
      />

      <input
        type="text"
        name="address"
        placeholder="주소"
        value={address}
        onChange={onChange}
        className="w-full rounded-md border px-3 py-2"
      />

      <input
        type="text"
        name="addressDetail"
        placeholder="상세주소"
        value={addressDetail}
        onChange={onChange}
        className="w-full rounded-md border px-3 py-2"
      />
    </section>
  );
}
