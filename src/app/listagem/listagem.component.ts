import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { Item } from './item/item.model';
import { ItemService } from './item/item.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  dados: Observable<any> = new Observable();

  item: Item;

  statusLocalStorage: boolean;

  constructor(private itemService: ItemService) { }

  ngOnInit() {

    this.dados = new Observable((observer) => {
      observer.next(this.itemService.getStorage());
      observer.complete();
    });



    // DADOS FICTÍCIOS PELA PRIMEIRA VEZ, caso vazio
    if ('itens' in localStorage) {
      this.statusLocalStorage = true;

      // this.dados = JSON.parse(localStorage.getItem('itens'));

      // assistimos os eventos
      // this.itemService.eventos
      //   .pipe(
      //     tap(resp => {
      //       this.dados = resp;
      //     })).subscribe();

    } else {
      this.statusLocalStorage = false;

      // descomente se preferir carregar automaticamente
      // this.cargaDados();
    }
  }

  // fictícios para localStorage
  cargaDados() {
    this.itemService.cargaDados();
  }

  test() {
    this.dados.subscribe(resp => { console.log(resp); });
  }

}
