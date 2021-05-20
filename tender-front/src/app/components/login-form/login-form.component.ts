import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from "../../app.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  successMessage = '';
  failedMessage = '';
  isFailed = false;
  isSuccess = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  toggleFailed() {
    this.isFailed = !this.isFailed;
  }
  toggleSuccess() {
    this.isSuccess = !this.isSuccess;
    this.router.navigate(['/home']);
  }

  onSubmit() {
    this.loginUser(this.loginForm.value);
  }

  async loginUser(value) {
    const headers = { 'Content-Type': 'application/json' };
    this.http.post(AppComponent.url + '/login', JSON.stringify(value) , { headers }).subscribe({
      next: data => {
        if (data['Error'] === 'Unauthorized Access') {
          this.isFailed = true;
          this.failedMessage = 'Login or password doesn\'t exist';
          setTimeout(this.toggleFailed.bind(this), 3000);
        }
        if (data['nickname']) {
          if (sessionStorage.getItem('token')) {
            this.isSuccess = true;
            this.successMessage = "You are already login";
            setTimeout(this.toggleSuccess.bind(this), 3000);
          } else {
            sessionStorage.setItem('token' , data['token']);
            sessionStorage.setItem('userId', data['id']);
            this.isSuccess = true;
            this.successMessage = 'Welcome back ' + data['nickname'];
            setTimeout(this.toggleSuccess.bind(this), 3000);
          }
        }
      },
      error: error => {
        this.failedMessage = 'Error, call the webmaster to resolve the bug';
      }
    });
  }
}
