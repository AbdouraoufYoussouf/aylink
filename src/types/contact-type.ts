export interface ContactType {
    id: string,
    name: string,
    email: string,
    country?: string,
    location?: string,
}

export interface FilterContactParams {
    search?: string;
    pseudo?: string;
    page: number;
    pageSize: number;
}

export interface ContactResponse {
    success: boolean;
    message: string;
    data: ContactType[];
    total: number;
    currentPage: number;
    totalPages?: number;
}

export interface CreateContactType {
    name: string;
    email: string;
    whatsapp?: string;
    country?: string;
    location?: string;
    message?: string;
    pseudo: string;
    tag: string;
    oneYearSubscription?: boolean;
    deviceType?: string;
}




