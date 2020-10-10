import { Routes } from '@angular/router';

import { LegalPage } from './pages/legal/legal.page';
import { SignInPage } from './pages/sign-in/sign-in.page';
import { SignUpPage } from './pages/sign-up/sign-up.page';
import { WelcomePage } from './pages/welcome/welcome.page';
import { OrderVerifyPage } from './pages/order-verify/order-verify.page';
import { ShoppingCartPage } from './pages/shopping-cart/shopping-cart.page';
import { VerifyAccountPage } from './pages/verify-account/verify-account.page';
import { OrderReceivedPage } from './pages/order-received/order-received.page';
import { PaymentAndShippingPage } from './pages/payment-and-shipping/payment-and-shipping.page';
import { CategoryPage } from './pages/category/category.page';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: WelcomePage },
  { path: 'legal', component: LegalPage },
  { path: 'sign-in', component: SignInPage },
  { path: 'sign-up', component: SignUpPage },
  { path: 'verify-account', component: VerifyAccountPage },
  { path: 'shopping-cart', component: ShoppingCartPage },
  { path: 'payment-and-shipping', component: PaymentAndShippingPage },
  { path: 'verify', component: OrderVerifyPage },
  { path: 'order-received', component: OrderReceivedPage },
  { path: ':category-slug/c', component: CategoryPage },
  { path: '**', redirectTo: '/' },
];
