import { ApplicationConfig, Injectable, provideZoneChangeDetection } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { ErrorHandleInterceptor } from './interceptor/error-handle.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SpinnerInterceptor } from './interceptor/spinner.interceptor';





export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()), // ✅ Correct way for class-based interceptors
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }, // Ensure interceptor is provided
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor , multi: true }, // Ensure interceptor is provided
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandleInterceptor, multi: true }, provideAnimationsAsync(), // Ensure interceptor is provided

  ],
};
