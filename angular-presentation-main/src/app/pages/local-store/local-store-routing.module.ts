import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', component: StoreComponent },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
    canActivate: [AdminGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalStoreRoutingModule {}
