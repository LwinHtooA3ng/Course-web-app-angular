import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css']
})
export class AdminBoardComponent implements OnInit {

  currentUser:any;
  roles: any;
  isAdmin = false

  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser()
    this.roles = this.token.getUser().roles
    this.isAdmin = this.roles.includes("admin")
  }

}
