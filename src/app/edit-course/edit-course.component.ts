import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../_services/course.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  // currentCourse: any = {
  //   id: "",
  //   title: "",
  //   description: ""
  // }

  currentCourse:any;

  message = "";

  updatted = false;

  isLoggedIn = false;
  show = false;

  constructor(private courseService: CourseService, private tokenStorageService: TokenStorageService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.message = "";
    this.getCourse(this.route.snapshot.params.id);

    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  getCourse(id: any): void {
    this.courseService.getCourseWithId(id)
      .subscribe(
        data => {
          this.currentCourse = data;
          // console.log(data);

        },
        error => {
          console.log(error);

        }
      )
  }

  updateCourse(): void {
    this.message = "";

    this.courseService.updateCourse(this.currentCourse.id, this.currentCourse)
      .subscribe(
        response => {
          console.log(response.code)
          if(response.code == 423){
            this.message = "This is not your own course"
          }
          if(response.code == 200){
            this.updatted = true
          }
        },
        err => {
          this.message = err.error.message
          console.log(err.error.message);

        }

      )
  }

  deleteCourse(): void {

    this.courseService.deleteCourse(this.currentCourse.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/profile'])
        },
        err => {
          this.message = err.error.message
          console.log(err.error.message);

        }
      )

  }




}
