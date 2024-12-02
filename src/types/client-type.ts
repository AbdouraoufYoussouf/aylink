export interface ClientType {
    id:string,
    name:string,
    email:string,
    image?:string,
    pseudo:string
}

export interface FilterClientParams {
    search?: string;
  }
  