export interface Address {
  id: number;
  city: string;
  shopId: number;
}

export interface Shop {
  id: number;
  name: string;
  address: Address;
}