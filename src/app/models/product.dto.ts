import { PriceDto } from './price.dto';
import { DiscountDto } from './discount.dto';

export interface ProductDto {
  id: number;
  name: string;
  description: string;
  prices: PriceDto[];
  discounts: DiscountDto[];
}
