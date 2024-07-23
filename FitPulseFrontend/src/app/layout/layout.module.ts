import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavigationMenuComponent } from './header/navigation-menu/navigation-menu.component';
import { NavigationMenuContentComponent } from './header/navigation-menu/navigation-menu-content/navigation-menu-content.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HomepageComponent,
    NavigationMenuComponent,
    NavigationMenuContentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
