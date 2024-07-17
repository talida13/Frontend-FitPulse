import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { ProductDetailsComponent } from './store/pages/product-details/product-details.component';

const routes: Routes = [
  { path: '', component: StoreComponent },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FakeStoreRoutingModule {}
