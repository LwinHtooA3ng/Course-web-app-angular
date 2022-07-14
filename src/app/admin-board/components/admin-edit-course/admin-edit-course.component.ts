import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
import { CourseService } from 'src/app/_services/course.service';

@Component({
  selector: 'app-admin-edit-course',
  templateUrl: './admin-edit-course.component.html',
  styleUrls: ['./admin-edit-course.component.css']
})
export class AdminEditCourseComponent implements OnInit {

  currentCourse:any;

  message = "";

  updatted = false;

  constructor(private courseService: CourseService,private adminService: AdminService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.message = "";
    this.getCourse(this.route.snapshot.params.id);
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

    this.adminService.updateCourse(this.currentCourse.id, this.currentCourse)
      .subscribe(
        response => {
          console.log(response)
          this.updatted = true
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
