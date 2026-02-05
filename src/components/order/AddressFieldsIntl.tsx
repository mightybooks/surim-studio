"use client";

type Props = {
  country: string;
  city: string;
  state: string;
  postalCode: string;
  address1: string;
  address2: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function AddressFieldsIntl({
  country,
  city,
  state,
  postalCode,
  address1,
  address2,
  onChange,
}: Props) {
  return (
    <section className="rounded-xl border p-4 bg-white space-y-3">
      <h2 className="text-base font-semibold">Shipping Address (International)</h2>

      <div className="grid grid-cols-1 gap-3">
        <input
          name="country"
          value={country}
          onChange={onChange}
          placeholder="Country (e.g., US, Japan, Germany)"
          className="w-full rounded-lg border px-3 py-2"
          autoComplete="country"
        />

        <input
          name="address1"
          value={address1}
          onChange={onChange}
          placeholder="Street address"
          className="w-full rounded-lg border px-3 py-2"
          autoComplete="address-line1"
        />

        <input
          name="address2"
          value={address2}
          onChange={onChange}
          placeholder="Apt / Suite (optional)"
          className="w-full rounded-lg border px-3 py-2"
          autoComplete="address-line2"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            name="city"
            value={city}
            onChange={onChange}
            placeholder="City"
            className="w-full rounded-lg border px-3 py-2"
            autoComplete="address-level2"
          />

          <input
            name="state"
            value={state}
            onChange={onChange}
            placeholder="State / Province"
            className="w-full rounded-lg border px-3 py-2"
            autoComplete="address-level1"
          />
        </div>

        <input
          name="postalCode"
          value={postalCode}
          onChange={onChange}
          placeholder="Postal code"
          className="w-full rounded-lg border px-3 py-2"
          autoComplete="postal-code"
        />
      </div>

      <p className="text-xs text-zinc-500">
        해외배송은 국가/주소 포맷이 제각각이라, 국내 주소검색 UX를 강제하지 않습니다.
      </p>
    </section>
  );
}
