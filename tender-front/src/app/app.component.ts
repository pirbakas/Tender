import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  static url = 'http://localhost:8000/api';
  static urlBack = 'http://127.0.0.1:8000';
  title = 'tender-front';
  static getUrlOfBack() {
    return this.urlBack;
  }
}
