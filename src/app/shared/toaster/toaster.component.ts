import { Component } from '@angular/core';

import { sharedservice } from '../service/shared.service';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toast',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css'],
  imports:[CommonModule,NgbToastModule]
})
export class ToastComponent {
  constructor(public toastService: sharedservice) {}

  closeToast() {
    this.toastService.showToast = false;
  }
}
