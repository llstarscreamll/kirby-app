import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, tap, filter } from 'rxjs/operators';

import { IProduct } from '@kirby/products/data';
import { ShopFacade } from '../../+state/shop.facade';
import { ProductsFacade } from '@kirby/products/data-access';

@Component({
  selector: 'shop-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  products$ = this.productsFacade.paginatedProducts$;
  shoppingCart$ = this.shopFacade.shoppingCart$;
  params$ = this.routerSnapshot.queryParams;

  constructor(
    private router: Router,
    private shopFacade: ShopFacade,
    private productsFacade: ProductsFacade,
    private routerSnapshot: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onSearch(query: any = {}) {
    this.router.navigate(['/search'], {
      queryParams: { query: query.search, page: 1 },
    });
  }

  addProduct(product: IProduct) {
    this.shopFacade.addProductToShoppingCart(product);
  }

  removeProduct(product: IProduct) {
    this.shopFacade.removeProductFromShoppingCart(product);
  }

  paginate(page: { page: number }) {
    this.router.navigate([], {
      queryParams: { ...page },
      queryParamsHandling: 'merge',
    });
  }
}
