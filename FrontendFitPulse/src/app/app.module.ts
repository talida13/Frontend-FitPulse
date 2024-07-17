import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TenantService } from './core/services/tenant.service';
import { map } from 'rxjs';
import { Tenant } from './core/models/tenant.model';

function initialize(tenantService: TenantService): () => Promise<boolean> {
  return (): Promise<boolean> => {
    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
      tenantService
        .getConfig()
        .pipe(
          map((tenant: Tenant) => {
            tenantService.tenant = tenant;
            resolve(true);
          })
        )
        .subscribe();
    });
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    LayoutModule,
    FeaturesModule,
    CoreModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initialize,
      deps: [TenantService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
