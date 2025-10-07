import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PriceManagementComponent } from './pages/prices/price-management.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'zarzadzanie-cenami', component: PriceManagementComponent },
];