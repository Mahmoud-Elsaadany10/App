import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { sharedservice } from '../shared/service/shared.service';
import { RegisterationService } from '../services/registeration.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formReg!: FormGroup;
  iClick: boolean = false;
  iClickTwo: boolean = false;
  logged: boolean = true;
  users: any[] = [];
  errroMessage: string = '';
  isloading: boolean = false;
  ErrorMessage: string = '';

  constructor(
    private fBuldier: FormBuilder,
    public servLog: sharedservice,
    private serveLogging: RegisterationService,
    private router: Router,

  ) {
    this.formReg = this.fBuldier.group(
      {
        Name: ['', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
        Email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
            ),
          ],
        ],
        Password: ['', [Validators.required, Validators.minLength(6)]],

      }
    );
  }

  ngOnInit(): void {

  }

  iconClick(ele: HTMLElement) {
    this.iClick = !this.iClick;
    if (ele.getAttribute('type') === 'password') {
      ele.setAttribute('type', 'text');
    } else {
      ele.setAttribute('type', 'password');
    }
  }



  get Name() {
    return this.formReg.get('Name');
  }
  get Email() {
    return this.formReg.get('Email');
  }
  get Password() {
    return this.formReg.get('Password');
  }


  //   const postData = { ...this.formReg.value };
  //   delete postData.confirmPass;

  //   this.serveLogging.register(postData).subscribe(
  //     (response) => {
  //       this.messageServ.add({
  //         severity: 'success',
  //         summary: 'Registration Successful',
  //         detail: 'You have been registered successfully!',
  //       });
  //       this.router.navigate(['/user/logIn']);
  //     },
  //     (error) => {
  //       this.messageServ.add({
  //         severity: 'error',
  //         summary: 'Registration Failed',
  //         detail: 'An error occurred during registration.',
  //       });
  //       this.errroMessage = error.message || 'Unexpected error occurred';
  //     }
  //   );
  // }


  // formerReg.value()
  sendToApi() {
    this.isloading= true
    let user = { ...this.formReg.value };
    console.log('User data to send:', user);
    // console.log(this.formReg.value)

    // Send the user data to the API
    this.serveLogging.register(user).subscribe({
      next: (response) => {
        if(response.message =="User already exists"){
        // Navigate to the login page
        this.router.navigate(['/user/logIn']);
        this.isloading= false
        }
      },error:()=>{
        this.isloading= false
      }
    });
  }
}


