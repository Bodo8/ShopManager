
export interface DiscountDto {
  id: number;
  description: string;
  expirationDate: Date;
  percentage: number;
  productIds: number[];
  shopIds: number[];
}