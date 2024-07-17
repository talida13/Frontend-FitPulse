import { Component } from '@angular/core';
import { Products } from '../models/product';
import { LOCAL_PRODUCTS } from '../constants/products';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent {
  products: Products = LOCAL_PRODUCTS;
}
