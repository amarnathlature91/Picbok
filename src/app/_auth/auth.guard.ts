import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from '../_service/user-auth.service';

@Injectable()
export class authGuard implements CanActivate {
  constructor(private userAuthservice:UserAuthService,private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.userAuthservice.getToken()!== null){
      return true;
    }
    else{
      this.router.navigate(['/login'])
      return false;
    }
  }
};
