import { Injectable, signal, effect, inject  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Shop } from '../models/shop.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;
  shops = signal<Shop[]>([]);

  constructor() {
     effect(() => {
      this.loadShops();
    });
  };

  loadShops() {
     this.http.get<Shop[]>(`${this.baseUrl}/Product/GetShops`)
    .subscribe({
        next: data => this.shops.set(data),
        error: err => console.error('Błąd podczas pobierania sklepów:', err)
   })
  };
}