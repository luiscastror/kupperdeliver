import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsComponent } from './pages/brands/brands.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ItemsComponent } from './pages/items/items.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { StoresComponent } from './pages/stores/stores.component';
import { UnitsComponent } from './pages/units/units.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  { path: 'items', component: ItemsComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'users', component: UsersComponent },
  { path: 'units', component: UnitsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'stores', component: StoresComponent },
  { path: 'brands', component: BrandsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
