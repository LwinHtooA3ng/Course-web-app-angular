import { Component, OnInit } from '@angular/core';
import { CourseService } from '../_services/course.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  contents? : any;

  courses?:any;

  currentIndex = -1;

  currentTutorial: any = {};

  page = 1;
  count = 0;
  pageSize = 4;
  pageSizes = [4, 8, 12, 100];
  course = ""

  constructor(private userService: UserService, private courseService: CourseService) { }

  ok(){
    console.log("clicked");
    
  }

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

  getRequestParams(course: string, page: number, pageSize:number): any{
    let params:any = {};

    if(course){
      params.username = course
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
    const params = this.getRequestParams(this.course, this.page, this.pageSize)

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