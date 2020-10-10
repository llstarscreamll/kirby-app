import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ShopFacade } from '../../+state/shop.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'shop-payment-and-shipping',
  templateUrl: './payment-and-shipping.page.html',
  styleUrls: ['./payment-and-shipping.page.scss'],
})
export class PaymentAndShippingPage implements OnInit {
  streetTypes = ['Calle', 'Carrera', 'Transversal', 'Diagonal', 'Avenida'];

  form = this.formBuilder.group({
    payment_method: [
      { name: 'cash', display_name: 'Efectivo' },
      [Validators.required],
    ],
    address_street_type: ['', [Validators.required]],
    address_line_1: ['', [Validators.required]],
    address_line_2: ['', [Validators.required]],
    address_line_3: ['', [Validators.required]],
    address_additional_info: [''],
  });

  constructor(
    private router: Router,
    private shoFacade: ShopFacade,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  submit() {
    const { payment_method, ...addressInfo } = this.form.value;
    this.shoFacade.setAddress(addressInfo);
    this.shoFacade.setPaymentMethod(payment_method);
    this.router.navigateByUrl('/verify');
  }
}
