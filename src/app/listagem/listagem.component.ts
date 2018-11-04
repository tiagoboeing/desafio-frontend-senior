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
    // GET
    this.itemService.listar().subscribe(resp => {
      this.dados = resp;
    });

    // monitora event e atualiza lista quando disparado
    this.itemService.event.subscribe(() => this.ngOnInit());
  }


  // dados fictícios
  cargaDados() {
    this.itemService.cargaDados();
  }


}
