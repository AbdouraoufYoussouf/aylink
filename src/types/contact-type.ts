export interface ContactType {
    id:string,
    name:string,
    email:string,
    country?:string,
    location?:string,
}

export interface FilterContactParams {
    search?: string;
  }
  