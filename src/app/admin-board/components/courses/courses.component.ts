import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { CourseService } from 'src/app/_services/course.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  contents? : any;

  courses?:any;

  currentIndex = -1;

  currentTutorial: any = {};

  message = ""

  courseTitle = "";

  page = 1;
  count = 0;
  pageSize = 4;
  pageSizes = [4, 8, 12, 100];
  course = ""

  constructor(private userService: UserService, private courseService: CourseService,private adminService: AdminService) { }

  ngOnInit(): void {

    // this.userService.getPublicContent().subscribe(
    //   data=> {
    //     this.content = data;
    //   },
    //   err => {
    //     this.content = JSON.parse(err.error).message;
    //   }
    // )

    // this.courseService.getAllCourses().subscribe(
    //   data => {
    //     this.contents = data;
    //   },
    //   err => {
    //     this.contents = JSON.parse(err.error).message;
    //   }
    // )

    this.retrieveCourses();

  }

  getRequestParams(courseTitle: string, page: number, pageSize:number): any{
    let params:any = {};

    if(courseTitle){
      params.courseTitle = courseTitle
    }

    if(page){
      params.page = page - 1;
    }

    if(pageSize){
      params.size = pageSize
    }

    return params

  }

  retrieveCourses(): void {
    const params = this.getRequestParams(this.courseTitle, this.page, this.pageSize)

    this.courseService.getAllCourses(params)
    .subscribe(response => {
      const { courses, totalItems } = response;
      this.contents = courses
      this.count = totalItems
    },
    error => {
      console.log(error);
    })
  }

  searchCourseName(): void{
    this.page = 1;
    this.retrieveCourses();
  }

  deleteCourse(id:any): void{
    this.adminService.deleteCourse(id)
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

  handlePageChange(event: number) : void{
    this.page = event;
    this.retrieveCourses();
  }

  handlePageSizeChange(event: any): void{
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveCourses();
  }

  setActiveTutorial(tutorial: any, index: number) : void{
    this.currentTutorial = tutorial;
    this.currentIndex = index
  }
  
}
