import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import {  sharedservice } from '../service/shared.service';
import { ServicesService } from '../../main/service/main.service';
import { RegisterationService } from '../../services/registeration.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogoutComponent } from '../../logout/logout.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatBadgeModule} from '@angular/material/badge';
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule , RouterModule , MatInputModule,MatFormFieldModule,FormsModule, MatBadgeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  Toggle =true
  showIcon: boolean =true;
  islogging : boolean = false
  number : any = 0
  hidden: boolean =false;

  constructor(public servIcon : ServicesService , private router : Router ,
    public serNum : sharedservice ,
    public serveLog : sharedservice,
    private _authservice :RegisterationService,
    private modalService: NgbModal
  ){

  }
  ngOnInit(): void {
    this.servIcon.IsToggleCurrent.subscribe((toggle)=>{
      this.Toggle=toggle
    })
    this.serNum.NumberObserv.subscribe((num)=>{
      this.number = num
    })

    this._authservice.userData.subscribe({
      next:()=>{
        if(this._authservice.userData.getValue() !== null){
          this.islogging=true
      }else{
        this.islogging =false
      }
    }})




    // Listen to route changes
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: any) => {
        if(event.url === '/user/home'){
          this.showIcon = true
        }else{
          this.showIcon =false
        }
      });

  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }


  openConfirmModal() {
    const modalRef = this.modalService.open(LogoutComponent, {   windowClass: 'medium-top-modal',
      backdrop: 'static', // Keeps the modal open until user interacts
      keyboard: false
    });
    // modalRef.componentInstance.title = "Delete Product";
    modalRef.componentInstance.message = "Are you sure you want to Log out?";

  }




}


