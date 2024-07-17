import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsListComponent } from './products-list/products-list.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
},
{
  path: 'products',
  component: ProductsListComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
