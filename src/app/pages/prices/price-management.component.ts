import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopService } from '../../services/shop.service';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { DiscountDto } from '../../models/discount.dto';

@Component({
  selector: 'app-price-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './price-management.component.html',
  styleUrl: './price-management.component.css' })

export class PriceManagementComponent {

  private shopService = inject(ShopService);
  private productService = inject(ProductService);

  shops = this.shopService.shops;
  products = signal<any[]>([]);
  finalPrices = signal<{ [key: number]: number }>({});
  selectedShopId = 0;
  selectedDiscounts: { [productId: number]: number | null } = {};

  
  loadProducts() {
    if (!this.selectedShopId) return;
    this.productService.getProductsByShop(this.selectedShopId).subscribe((p) => this.products.set(p));
  }

  selectSingleDiscount(productId: number, discount: DiscountDto) {

  if (this.selectedDiscounts[productId] === discount.id) {
    this.selectedDiscounts[productId] = null;
  } else {
    this.selectedDiscounts[productId] = discount.id;
  }
  this.setDiscount(productId, discount)
}

 setDiscount(productId: number, discount: DiscountDto) {
  const product = this.products().find(p => p.id === productId);
  if (!product) return;

  const basePrice = product.prices[0]?.basePrice ?? 0;

  
  if (this.selectedDiscounts[productId] !== null) {
    const discounted = basePrice * (1 - discount.percentage / 100);
    this.finalPrices.update(fp => ({ ...fp, [productId]: discounted }));
  } else {
    // Odznaczony → usuń rabat, przywróć cenę bazową
    this.finalPrices.update(fp => {
      const { [productId]: _, ...rest } = fp;
      return rest;
    });
  }
}
}