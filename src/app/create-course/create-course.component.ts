import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { CourseService } from '../_services/course.service';
import { FileUploadService } from '../_services/file-upload.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  // selectedFiles?: FileList;
  selectedFiles?: any;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;

  imgurl = ""

  form: any = {
    title: "",
    description: "",
    image: ""
  }

  submitted: boolean = false;

  hasError: boolean = false;

  imageMessage : any = "";

  errorMessage: any = "";

  preview = "";

  isLoggedIn = false;

  isModOrAdmin = false;

  constructor(private http: HttpClient, private courseService: CourseService, private tokenStorageService: TokenStorageService, private uploadService: FileUploadService) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.isModOrAdmin = user.roles.includes("moderator") || user.roles.includes("admin");
    }
  }

  // mytest

  files: File[] = [];

	onSelect(event:any) {
		// console.log(event.addedFiles[0]);
    this.files = [];
    this.imageMessage = ""
		this.files.push(...event.addedFiles);
    this.selectedFiles = event.addedFiles[0];
	}

	onRemove(event:any) {
    this.selectedFiles = null;
		this.files.splice(this.files.indexOf(event), 1);
	}

  onSubmit(): void {

    // console.log("hi Hi");
    

    const { title, description } = this.form;

    // console.log(this.selectedFiles);
    

    if (this.selectedFiles) {
      this.imageMessage = "";
      const file: File | null = this.selectedFiles;
      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).pipe(
          map(
            data => {
              console.log(data.code);

              if (data.code == 431) {
                this.errorMessage = "Course image cann't larger than 2Mb."
                this.currentFile = undefined
                this.selectedFiles = undefined
              }

              if (data.code == 200) {
                this.message = ""
                var image = data.url
                return image
              }
            }
          ),
          mergeMap(image => this.courseService.createCourse(title, description, image))
        ).subscribe(
          data => {
            console.log(data.code);

            if (data.code == 426) {
              this.errorMessage = "title required"
              this.hasError = true;
            }

            if (data.code == 429) {
              this.errorMessage = "Course image cann't be empty.Please upload image !"
              this.hasError = true;
            }

            if (data.code == 200) {
              this.submitted = true
            }
          }
        )

      }
      // this.selectedFiles = null
    }
    this.imageMessage = "Image required jj"
  }

}
