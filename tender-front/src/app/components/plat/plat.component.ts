import { Component, Input, OnInit } from '@angular/core';
import { Cuisine, Plat, User } from '../../home/plats/plats.component';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../../app.component';
import { DishService } from "../../services/dish.service";

@Component({
  selector: 'app-plat',
  templateUrl: './plat.component.html',
  styleUrls: ['./plat.component.scss']
})
export class PlatComponent implements OnInit {
  @Input() plat: Plat;
  @Input() user: User;
  @Input() cuisine: Cuisine;
  @Input() isBooked;

  currentUser = sessionStorage.getItem('userId');
  confirm = '';
  successMessage = '';
  failedMessage = '';
  isSuccess = false;
  isFailed = false;

  urlApi = AppComponent.getUrlOfBack().concat('/api/user/');
  urlApiCuisine = AppComponent.getUrlOfBack().concat('/api/cuisines/');

  constructor(private httpClient: HttpClient, private dishService: DishService) { }

  ngOnInit(): void {
    this.getUserNickname();
    this.getDishCuisine();
    this.isBooked = this.plat.portion === 0;
  }

  toggleSuccess() {
    this.isSuccess = !this.isSuccess;
    window.location.reload();
  }

  toggleFailed() {
    this.isFailed = !this.isFailed;
  }

  getUserNickname(){
    this.httpClient.get<any>(this.urlApi.concat(this.plat.user_id)).subscribe(
      response => {
        this.user = response;
      }
    );
  }

  getDishCuisine(){
    this.httpClient.get<any>(this.urlApiCuisine.concat(this.plat.type)).subscribe(
      response => {
        this.cuisine = response;
      }
    );
  }

  book() {
    this.confirm = 'Want to book ' + this.plat.title + ' from ' + this.user.nickname + '?';
    if(confirm(this.confirm)) {
      this.bookDish(JSON.stringify({ dish_id: this.plat.id, booker_id: this.currentUser }));
    }
  }

  async bookDish(value) {
      (await this.dishService.bookDish(value)).subscribe({
        next: data => {
          console.log(data);
          if (data['success']) {
            console.log('je passe');
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
