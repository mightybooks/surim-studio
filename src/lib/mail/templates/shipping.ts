export const SHIPPING_MAIL = {
  shipped: (params: {
    productName: string;
    trackingNumber: string;
  }) => ({
    subject: "[수림 스튜디오] 주문하신 상품이 발송되었습니다",
    html: `
<p>안녕하세요, 수림 스튜디오입니다.</p>

<p>
주문하신 <strong>${params.productName}</strong> 상품이 발송되었습니다.
</p>

<p>
송장번호: <strong>${params.trackingNumber}</strong>
</p>

<p>
배송은 택배사 사정에 따라 1~3영업일 정도 소요될 수 있습니다.<br/>
감사합니다.
</p>

<p>수림 스튜디오 드림</p>
`.trim(),
  }),
};
