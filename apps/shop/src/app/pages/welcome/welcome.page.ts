import { Component, OnInit } from '@angular/core';

import { IProduct } from '@kirby/products/data/src';
import { ShopFacade } from '../../+state/shop.facade';
import { CategoriesFacade } from '@kirby/products/data-access/src';

@Component({
  selector: 'shop-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  categories$ = this.categoriesFacade.paginated$;
  shoppingCart$ = this.shopFacade.shoppingCart$;

  constructor(
    private shopFacade: ShopFacade,
    private categoriesFacade: CategoriesFacade
  ) {}

  ngOnInit(): void {
    this.categoriesFacade.search({
      query: {
        filter: { active: true },
        sort: 'position',
        include: 'firstTenProducts',
      },
    });
  }

  addProduct(product: IProduct) {
    this.shopFacade.addProductToShoppingCart(product);
  }

  removeProduct(product: IProduct) {
    this.shopFacade.removeProductFromShoppingCart(product);
  }
}
