import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path:"home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "profile", component: ProfileComponent },
  { path: "create-course", component: CreateCourseComponent },
  { path: "update-course/:id", component: EditCourseComponent },
  { path: "course-detail", component: CourseDetailComponent },
  { path: "", redirectTo:"home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
