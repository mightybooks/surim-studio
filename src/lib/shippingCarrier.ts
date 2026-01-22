export const SHIPPING_CARRIERS = {
  CJ: "CJ대한통운",
  POST: "우체국",
  EMS: "EMS(해외)",
} as const;

export type ShippingCarrier =
  keyof typeof SHIPPING_CARRIERS;
