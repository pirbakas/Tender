import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from "../../app.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  successMessage = '';
  failedMessage = '';
  isFailed = false;
  isSuccess = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    nickname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    password_confirmation: new FormControl(''),
    address: new FormControl(''),
    description: new FormControl(''),
    picture: new FormControl('')
  });

  toggleFailed() {
    this.isFailed = !this.isFailed;
  }

  toggleSuccess() {
    this.isSuccess = !this.isSuccess;
    this.router.navigate(['/home'])
  }

  onSubmit() {
    this.registerUser(this.registerForm.value);
  }

  async registerUser(value) {
    const headers = {'Content-Type': 'application/json'};
    this.http.post(AppComponent.url + '/register', JSON.stringify(value), {headers}).subscribe({
      next: data => {
        if (data['email']) {
          this.isFailed = true;
          this.failedMessage = 'The email has already been taken.';
          setTimeout(this.toggleFailed.bind(this), 3000);
        }
        if (data['nickname']) {
          sessionStorage.setItem('token' , data['token']);
          sessionStorage.setItem('userId', data['id']);
          this.isSuccess = true;
          this.successMessage = 'Welcome on board ' + data['nickname'];
          setTimeout(this.toggleSuccess.bind(this), 3000);
        }
      },
      error: error => {
        this.failedMessage = 'Error, call the webmaster to resolve the bug';
      }
    });
  }
}
