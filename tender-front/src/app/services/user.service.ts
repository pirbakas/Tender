import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  baseUrl = '/user/';
  token = sessionStorage.getItem('token');

  async getUserById(id) {
    const headers = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token};
    return this.http.get(AppComponent.url + this.baseUrl + id, {headers});
  }

  async updateUser(request) {
    const headers = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token};
    return this.http.put(AppComponent.url + '/users', request, {headers});
  }
}
