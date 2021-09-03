import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { NgxUiLoaderService,SPINNER } from 'ngx-ui-loader';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

loginData={
  username:'',
  password :''
}

  constructor(private snack:MatSnackBar,private loginService: LoginService,private router:Router,
    private loader: NgxUiLoaderService) { }

    spinnerType=SPINNER.rectangleBouncePulseOutRapid;


  ngOnInit(): void {
  }


  login(){
    
    if(this.loginData.username=='' || this.loginData.username==null){

      this.snack.open('Username required','OK',{

        duration:3000
      })

      return;
    }

    if(this.loginData.password=='' || this.loginData.password==null){

      this.snack.open('Password required','OK',{

        duration:3000
      })

      return;
    }

      this.loader.start();

      this.loginService.generateToken(this.loginData).subscribe(
          (data:any)=>{
              console.log(data);

              this.loginService.loginUser(data.token);

              this.loginService.getCurrentUser().subscribe(
              (user:any) =>{
                  console.log(user);
                  this.loginService.setUser(user);

                  //rediredt....... ADMIN: admin-dashboard
                  //rediredt....... NORMAL: normal-dashboard

                  this.loader.stop();

                  if(this.loginService.getUserRole()=="ADMIN")
                  {
                    this.router.navigate(['admin-dashboard']);
                    this.loginService.loginStatusSubject.next(true);
                  }
                  else if(this.loginService.getUserRole()=="NORMAL")
                  {
                    this.router.navigate(['user-dashboard']);
                    this.loginService.loginStatusSubject.next(true);
                  }
                  else{
                    this.loginService.logout();

                  }

              });

          },
          (error)=>{
            this.snack.open("Invalid credential, please try again !",'OK',{duration:3500})

          }
 
      )

  }

}
