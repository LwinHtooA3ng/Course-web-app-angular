import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

const ADMIN_API = 'http://localhost:8080/api/admin/'

const COURSE_API = 'http://localhost:8080/api/course/'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAllUser(params: any): Observable<any> {
    return this.http.get(ADMIN_API + "allUser/", {params})
  }

  updateCourse(id: any, data: any): Observable<any> {
    return this.http.put(COURSE_API+ "update-course/" + id, data)
  }

  deleteUser(id:any): Observable<any> {
    return this.http.delete(ADMIN_API + "delete-user/"+id)
  }

  deleteCourse(id:any): Observable<any>{
    return this.http.delete(COURSE_API+ "delete/"+id)
  }

  updateRole(id: any, role: string): Observable<any> {
    return this.http.put(ADMIN_API+ "update-role/"+ id, {
      role: role
    })
  }


}
