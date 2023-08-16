import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UserService } from '../_service/user.service';
import { UserAuthService } from '../_service/user-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  firstName: string="";
  lastName: string="";
  email: string="";
  password: string="";

  constructor(private userService:UserService,private userAuthService:UserAuthService,private router:Router){}

  saveregister(RegistrationForm:NgForm) {
    console.log(RegistrationForm.value)
      this.userService.register(RegistrationForm.value).subscribe(
        (Response:any)=>{console.log(Response)
      },(error)=>{console.log(error);}
      );
    }

}
