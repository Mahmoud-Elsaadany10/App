import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerService } from '../service/spinner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  loading$: Observable<boolean> | undefined;

  constructor(private spinner: SpinnerService) {

  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.loading$ = this.spinner.loading$;
  }


}
