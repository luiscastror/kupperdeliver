import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireFunctionsModule } from "@angular/fire/functions";
import { AngularFireMessagingModule } from "@angular/fire/messaging";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { environment } from 'src/environments/environment';

// Components
import { ModalItemComponent } from './components/modals/modal-item/modal-item.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModalCategoryComponent } from './components/modals/modal-category/modal-category.component';

//Pages
import { CategoriesComponent } from './pages/categories/categories.component';
import { UnitsComponent } from './pages/units/units.component';
import { UsersComponent } from './pages/users/users.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ItemsComponent } from './pages/items/items.component';

//Material
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ModalUnitComponent } from './components/modals/modal-unit/modal-unit.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    OrdersComponent,
    ItemsComponent,
    ModalItemComponent,
    NavbarComponent,
    CategoriesComponent,
    UnitsComponent,
    ModalCategoryComponent,
    ModalUnitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    AngularFireMessagingModule,
    AngularFirestoreModule,
    AngularFireStorageModule
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireDatabaseModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
