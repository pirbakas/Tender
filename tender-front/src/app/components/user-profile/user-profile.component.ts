import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  private id;
  public user = new User();
  successMessage = '';
  failedMessage = '';
  isSuccess = false;
  isFailed = false;

  updateUserForm = new FormGroup({
    nickname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    password_confirmation: new FormControl(''),
    address: new FormControl(''),
    description: new FormControl(''),
    picture: new FormControl(''),
    id: new FormControl('')
  });

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.id = sessionStorage.getItem('userId');

    this.getUser();
  }

  toggleSuccess() {
    this.isSuccess = !this.isSuccess;
  }

  toggleFailed() {
    this.isFailed = !this.isFailed;
  }

  onSubmit() {
    this.updateUserForm.get('id').setValue(sessionStorage.getItem('userId'));
    this.updateUser(this.updateUserForm.value);
  }

  async getUser() {
    if (this.id) {
      (await this.userService.getUserById(this.id)).subscribe({
        next: data => {
          if (data == null) {
            this.router.navigate(['/home']);
          }
          // @ts-ignore
          this.user = data;
        },
        error: error => {
          this.router.navigate(['/home']);
        }
      });
    }
  }
  async updateUser(value) {
    if (this.id) {
      (await this.userService.updateUser(value)).subscribe({
        next: data => {
          if (data['success']) {
            this.isSuccess = true;
            this.successMessage = data['success'];
            setTimeout(this.toggleSuccess.bind(this), 3000);
          }
          if (data['error']) {
            this.isFailed = true;
            this.failedMessage = data['error'];
            setTimeout(this.toggleFailed.bind(this), 3000);
          }
        },
        error: error => {
          this.failedMessage = 'Error, call the webmaster to resolve the bug';
          setTimeout(this.toggleFailed.bind(this), 3000);
        }
      })
    }
  }

}
