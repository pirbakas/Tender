import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../../app.component';

export class Plat {
  constructor(
    public id: string,
    public created_at,
    public updated_at,
    public user_id: string,
    public type: string,
    public title: string,
    public description: string,
    public portion: number,
    public location: string,
    public withdrawal_time,
    public url_image: string,
    public user_nickname:string
  ) {
  }
}

export class User {
  constructor(
    public id: string,
    public nickname: string
  ){
  }
}

export class Cuisine {
  constructor(
    public id: string,
    public created_at: string,
    public updated_at: string,
    public cuisine_title: string,
    public description: string,
    public urlimage: string
  ){
  }
}

@Component({
  selector: 'app-plats',
  templateUrl: './plats.component.html',
  styleUrls: ['./plats.component.scss']
})
export class PlatsComponent implements OnInit {

  urlApi = AppComponent.getUrlOfBack().concat('/api/dish');
  plats: Plat[];
  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getPlats();
  }
  getPlats(){
    this.httpClient.get<any>(this.urlApi).subscribe(
      response => {
        this.plats = response;
      }
    );
  }
}
