import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users : any = []

  currentUser : any = {};
  currentIndex = -1
  username = '';
  isLoggedIn = false;
  isAdmin = false
  page=1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 5, 10];

  deleteMessage = ""

  constructor(private adminService: AdminService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn){
      const user = this.tokenStorageService.getUser();
      this.isAdmin = user.roles.includes("admin")
    }

    // this.adminService.getAllUser()
    // .subscribe(data => {
    //   this.users = data
    // })
    this.retrieveUsers()

    
  }

  updateRole(id:any, role: string): void{

    this.adminService.updateRole(id, role)
    .subscribe(response => {
      console.log(response)
      window.location.reload()
    }, err => {
      console.log(err)
      
    })

  }

  getRequestParams(username: string, page: number, pageSize: number):any{
    let params : any = {};

    if(username){
      params.username = username
    }

    if(page){
      params.page = page - 1;
    }

    if(pageSize){
      params.size = pageSize
    }

    return params
  }

  setActive(user: any, index: number): void{
    this.currentUser = user;
    this.currentIndex = index
  }

  retrieveUsers(): void{
    const params = this.getRequestParams(this.username, this.page, this.pageSize)

    this.adminService.getAllUser(params)
    .subscribe(response => {
      const { users, totalItems } = response;
      this.users = users
      this.count = totalItems
    },
    error => {
      console.log(error);
    }
    )
  }

  deleteUser(id:any): void {
    this.adminService.deleteUser(id)
    .subscribe(response => {
      console.log(response);
      
      this.deleteMessage = response.message
      this.retrieveUsers()
    },
    err => {
      console.log(err)
      this.deleteMessage = err.error.message      
    }
    )
    
  }

  searchUsername(): void{
    this.page = 1;
    this.currentIndex = -1
    this.currentUser = {}
    this.retrieveUsers()
  }

  handlePageChange(event: number): void{
    this.page = event;
    this.retrieveUsers();
    this.currentIndex = -1
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveUsers();
    this.currentIndex = -1
  }

}
