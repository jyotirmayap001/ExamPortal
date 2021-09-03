import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';



@Injectable()
export class AuthInterceptors implements HttpInterceptor{

constructor(private login:LoginService){}

    intercept(req: import("@angular/common/http").HttpRequest<any>, 
              next: import("@angular/common/http").HttpHandler): 
              import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {



                //Add the jwt token to every Http request.
                let authRequest=req;
                const token=this.login.getToken();      
                if(token!=null){

                    authRequest=authRequest.clone({setHeaders:{Authorization:`Bearer ${token}`}});
                }
                return next.handle(authRequest);

            throw new Error("Method not implemented.");
    }

    
}

export const authInterceptorProvider=[

    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptors,multi:true}
]