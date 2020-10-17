import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ShopFacade } from '../../+state/shop.facade';

@Component({
  selector: 'shop-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  shoppingCart$ = this.shopFacade.shoppingCart$;
  params$ = this.routerSnapshot.queryParams;

  constructor(
    private router: Router,
    private shopFacade: ShopFacade,
    private routerSnapshot: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  foo(query: any = {}) {
    this.router.navigate(['/search'], { queryParams: { query: query.search } });
  }
}
