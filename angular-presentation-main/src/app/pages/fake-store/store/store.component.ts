import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from './services/products.service';
import { filter, Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  addedProduct: Product = {} as Product;
  products: Product[] = [];

  constructor(private readonly productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
      console.log(products);
    });
  }

  addProduct(): void {
    this.productService.addProduct(this.addedProduct).subscribe((product) => {
      console.log(product);
    });
  }

  filterProducts(): void {
    const customFilterObservable = new Observable((observer:Observer<Product>) => {
      this.products.forEach(product => {
        observer.next(product);
      });
      observer.complete();
    })

    let auxProducts:Product[] = [];

    customFilterObservable
      .pipe(filter((product:Product) => {
        if (product.price <= 50) {
          return true;
        }
        return false;
      }))
      .subscribe({
        next: (product:Product) => {
          auxProducts.push(product);
        },
        error: (error: Error) => {
          console.log(error);
        },
        complete: () => {
          console.log("completed!");
          this.products = auxProducts;
        }
      });
  }
}
