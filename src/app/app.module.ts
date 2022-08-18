import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { CreateCourseComponent } from './create-course/create-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminBoardModule } from './admin-board/admin-board.module';
import { AdminBoardRoutingModule } from './admin-board/admin-board-routing.module';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    CreateCourseComponent,
    EditCourseComponent,
    FileUploadComponent,
    CourseDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    AdminBoardModule,
    NgxDropzoneModule,
  ],
  providers: [ authInterceptorProviders ],
  bootstrap: [AppComponent]
})
export class AppModule { }
