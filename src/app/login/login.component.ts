import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_service/user.service';
import { UserAuthService } from '../_service/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(private userService:UserService,private userAuthService:UserAuthService,private router:Router){}

  login(loginForm: NgForm){
    this.userService.login(loginForm.value).subscribe(
      (Response:any)=>{this.userAuthService.setToken(Response.token);
        this.router.navigate(['/user'])
    },(error)=>{console.log(error);}
    );
  }

}
