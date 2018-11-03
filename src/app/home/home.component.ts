import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  corBarraSuperior = 'navbar-color';

  constructor() { }

  ngOnInit() {
  }


  personalizaBarraSuperior(cor: string) {
    switch (cor) {
      case 'azul':
        this.corBarraSuperior = 'bg-primary';
        break;

      case 'vermelho':
        this.corBarraSuperior = 'bg-danger';
        break;

      case 'amarelo':
        this.corBarraSuperior = 'bg-warning';
        break;

      default:
        this.corBarraSuperior = 'navbar-color';
        break;
    }
  }

}
