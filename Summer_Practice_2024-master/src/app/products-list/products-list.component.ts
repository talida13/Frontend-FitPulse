import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {
  @Input() detailsProducts: any;
  @Output() sendNotification: EventEmitter<string> = new EventEmitter<string>();
  
  cardBackgroundColor: string = 'lightblue';
  cardTextColor: string = 'black';
  cardFontSize: number = 14;
  buttonText: string = 'Activate Card';
  isActive: boolean = false;
  addProductBtn = 'Add product';

  

  addProductToCart(product: any) {
    this.sendNotification.next(`The product ${product.name} has been added to cart.`)
  }
}
