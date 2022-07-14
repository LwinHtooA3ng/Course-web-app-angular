import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {
    username: null,
    fullName: null,
    email: null,
    password: null
  };

  isSuccessful = false;
  isSignUpFailed = false;

  errorMessage = "";

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    const {username,fullName, email, password} = this.form;

    console.log(fullName);
    

    this.authService.register(username, fullName, email, password).subscribe(data => {
      console.log(data.code);
      
      if(data.code == 410){
        this.isSignUpFailed = true;
        this.errorMessage = "Username cann't contain space."
      }
      if(data.code == 411){
        this.isSignUpFailed = true;
        this.errorMessage = "Email cann't contain space."
      }
      if(data.code == 412){
        this.isSignUpFailed = true;
        this.errorMessage = "Password cann't contain space."
      }
      if(data.code == 413){
        this.isSignUpFailed = true;
        this.errorMessage = "Username is already used."
      }
      if(data.code == 414){
        this.isSignUpFailed = true;
        this.errorMessage = "Email is already used."
      }
      if(data.code == 415){
        this.isSignUpFailed = true;
        this.errorMessage = "Role does not exists."
      }
      if(data.code == 200){
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      }
      
    },
    err => {
      // console.log("err " + err.error.code);
      
      this.errorMessage = err.error.message;
      this.isSignUpFailed = true
    }
    )

  }

}
