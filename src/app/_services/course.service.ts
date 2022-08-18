import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';

const COURSE_API = 'http://localhost:8080/api/course/';

const httpOptions = {
  headers : new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class CourseService{

  constructor(private http: HttpClient) { }

  getAllCourses(params: any): Observable<any>{
    return this.http.get(COURSE_API+"course-user", {params})
  }

  createCourse(title: string, description: string, image:string): Observable<any> {
    return this.http.post(COURSE_API+"create", { title, description, image },httpOptions)
  }

  // createCourseImg(file: File, title: string, description: string, image: string): Observable<any>{

  //   const formData : FormData = new FormData();

  //   formData.append('file', file)

  //   this.http.post("http://localhost:8080/upload", formData).pipe(
  //     map(
  //       data => {
  //         var image = data.url
  //         return image
  //       }
  //     ),
  //     mergeMap( image => this.http.post("http://localhost:8080/api/course/create", {title, description, image}))
  //   )

  // }
  


  userCourse(id:number):Observable<any>{
    return this.http.get(COURSE_API+"user-course/"+id, httpOptions)
  } 

  getCourseWithId(id:number): Observable<any>{
    return this.http.get(COURSE_API+"findById/"+id, httpOptions)
  }

  updateCourse(id:any, data:any): Observable<any>{
    return this.http.put(COURSE_API + "update-course/" + id, data, httpOptions)
  }

  deleteCourse(id:any): Observable<any>{
    return this.http.delete(COURSE_API+"delete/"+id, httpOptions)
  }

}
