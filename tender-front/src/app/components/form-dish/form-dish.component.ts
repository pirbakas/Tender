import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppComponent } from "../../app.component";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Cuisine} from '../../home/plats/plats.component';

@Component({
  selector: 'app-form-dish',
  templateUrl: './form-dish.component.html',
  styleUrls: ['./form-dish.component.scss']
})
export class FormDishComponent implements OnInit {

  successMessage = 'Your dish add successful';
  failedMessage = '';
  isFailed = false;
  isSuccess = false;
  errorMessage = 'Thanks to fill the empty field : ';
  urlApi = AppComponent.getUrlOfBack().concat('/api/cuisines');
  cuisines: Cuisine[];

  dishForm = new FormGroup({
    user_id: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    portion: new FormControl(''),
    type: new FormControl(''),
    type_n: new FormControl(''),
    location: new FormControl(''),
    withdrawal_time: new FormControl(''),
    url_image: new FormControl('')
  });

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.getCuisines();
  }

  getCuisines(){
    this.http.get<any>(this.urlApi).subscribe(
      response => {
        this.cuisines = response;
      }
    );
  }
  toggleFailed() {
    this.isFailed = !this.isFailed;
    this.errorMessage = 'Thanks to fill the empty field : ';
  }
  toggleSuccess() {
    this.isSuccess = !this.isSuccess;
    this.router.navigate(['/home']);
  }

  onSubmit() {
    this.dishForm.get("user_id").setValue(sessionStorage.getItem('userId'));
    this.newDish(this.dishForm.value);
  }

  async newDish(value){
    const headers = { 'Content-Type': 'application/json' };
    this.http.post(AppComponent.url + '/dish', JSON.stringify(value) , { headers }).subscribe({
      next: data => {
        for (const d of Object.keys(data)) {
          if(data[d] === 'type') {
            this.errorMessage = this.errorMessage.concat(' Type ');
          }
          if(data[d] === 'title') {
            this.errorMessage = this.errorMessage.concat(',title ');
          }
          if(data[d] === 'description') {
            this.errorMessage = this.errorMessage.concat(',description ');
          }
          if(data[d] === 'portion') {
            this.errorMessage = this.errorMessage.concat(',portion ');
          }
          if(data[d] === 'location') {
            this.errorMessage = this.errorMessage.concat(',location ');
          }
          if(data[d] === 'withdrawal_time') {
            this.errorMessage = this.errorMessage.concat(',whithdrawal ');
          }
        }
        if (this.errorMessage && !data['success']) {
          this.failedMessage = this.errorMessage;
          this.isFailed = true;
          setTimeout(this.toggleFailed.bind(this), 3000);
        }

        if (data['success']){
          this.isSuccess = true;
          setTimeout(this.toggleSuccess.bind(this), 3000);
        }

      },
      error: error => {
        this.failedMessage = 'Error, call the webmaster to resolve the bug';
      }
    });
  }
}
