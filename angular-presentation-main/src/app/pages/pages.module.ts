import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterModule } from './register/register.module';
import { FakeStoreModule } from './fake-store/fake-store.module';
import { ForbiddenModule } from './forbidden/forbidden.module';
import { LandingPageModule } from './landing-page/landing-page.module';
import { UnauthorizedModule } from './unauthorized/unauthorized.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RegisterModule,
    FakeStoreModule,
    ForbiddenModule,
    LandingPageModule,
    UnauthorizedModule,
    PageNotFoundModule
  ],
})
export class PagesModule {}
