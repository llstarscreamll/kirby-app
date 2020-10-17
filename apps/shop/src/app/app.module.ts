import { NxModule } from '@nrwl/angular';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  DefaultRouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';

import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import * as fromShop from './+state/shop.reducer';
import { ShopFacade } from './+state/shop.facade';
import { ShopEffects } from './+state/shop.effects';
import { LegalPage } from './pages/legal/legal.page';
import { ShopService } from './services/shop.service';
import { debug } from './meta-reducers/debug.reducer';
import { environment } from '../environments/environment';
import { SignInPage } from './pages/sign-in/sign-in.page';
import { SignUpPage } from './pages/sign-up/sign-up.page';
import { WelcomePage } from './pages/welcome/welcome.page';
import { ProductsDataAccessModule } from '@kirby/products/data-access';
import { ProductComponent } from './components/product/product.component';
import { VerifyAccountPage } from './pages/verify-account/verify-account.page';
import { AuthenticationDataAccessModule } from '@kirby/authentication-data-access';
import { initStateFromLocalStorage } from './meta-reducers/init-state-from-local-storage.reducer';
import { ShoppingCartPage } from './pages/shopping-cart/shopping-cart.page';
import { PaymentAndShippingPage } from './pages/payment-and-shipping/payment-and-shipping.page';
import { OrderVerifyPage } from './pages/order-verify/order-verify.page';
import { OrderReceivedPage } from './pages/order-received/order-received.page';
import { CategoryPage } from './pages/category/category.page';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { SearchPage } from './pages/search/search.page';

export const metaReducers: MetaReducer<any>[] = [initStateFromLocalStorage];

if (!environment.production) {
  metaReducers.unshift(debug);
}

@NgModule({
  declarations: [
    LegalPage,
    SignInPage,
    SignUpPage,
    WelcomePage,
    AppComponent,
    VerifyAccountPage,
    ProductComponent,
    ShoppingCartPage,
    PaymentAndShippingPage,
    OrderVerifyPage,
    OrderReceivedPage,
    CategoryPage,
    MainHeaderComponent,
    SearchPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NxModule.forRoot(),
    ReactiveFormsModule,
    ProductsDataAccessModule,
    AuthenticationDataAccessModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabled' }),
    StoreModule.forRoot(
      {},
      {
        metaReducers: metaReducers,
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([ShopEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({
      serializer: DefaultRouterStateSerializer,
    }),
    StoreModule.forFeature(fromShop.SHOP_FEATURE_KEY, fromShop.reducer),
  ],
  providers: [
    { provide: 'environment', useValue: environment },
    ShopFacade,
    ShopService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
