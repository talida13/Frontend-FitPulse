import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalStoreRoutingModule } from './local-store-routing.module';
import { StoreComponent } from './store/store.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


@NgModule({
  declarations: [
    StoreComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    LocalStoreRoutingModule
  ]
})
export class LocalStoreModule { }
