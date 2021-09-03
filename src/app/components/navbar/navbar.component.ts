import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedin=false;
  user =null; 
  


  constructor(public  loginService:LoginService,private router:Router) { }

  ngOnInit(): void {

    this.isLoggedin=this.loginService.isLoggedIn();
    this.user=this.loginService.getUser();
    
    this.loginService.loginStatusSubject.asObservable().subscribe((data)=>{

      this.isLoggedin=this.loginService.isLoggedIn();
      this.user=this.loginService.getUser();

    })
  }


  logout(){this.loginService.logout();this.isLoggedin=false;this.user=null;this.router.navigate(['login']);}


}
