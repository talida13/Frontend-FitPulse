import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  cardBackgroundColor: string = 'lightblue';
  cardTextColor: string = 'black';
  cardFontSize: number = 14;
  buttonText: string = 'Activate Card';
  isActive: boolean = false;
  addProductBtn = 'Add product';
  showProducts = false;

  name: string = 'Larisa';

  products = [
    {
      id: 1,
      name: 'Product 1',
      price: 60,
      description: 'Description for product 1.',
      cardBackgroundColor: 'green',
      buttonShown: true
    },
    {
      id: 2,
      name: 'Product 2',
      price: 60,
      description: 'Description for product 2.',
      cardBackgroundColor: 'red',
      buttonShown: true
    },
    {
      id: 3,
      name: 'Product 3',
      price: 60,
      description: 'Description for product 3.',
      cardBackgroundColor: 'pink', 
      buttonShown: true
    }
  ]

  toggleCardStatus() {
    this.isActive = !this.isActive;
    // this.cardBackgroundColor = this.isActive ? 'lightgreen' : 'lightblue'; //used ternary operator
    if (this.isActive) {
      this.cardBackgroundColor = 'lightgreen'
    } else {
      this.cardBackgroundColor = 'lightblue'
    }
    this.cardTextColor = this.isActive ? 'darkgreen' : 'black';
    this.cardFontSize = this.isActive ? 18 : 14;
    this.buttonText = this.isActive ? 'Deactivate Card' : 'Activate Card';
    this.showProducts = !this.showProducts;
  }

  addProductToCart(product: any) {
    console.log(`The product ${product.name} has been added to cart.`)
  }

  getProductSelected(product: string) {
    console.log(product);
  }
}
