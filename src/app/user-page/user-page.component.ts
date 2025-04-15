import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { Observable } from 'rxjs';
import { SpinnerService } from '../shared/service/spinner.service';
import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {


}
