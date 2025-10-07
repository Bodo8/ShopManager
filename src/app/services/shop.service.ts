import { Injectable, signal, effect  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Shop } from '../models/shop.model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private baseUrl = environment.baseUrl;
  shops = signal<Shop[]>([]);

  constructor(private http: HttpClient) {
     effect(() => {
      this.loadShops();
    });
  }

  loadShops() {
    this.http.get<Shop[]>(`${this.baseUrl}/Product/GetShops`)
    .subscribe({
        next: data => this.shops.set(data),
        error: err => console.error('Błąd podczas pobierania sklepów:', err)
    })
  };
}