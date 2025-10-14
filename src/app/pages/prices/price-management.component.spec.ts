import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PriceManagementComponent } from './price-management.component';
import { of } from 'rxjs';
import { DiscountDto } from '../../models/discount.dto';
import { ProductService } from '../../services/product.service';
import { ShopService } from '../../services/shop.service';

describe('PriceManagementComponent (signals)', () => {
  let component: PriceManagementComponent;
  let fixture: ComponentFixture<PriceManagementComponent>;

   const shopServiceMock = {
    shops: jasmine.createSpy('shops').and.returnValue(of([])),
  };
  const productServiceMock = {
    getProductsByShop: jasmine.createSpy('getProductsByShop').and.returnValue(of([])),
    // inne metody jeśli potrzeba
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PriceManagementComponent],
    providers: [
        { provide: ShopService, useValue: shopServiceMock },
        { provide: ProductService, useValue: productServiceMock }
      ]
    });

    fixture = TestBed.createComponent(PriceManagementComponent);
    component = fixture.componentInstance;
  });

  it('powinien ustawić obniżoną cenę, jeśli rabat jest zaznaczony', () => {

    // Arrange
    const productId = 1;
    const basePrice = 100;
    const discount: DiscountDto = { id: 1, description: 'Test', percentage: 20, expirationDate: new Date(1, 1, 2026), shopIds: [], productIds: [] };

    component.products.set([{ id: productId, prices: [{ basePrice }] }]);
    component.selectedDiscounts = { [productId]: 1 };

    // Act
    component.setDiscount(productId, discount);

    // Assert
    const expected = basePrice * (1 - discount.percentage / 100);
    expect(component.finalPrices()[productId]).toBe(expected);
  });

  it('powinien usunąć wpis z finalPrices przy odznaczeniu rabatu', () => {
    
    // Arrange
    const productId = 2;
    const basePrice = 100;
    const discount: DiscountDto = { id: 1, description: 'Test', percentage: 10, expirationDate: new Date(1, 1, 2026), shopIds: [], productIds: [] };

    component.products.set([{ id: productId, prices: [{ basePrice }] }]);
    component.finalPrices.set({ [productId]: 90 });
    component.selectedDiscounts = { [productId]: null };

    // Act
    component.setDiscount(productId, discount);

    // Assert
    expect(component.finalPrices()[productId]).toBeUndefined();
  });

  it('nie powinien nic robić, jeśli produkt nie istnieje', () => {
    
    // Arrange
    component.products.set([]);
    const spy = spyOn(component.finalPrices, 'update');
    const discount: DiscountDto = { id: 1, description: 'X', percentage: 10, expirationDate: new Date(1, 1, 2026), shopIds: [], productIds: []  };

    // Act
    component.setDiscount(999, discount);

    // Assert
    expect(spy).not.toHaveBeenCalled();
  });
});