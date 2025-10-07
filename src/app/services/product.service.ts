import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { ProductDto } from '../models/product.dto';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  getProductsByShop(shopId: number): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${this.baseUrl}/Product/GetProductsByShop/${shopId}`);
  }
}
