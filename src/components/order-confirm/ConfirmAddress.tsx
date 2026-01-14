type Props = {
  recipientName: string;
  phone: string;
  zipcode: string;
  address: string;
  addressDetail: string;
};

export default function ConfirmAddress({
  recipientName,
  phone,
  zipcode,
  address,
  addressDetail,
}: Props) {
  return (
    <section className="rounded-xl border p-4 bg-white">
      <h2 className="font-medium mb-2">배송 정보</h2>
      <div className="text-sm text-zinc-700 space-y-1">
        <div>{recipientName}</div>
        <div>{phone}</div>
        <div>
          ({zipcode}) {address} {addressDetail}
        </div>
      </div>
    </section>
  );
}
