import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { CourseService } from '../_services/course.service';
import { FileUploadService } from '../_services/file-upload.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;

  imgurl = ""

  form: any = {
    title: "",
    description: ""
  }

  submitted: boolean = false;

  hasError: boolean = false;

  errorMessage: any = ""

  imageMessage = ""

  imageSuccess = ""

  isLoggedIn = false;

  isModOrAdmin = false;

  constructor(private courseService: CourseService, private tokenStorageService: TokenStorageService, private uploadService: FileUploadService) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.isModOrAdmin = user.roles.includes("moderator") || user.roles.includes("admin");
    }
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }



  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.uploadService.upload(this.currentFile).subscribe(data => {
          console.log(data);
          if (data.code == 431) {
            this.imageMessage = "Course image cann't larger than 2Mb."
            this.currentFile = undefined
            this.selectedFiles = undefined
          }

          if (data.code == 200) {
            this.imageMessage = ""
            this.imageSuccess = "image upload successfully."
            this.imgurl = data.url
          }


        }, err => {
          this.imageMessage = err
          this.currentFile = undefined
          this.selectedFiles = undefined
        })
      }
    }
  }

  onSubmit(): void {

    const { title, description } = this.form;

    const image = this.imgurl

    this.courseService.createCourse(title, description, image).subscribe(data => {
      console.log(data.code);

      if (data.code == 426) {
        this.errorMessage = "title cann't be empty."
        this.hasError = true;
      }

      if (data.code == 429) {
        this.errorMessage = "Course image cann't be empty.Please upload image !"
        this.hasError = true;
      }

      if (data.code == 200) {
        this.submitted = true
      }


    },
      err => {
        this.errorMessage = err.error.message;
        this.hasError = true;
      }
    )

  }

}
  // onSubmit(): void {

  //   if (this.selectedFiles) {
  //     const file: File | null = this.selectedFiles.item(0);
  //     if (file) {
  //       this.currentFile = file;
  //       this.uploadService.upload(this.currentFile).subscribe(data => {
  //         this.imgurl = data.url
  //       }, err => {
  //         this.errorMessage = err
  //       })

  //       const { title, description } = this.form;

  //       const image = this.imgurl

  //       this.courseService.createCourse(title, description, image).subscribe(data => {
  //         console.log(data.code);

  //         if (data.code == 426) {
  //           this.errorMessage = "Title cann't be empty."
  //           this.hasError = true;
  //         }

  //         if (data.code == 429) {
  //           this.errorMessage = "Course image cann't be empty."
  //           this.hasError = true;
  //         }

  //         if (data.code == 200) {
  //           this.submitted = true
  //         }


  //       },
  //         err => {
  //           this.errorMessage = err.error.message;
  //           this.hasError = true;
  //         }
  //       )
  //     }
  //   }
  //   else {
  //     this.errorMessage = "Course image required."
  //   }
  // }

  // selectFile(event: any): void{
  //   this.selectedFiles = event.target.files;
  // }

//   upload1(): void {
//     this.progress = 0;
//     if (this.selectedFiles) {
//       const file: File | null = this.selectedFiles.item(0);
//       if (file) {
//         this.currentFile = file;
//         this.uploadService.upload(this.currentFile).subscribe(
//           (event: any) => {
//             if (event.type === HttpEventType.UploadProgress) {
//               this.progress = Math.round(100 * event.loaded / event.total)
//             } else if (event instanceof HttpResponse) {
//               this.message = event.body.message;
//               this.imgurl = event.body.url

//               this.fileInfos = this.uploadService.getFiles();
//             }
//           },
//           (err: any) => {
//             console.log(err);
//             this.progress = 0;
//             if (err.error && err.error.message) {
//               console.log(err.error.message);

//               this.errorMessage = err.error.message
//             }
//             else {
//               this.errorMessage = "Could not upload the file!"
//             }
//             this.currentFile = undefined
//           }
//         )
//       }
//       this.selectedFiles = undefined;
//     }
//   }

// }
