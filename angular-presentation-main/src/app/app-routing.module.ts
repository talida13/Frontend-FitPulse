import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { loginGuard } from './guards/login.guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { RegisterComponent } from './pages/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: '', component: LandingPageComponent },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'fake-store',
    loadChildren: () =>
      import('./pages/fake-store/fake-store.module').then(
        (m) => m.FakeStoreModule
      ),
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'local-store', loadChildren: () => import('./pages/local-store/local-store.module').then(m => m.LocalStoreModule) },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
