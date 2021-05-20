import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }

  baseUrl = '/dishes/';
  bookUrl = '/bookDish';

  // Get Dish By Type
  async getDishByType(type) {
    const headers = {'Content-Type': 'application/json'};
    return this.http.get(AppComponent.url + this.baseUrl + type, {headers});
  }

  async bookDish(request) {
    const headers = {'Content-type': 'application/json'};
    return this.http.put(AppComponent.url + this.bookUrl, request, {headers});
  }
}
