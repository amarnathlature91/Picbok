import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  PATH_OF_API="http://localhost:8181/api";
  requestHeader=new HttpHeaders(
    {"No-Auth":"True"}
  );

  constructor(private httpclient:HttpClient) { }

  public login(logindata: any){
    return this.httpclient.post(this.PATH_OF_API+"/user/login",logindata,{headers:this.requestHeader}) 
  }

  public register(registerdata:any){
    return this.httpclient.post(this.PATH_OF_API+"/user/register",registerdata,{headers:this.requestHeader})
  }
}
