import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  productTitle = '';

  constructor(private activateRoute: ActivatedRoute) {
    this.activateRoute.paramMap.subscribe((params) => {
      this.productTitle = params.get('id') as string;
    });
  }
}
