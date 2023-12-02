import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';

import { bootstrapApplication } from '@angular/platform-browser';
import { ROOTROUTES } from './app/app-root-routes';
import { provideRouter } from '@angular/router';
import { SecurityContext } from '@angular/core';
import { provideMarkdown } from 'ngx-markdown';
import { HttpClient, provideHttpClient } from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, { 
  providers: [
    // you can pass all providers from your AppModule
    provideRouter(ROOTROUTES),
    provideHttpClient(),
    provideMarkdown({ 
      sanitize: SecurityContext.NONE,
      loader: HttpClient
    }),
  ], 
}).catch(err => console.error(err));
