import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Item } from './item/item.model';
import { ItemService } from './item/item.service';


@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  dados: Item[] = [];

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.listar().subscribe(resp => {
      this.dados = resp;
      console.log(resp);
      
    });
  }


  // fictícios para localStorage
  cargaDados() {
    this.itemService.cargaDados();
  }



}
