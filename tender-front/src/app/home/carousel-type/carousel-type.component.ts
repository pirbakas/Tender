import {Component, NgModule, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel-type',
  templateUrl: './carousel-type.component.html',
  styleUrls: ['./carousel-type.component.scss']
})
export class CarouselTypeComponent implements OnInit {

  cells = [
    {name: 'Italian', id: '3' , img: 'https://cdn3.iconfinder.com/data/icons/street-food-and-food-trucker-1/64/pizza-fast-food-bake-bread-512.png' },
    {name: 'French', id: '2' ,img: 'https://cdn0.iconfinder.com/data/icons/free-skycons-mix-april-1/128/yumminky-skycons-mix-05-512.png' },
    {name: 'Korean', id: '4' ,img: 'https://cdn2.iconfinder.com/data/icons/international-food/64/bibimbub-512.png' },
    {name: 'Vegetarian', id: '5' ,img: 'https://cdn2.iconfinder.com/data/icons/covid-19-2/64/26-No_meat-512.png' },
    {name: 'American', id: '6' ,img: 'https://cdn0.iconfinder.com/data/icons/vectr-examples/640/food-hamburder-v1-512.png' },
    {name: 'Vegan', id: '7' ,img: 'https://cdn2.iconfinder.com/data/icons/restaurant-1/100/vegan_food_meal_dinner_lunch_restaurant_vegetables-512.png' },
    {name: 'Mexican', id: '8' ,img: 'https://cdn0.iconfinder.com/data/icons/fastfood-30/64/kebab-taco-meat-chicken-fastfood-food-bisto-512.png' },
    {name: 'Lebaneses', id: '9' ,img: 'https://cdn0.iconfinder.com/data/icons/fastfood-30/64/barbeque-fast-food-fastfood-meat-party-bbq-512.png' },
    {name: 'Desert', id: '10' ,img: 'https://cdn0.iconfinder.com/data/icons/fastfood-30/64/cake-piece-topping-strawberry-cheese-dessert-birdthday-512.png' },
    {name: 'Japanese', id: '11' ,img: 'https://cdn0.iconfinder.com/data/icons/fastfood-30/64/sushi-chopsticks-salmon-japanese-food-japan-roll-512.png' },
    {name: 'German', id: '12' ,img: 'https://cdn0.iconfinder.com/data/icons/fastfood-30/64/sausage-hotdog-snack-food-fast-fastfood-grill-512.png'}
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick(name: string) {
    this.router.navigate(['/home/', name]).then(() => {
      window.location.reload();
    });
  }
}
