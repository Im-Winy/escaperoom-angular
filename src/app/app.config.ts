import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NotifierModule } from 'angular-notifier';
import { routes } from './app.routes';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // Active le système de routing
    importProvidersFrom(HttpClientModule), // Active les requêtes HTTP
    importProvidersFrom(NotifierModule), // Active les notifications
    importProvidersFrom(ReactiveFormsModule, FormsModule), // Active les formulaires réactifs et basés sur ngModel
    importProvidersFrom(ToastrModule.forRoot()) // ✅ Active Toastr dans Angular standalone
  ]
};
