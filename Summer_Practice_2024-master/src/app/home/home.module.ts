import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsListComponent } from '../products-list/products-list.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, ProductsListComponent],
  imports: [CommonModule, FormsModule],
  exports: [HomeComponent],
})
export class HomeModule {}
