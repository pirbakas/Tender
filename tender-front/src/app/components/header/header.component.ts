import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private id;
  isConnect = false;
  public user = new User();

  constructor(private router: Router, private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    this.id = sessionStorage.getItem('userId');
    this.checkIfConnect();
    this.getUser();
  }

  checkIfConnect() {
    if (sessionStorage.getItem('userId')) {
      this.isConnect = true;
    }
  }

  async getUser() {
    if (this.id) {
      (await this.userService.getUserById(this.id)).subscribe({
        next: data => {
          // @ts-ignore
          this.user = data;
        }
      });
    }
  }

}
