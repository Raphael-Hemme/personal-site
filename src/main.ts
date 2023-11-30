import { enableProdMode, SecurityContext, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { MarkdownModule } from 'ngx-markdown';
import { withInterceptorsFromDi, provideHttpClient, HttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { SharedModule } from './app/shared/shared.module';
import { CoreModule } from './app/core/core.module';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, CoreModule, SharedModule, MarkdownModule.forRoot({
            sanitize: SecurityContext.NONE,
            loader: HttpClient
        })),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
