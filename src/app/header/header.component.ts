import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_service/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
constructor(private userAuthService:UserAuthService,private router:Router){}
  ngOnInit(): void {
  }

  public isLoggedIn():boolean{
    return this.userAuthService.isLoggedIn();
  }

  public logout(){
    this.userAuthService.clearlc();
    this.router.navigate(['/home'])
  }
}
