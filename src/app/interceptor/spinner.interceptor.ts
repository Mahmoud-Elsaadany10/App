import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { SpinnerService } from '../shared/service/spinner.service';


@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnerService.show(); // Show spinner before request starts

    return next.handle(req).pipe(
      finalize(() => {
        this.spinnerService.hide();
        // console.log('Spinner hidden'); // Hide spinner when request completes
      })
    );
  }
}
