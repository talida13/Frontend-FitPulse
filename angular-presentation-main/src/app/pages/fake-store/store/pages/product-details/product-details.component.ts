import { Component, OnInit } from '@angular/core';
import { Product, Products } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  product?: Product;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _productsService: ProductsService,
    private readonly _router: Router
  ) {
    this._activatedRoute.paramMap.subscribe((data) => {
      this.product = this._productsService
        .getLocalProducts()
        .find((product) => product.id === Number(data.get('id')));

      if (!this.product) {
        this._router.navigate(['fake-store']);
      }
    });
  }
}
