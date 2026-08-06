export {};

declare global {
  type PortOnePaymentRequest = {
    storeId: string;
    channelKey: string;
    paymentId: string;
    orderName: string;
    totalAmount: number;
    currency: "KRW" | "USD";
    payMethod: string;
    uiType?: string;
    redirectUrl?: string;
    forceRedirect?: boolean;
    customer: {
      fullName: string;
      phoneNumber: string;
      email: string;
    };
  };

  interface Window {
    PortOne: {
      requestPayment(request: PortOnePaymentRequest): Promise<unknown>;
    };
  }
}
