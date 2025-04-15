import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  constructor(private adminserve  : AdminService){}
  ngOnInit(): void {
    this.adminserve.getAllUsers().subscribe({
      next:(user)=>{
        console.log(user)
      }
    })
  }



}
