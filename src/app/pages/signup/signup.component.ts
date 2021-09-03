import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }


  public user = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: ''
  }

  formSubmit() {

    if (this.user.username == '' || this.user.username == null) {
      this.snackBar.open('Please fill username','OK',
      {duration:3000,verticalPosition:'top',horizontalPosition:'right'});
      return;
    }

    if (this.user.password == '' || this.user.password == null) {
      this.snackBar.open('Please fill password','OK',
      {duration:3000,verticalPosition:'top',horizontalPosition:'right'});
      return;
    }
    if (this.user.firstname == '' || this.user.firstname == null) {
      this.snackBar.open('Please fill first name','OK',
      {duration:3000,verticalPosition:'top',horizontalPosition:'right'});
      return;
    }

    if (this.user.lastname == '' || this.user.lastname == null) {
      this.snackBar.open('Please fill last name','OK',
      {duration:3000,verticalPosition:'top',horizontalPosition:'right'});
      return;
    }
    if (this.user.email == '' || this.user.email == null) {
      this.snackBar.open('Please fill email','OK',
      {duration:3000,verticalPosition:'top',horizontalPosition:'right'});
      return;
    }

    if (this.user.phone == '' || this.user.phone == null) {
      this.snackBar.open('Please fill phone','Ok',
      {duration:3000,verticalPosition:'top',horizontalPosition:'right'});
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data) => {
        Swal.fire("Success","Registered successfully.","success");
        this.resetRegData();
      },
      (error) => {
        this.snackBar.open('Something went wrong','Ok',
        {duration:3000,verticalPosition:'top',horizontalPosition:'right'});
      }


    )
  }
  resetRegData() {

    this.user.username = '';
    this.user.password = '';
    this.user.firstname = '';
    this.user.lastname = '';
    this.user.email = '';
    this.user.phone = '';
  }

}
