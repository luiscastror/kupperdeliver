import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Components
import { ModalItemComponent } from './components/modals/modal-item/modal-item.component';
import { NavbarComponent } from './components/navbar/navbar.component';

//Pages
import { CategoriesComponent } from './pages/categories/categories.component';
import { UnitsComponent } from './pages/units/units.component';
import { UsersComponent } from './pages/users/users.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ItemsComponent } from './pages/items/items.component';

//Material
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    OrdersComponent,
    ItemsComponent,
    ModalItemComponent,
    NavbarComponent,
    CategoriesComponent,
    UnitsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
