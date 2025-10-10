import { PriceDto } from './price.dto';
import { DiscountDto } from './discount.dto';
import { Shop } from './shop.model';

export interface ProductDto {
  id: number;
  name: string;
  description: string;
  prices: PriceDto[];
  discountIds: DiscountDto[];
  shopIds: number[];
}
