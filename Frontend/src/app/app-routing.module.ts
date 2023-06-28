import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { OrderSuccessComponent } from './components/partials/order-success/order-success.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'search/:searchTerm',component:HomeComponent
  },
  {
    path:'food/:id',component:FoodPageComponent
  },
  {
    path:'cart-page',component:CartPageComponent
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'register',component:RegisterPageComponent
  },
  {
    path:'checkout',component:CheckoutPageComponent
  },
  {
    path:'payment',component:PaymentPageComponent
  },
  {
    path:'order-success',component:OrderSuccessComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
