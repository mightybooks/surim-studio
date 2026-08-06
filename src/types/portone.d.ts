export {};

declare global {
  type PortOneCustomer = {
    fullName?: string;
    phoneNumber?: string;
    email?: string;
  };

  type PortOnePaymentRequest = {
    storeId: string;
    channelKey: string;
    paymentId: string;
    orderName: string;
    totalAmount: number;
    currency: "KRW" | "USD";
    payMethod: string;
    redirectUrl?: string;
    forceRedirect?: boolean;
    customer?: PortOneCustomer;
    bypass?: {
      inicis_v2?: {
        acceptmethod?: string[];
        P_RESERVED?: string[];
      };
    };
  };

  type PortOneLoadPaymentUIRequest = {
    uiType: "PAYPAL_SPB";
    storeId: string;
    channelKey: string;
    paymentId: string;
    orderName: string;
    totalAmount: number;
    currency: "USD";
    customer?: PortOneCustomer;
  };

  type PortOnePaymentResponse = {
    transactionType: "PAYMENT";
    txId: string;
    paymentId: string;
    paymentToken?: string;
    code?: string;
    message?: string;
    pgCode?: string;
    pgMessage?: string;
  };

  type PortOnePaymentError = {
    code: string;
    message: string;
    txId?: string;
    paymentId?: string;
    pgCode?: string;
    pgMessage?: string;
  };

  interface Window {
    PortOne?: {
      requestPayment(request: PortOnePaymentRequest): Promise<unknown>;
      loadPaymentUI(
        request: PortOneLoadPaymentUIRequest,
        callbacks: {
          onPaymentSuccess: (response: PortOnePaymentResponse) => void;
          onPaymentFail: (error: PortOnePaymentError) => void;
        },
      ): Promise<void>;
    };
  }
}
