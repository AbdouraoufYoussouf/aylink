export interface PricingFeature {
    icon: string;
    text: string;
}

export interface PaymentStatus {
    success: boolean;
    orderId?: string;
    error?: string;
}