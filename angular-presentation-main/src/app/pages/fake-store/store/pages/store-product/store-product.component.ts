import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-store-product',
  templateUrl: './store-product.component.html',
  styleUrls: ['./store-product.component.scss'],
})
export class StoreProductComponent {
  @Input() id?: number;
  @Input() title?: string;
  @Input() description?: string;
  @Input() price?: number;
}
