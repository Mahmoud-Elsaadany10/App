import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterationService } from '../services/registeration.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  @Input() title: string = "";
  @Input() message: string = "";

  constructor(public activeModal: NgbActiveModal,

    private logoutserve :RegisterationService
  ) {}

  confirm() {
    this.activeModal.close(true);  // Return true when confirmed
    this.logoutserve.logout()
  }

  cancel() {
    this.activeModal.dismiss(false); // Return false when canceled
  }

}
