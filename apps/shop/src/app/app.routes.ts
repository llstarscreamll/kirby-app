import { Routes } from '@angular/router';

import { SignInPage } from './pages/sign-in/sign-in.page';
import { LandingPage } from './pages/landing/landing.page';
import { SignUpPage } from './pages/sign-up/sign-up.page';
import { WelcomePage } from './pages/welcome/welcome.page';
import { VerifyAccountPage } from './pages/verify-account/verify-account.page';
import { LegalPage } from './pages/legal/legal.page';
import { ShoppingCartPage } from './pages/shopping-cart/shopping-cart.page';
import { PaymentAndShippingPage } from './pages/payment-and-shipping/payment-and-shipping.page';
import { OrderVerifyPage } from './pages/order-verify/order-verify.page';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: LandingPage },
  { path: 'legal', component: LegalPage },
  { path: 'sign-in', component: SignInPage },
  { path: 'sign-up', component: SignUpPage },
  { path: 'verify-account', component: VerifyAccountPage },
  { path: 'welcome', component: WelcomePage },
  { path: 'shopping-cart', component: ShoppingCartPage },
  { path: 'payment-and-shipping', component: PaymentAndShippingPage },
  { path: 'verify', component: OrderVerifyPage },
];
