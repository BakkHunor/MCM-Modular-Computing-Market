import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { ProductListingComponent } from './features/product-listing/product-listing.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { CartComponent } from './features/cart/cart.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { ProfileComponent } from './features/profile/profile.component';

export const routes: Routes = [
  // legyen rendes default route
  { path: '', component: HomeComponent, pathMatch: 'full' },

  { path: 'search', component: ProductListingComponent },
  { path: 'product/:id', component: ProductDetailComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'profile', component: ProfileComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },

  // ✅ fallback: mindent a főoldalra (de ne kavarjon)
  { path: '**', redirectTo: '' },
];