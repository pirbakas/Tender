import { Component, OnInit } from '@angular/core';
import { DishService } from "../../services/dish.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-home-type',
  templateUrl: './home-type.component.html',
  styleUrls: ['./home-type.component.scss']
})
export class HomeTypeComponent implements OnInit {

  private type;
  platsType: any = [];
  noData = '';

  constructor(private dishService: DishService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.params.type;
    this.getDishes();
  }

  async getDishes() {
    if (this.type) {
      (await this.dishService.getDishByType(this.type)).subscribe({
        next: data => {
          if (Object.keys(data).length === 0) {
            this.noData = 'Thy are no food for this type';
          }
          // @ts-ignore
          for (const d of Object.keys(data)) {
            this.platsType.push({
              id: data[d].id,
              type: data[d].type,
              title: data[d].title,
              description: data[d].description,
              portion: data[d].portion,
              location: data[d].location,
              withdrawal_time: data[d].withdrawal_time,
              url_image: data[d].url_image,
              user_id: data[d].user_id
            });
          }
        },
        error: error => {
          // TODO : renvoyer un erreur
        }
      });
    }
  }

}
