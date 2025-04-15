import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './shared/toaster/toaster.component';
import { SpinnerComponent } from "./shared/spinner/spinner.component";
import { Observable } from 'rxjs';
import { SpinnerService } from './shared/service/spinner.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgbToastModule, ToastComponent, CommonModule, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  loading$: Observable<boolean>;

  constructor(private spinner: SpinnerService) {
     this.loading$ = this.spinner.loading$;  // No manual subscription, let the async pipe handle it
  }


  title = 'App';



}
