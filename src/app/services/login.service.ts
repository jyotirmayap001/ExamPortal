import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseurl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

public loginStatusSubject=new Subject<boolean>();

constructor(private http: HttpClient) { }

public generateToken(loginDetails:any){

  return this.http.post(`${baseurl}/generate-token`,loginDetails);

}

public getCurrentUser(){
  return this.http.get(`${baseurl}/current-user`);
}

public loginUser(token){

  localStorage.setItem("token",token);
  
  return;
}

public isLoggedIn(){

  let token=localStorage.getItem("token");

  if(token==undefined || token=='' || token==null){
    return false;
  }
  else{return true;}
}

public logout(){localStorage.removeItem("token"); localStorage.removeItem("user"); return true;}

public getToken(){return localStorage.getItem("token");}

public setUser(user){localStorage.setItem("user",JSON.stringify(user));}

public getUser(){let user=localStorage.getItem("user"); if(user!=null){return JSON.parse(user);}else{this.logout(); return null;}}

public getUserRole(){
  let user=this.getUser();

  return user.authorities[0].authority;
}

}
