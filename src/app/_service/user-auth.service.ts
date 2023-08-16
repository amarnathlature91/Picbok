import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setToken(jwtToken:string){
    localStorage.setItem("jwtToken",jwtToken);
  }

  public getToken(){
    return localStorage.getItem("jwtToken");
  }

  public clearlc(){
    localStorage.clear();
  }

  public isLoggedIn():boolean{
    const token = localStorage.getItem("jwtToken");
     if(token == null || token.length <=0){
      return false;
     }
     else{
      return true;
     }
  }
}
