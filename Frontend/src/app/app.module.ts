import { NgModule , CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RatingModule } from 'ng-starrating';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SearchComponent } from './components/pages/search/search.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { TitleComponent } from './components/pages/title/title.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { InputValidationComponent } from './components/partials/input-validation/input-validation.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { OrderItemsListComponent } from './components/partials/order-items-list/order-items-list.component';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { OrderSuccessComponent } from './components/partials/order-success/order-success.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    FoodPageComponent,
    CartPageComponent,
    TitleComponent,
    LoginComponent,
    RegisterPageComponent,
    InputValidationComponent,
    CheckoutPageComponent,
    OrderItemsListComponent,
    PaymentPageComponent,
    OrderSuccessComponent,



  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RatingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot( {
      timeOut:4000,
      positionClass:'toast-bottom-right',
      newestOnTop:false
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
