import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';

import { ProductsFacade } from './+state/products.facade';
import * as fromProducts from './+state/products.reducer';
import { CategoriesService } from './categories.service';
import { ProductsEffects } from './+state/products.effects';
import * as fromCategories from './+state/categories.reducer';
import { CategoriesFacade } from './+state/categories.facade';
import { CategoriesEffects } from './+state/categories.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromCategories.CATEGORIES_FEATURE_KEY,
      fromCategories.reducer
    ),
    EffectsModule.forFeature([CategoriesEffects]),
    StoreModule.forFeature(
      fromProducts.PRODUCTS_FEATURE_KEY,
      fromProducts.reducer
    ),
    EffectsModule.forFeature([ProductsEffects]),
  ],
  providers: [CategoriesFacade, ProductsFacade, CategoriesService],
})
export class ProductsDataAccessModule {}
