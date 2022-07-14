import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCourseComponent } from '../edit-course/edit-course.component';
import { AdminBoardComponent } from './admin-board.component';
import { AdminEditCourseComponent } from './components/admin-edit-course/admin-edit-course.component';
import { CoursesComponent } from './components/courses/courses.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: "admin", component: AdminBoardComponent, children: [
      { path: "users", component: UsersComponent },
      { path: "courses", component: CoursesComponent },
      { path: "edit-course/:id", component: AdminEditCourseComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminBoardRoutingModule { }
