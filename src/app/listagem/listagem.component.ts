import { Component, OnInit } from '@angular/core';

import { Item } from './item/item.model';
import { ItemService } from './item/item.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  dados: Item[];
  item: Item;

  statusLocalStorage: boolean;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    // DADOS FICTÍCIOS PELA PRIMEIRA VEZ, caso vazio
    if ('itens' in localStorage) {
      this.statusLocalStorage = true;

      // nos inscrevemos na lista de itens
      this.itemService.listarItens.subscribe(resp => {
        this.dados = resp;
      });

      // emitimos um primeiro evento de forma assíncrona
      this.itemService.preencheDados();

    } else {
      this.statusLocalStorage = false;

      // descomente se preferir carregar automaticamente
      // this.cargaDados();
    }
  }

  carga() {
    this.itemService.preencheDados();
  }

  // fictícios para localStorage
  cargaDados() {
    this.itemService.cargaDados();
  }

}
