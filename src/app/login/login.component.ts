import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };

  isLoggedIn = false;
  isLoggedFailed = false;

  errorMessage = "";

  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        console.log(data);
        
        if (data.code == 416) {
          this.errorMessage = "User not found."
          this.isLoggedFailed = true
        }
        if (data.code == 417) {
          this.errorMessage = "Invalid password."
          this.isLoggedFailed = true
        }
        if (data.code == 200) {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.isLoggedFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          this.reloadPage();
        }
        // this.tokenStorage.saveToken(data.accessToken);
        // this.tokenStorage.saveUser(data);
        // this.isLoggedFailed = false;
        // this.isLoggedIn = true;
        // this.roles = this.tokenStorage.getUser().roles;
        // this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoggedFailed = true
      }
    )

  }

  reloadPage(): void {
    window.location.reload();
  }

}
