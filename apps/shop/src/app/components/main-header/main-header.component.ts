import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'shop-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  @Input()
  shoppingCart: ShoppingCart | null = new ShoppingCart();

  @Input()
  queryParams: any = {};

  @Output()
  searched = new EventEmitter();

  searchForm: any;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: [this.queryParams.query || ''],
    });
  }

  querySearch() {
    this.searched.emit({ search: this.searchForm.value.search.trim() });
  }
}
