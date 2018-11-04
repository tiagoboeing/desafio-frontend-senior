import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public cache: any;

  public getStorage() {
    this.cache = JSON.parse(localStorage.getItem('itens'));
  }

}
