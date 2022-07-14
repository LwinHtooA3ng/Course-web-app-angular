import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular12CourseSchoolBp';

  private roles: string[] = [];
  isLoggedIn=false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?:string;
  showCreateCourse = false;

  constructor(private tokenStorageService: TokenStorageService){}

  ngOnInit(): void{
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn){
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes("admin");
      this.showModeratorBoard = this.roles.includes("moderator");
      this.showCreateCourse = this.roles.includes("admin") || this.roles.includes("moderator");
      this.username = user.username;
    }
  }

  logout(): void{
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
