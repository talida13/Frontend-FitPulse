import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavigationMenuComponent } from './header/navigation-menu/navigation-menu.component';
import { SharedModule } from '../shared/shared.module';
import { HomepageComponent } from './homepage/homepage.component';
import { NavigationMenuContentComponent } from './header/navigation-menu/navigation-menu-content/navigation-menu-content.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { FooterComponent } from './footer/footer.component';




@NgModule({
  declarations: [
    HeaderComponent,
    NavigationMenuComponent,
    HomepageComponent,
    NavigationMenuContentComponent,
    MainLayoutComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

  ],
  exports: [
    HeaderComponent,
    HomepageComponent,
    MainLayoutComponent
  ]
})
export class LayoutModule { }
