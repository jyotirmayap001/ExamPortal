import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { NgxUiLoaderService,SPINNER } from 'ngx-ui-loader';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import baseurl from 'src/app/services/helper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user=null;


  percentDone: number;
  uploadSuccess: boolean;

  constructor(private loginService:LoginService,private loader: NgxUiLoaderService,private http:HttpClient) { }

  spinnerType=SPINNER.rectangleBouncePulseOutRapid;

  ngOnInit(): void {
    debugger;

    this.loader.start();
    this.user=this.loginService.getUser();
    this.loader.stop();

  }


  upload(file: File){
    //pick from one of the 4 styles of file uploads below
    this.uploadAndProgressSingle(file);
  }


  //this will fail since file.io dosen't accept this type of upload
  //but it is still possible to upload a file with this style
  uploadAndProgressSingle(file: File){ 
    debugger;
    var formData=new FormData();
    //formData.append("userData",this.user);
    formData.append("userimage",file[0]);

    this.http.post(`${baseurl}/user/updateData`, formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          //this.uploadSuccess = true;
          Swal.fire("success","User data successfully updated.","success");
        }
    });
  }

}
