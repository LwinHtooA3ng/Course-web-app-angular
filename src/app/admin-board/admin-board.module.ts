import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminBoardRoutingModule } from './admin-board-routing.module';
import { UsersComponent } from './components/users/users.component';
import { CoursesComponent } from './components/courses/courses.component';
import { AdminBoardComponent } from './admin-board.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminEditCourseComponent } from './components/admin-edit-course/admin-edit-course.component';



@NgModule({
  declarations: [
    AdminBoardComponent,
    UsersComponent,
    CoursesComponent,
    AdminEditCourseComponent,
  ],
  imports: [
    CommonModule,
    AdminBoardRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ]
})
export class AdminBoardModule { }
