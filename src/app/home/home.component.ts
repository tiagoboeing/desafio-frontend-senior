import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  corBarraSuperior = 'navbar-color';

  constructor() { }

  @Output() toggle = new EventEmitter();

  ngOnInit() {
    if (localStorage.getItem('cores')) {
      this.corBarraSuperior = localStorage.getItem('cores');
    } else {
      this.corBarraSuperior = 'navbar-color';
    }

  }

  toggleMenu() {
    this.toggle.emit();
  }

  personalizaBarraSuperior(cor: string) {

    let corSelecionada = 'navbar-color';

    switch (cor) {
      case 'azul':
        corSelecionada = 'bg-primary';
        break;

      case 'vermelho':
        corSelecionada = 'bg-danger';
        break;

      case 'amarelo':
        corSelecionada = 'bg-warning';
        break;

      default:
        corSelecionada = 'navbar-color';
        break;
    }

    // guardamos no localStorage
    localStorage.setItem('cores', corSelecionada);

    this.ngOnInit();
  }


}
