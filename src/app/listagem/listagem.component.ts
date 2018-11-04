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

  dados: Item[];

  constructor(private itemService: ItemService) { }

  ngOnInit() {


  }

  // fictícios para localStorage
  cargaDados() {
    this.itemService.cargaDados();
  }



}
