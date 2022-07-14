import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../_services/course.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;

  user: any;
  showCourse = false;
  message = ""
  roles: string[] = [];
  currentTutorial :any;
  currentIndex = -1;

  constructor(private token: TokenStorageService, private courseService: CourseService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser()

    // console.log("roles"+this.token.getUser().roles);
    this.roles = this.token.getUser().roles
    this.showCourse = this.roles.includes("admin") || this.roles.includes("moderator");    
    

    this.courseService.userCourse(this.currentUser.id).subscribe(data => {
      // console.log(data)
      this.user = data
      
    })
    
  }

  setActiveTutorial(tutorial: any, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  deleteCourse(id:any): void{
    this.courseService.deleteCourse(id)
    .subscribe(
      response => {
        console.log(response);
        window.location.reload()
        // this.router.navigate(['/'])
      },
      err => {
        this.message = err.error.message
        console.log(err.error.message);

      }
    )
  }


}
