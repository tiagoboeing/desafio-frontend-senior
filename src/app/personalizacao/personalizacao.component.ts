import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-personalizacao',
  templateUrl: './personalizacao.component.html',
  styleUrls: ['./personalizacao.component.css']
})
export class PersonalizacaoComponent implements OnInit {

  constructor(private home: HomeComponent) { }

  ngOnInit() {
  }

  personalizaBarraSuperior(cor: string) {
    this.home.personalizaBarraSuperior(cor);
  }

}
