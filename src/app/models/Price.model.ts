export class Price {
  constructor(public baseValue: number) {}

  applyDiscount(discountPercent: number): number {
    const discount = (this.baseValue * discountPercent) / 100;
    return this.baseValue - discount;
  }
}