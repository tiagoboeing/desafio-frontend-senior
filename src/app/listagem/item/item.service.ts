import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Item } from './item.model';
import { Observable } from 'rxjs';
import { API } from 'src/app/app.api';

@Injectable()
export class ItemService {

  constructor(private http: HttpClient) { }

  // POST
  cadastra(item: Item): Observable<Item> {
    return this.http.post<Item>(`${API}/itens`, item);
  }

  listar(): Observable<Item[]> {
    return this.http.get<Item[]>(`${API}/itens`);
  }





  // carrega dados fictícios para localStorage
  cargaDados() {
    let item: Item = {
      id: 1541223639453,
      nome: 'Soja 20kg',
      preco: 2.8,
      perecivel: true,
      dataValidade: new Date(),
      dataFabricacao: new Date(),
      unidadeMedida: 'Quilograma',
      quantidade: '20 un'
    };
    this.cadastra(item);

    item = {
      id: 1541223690478,
      nome: 'Coca-Cola 2,5 lt',
      preco: 5.47,
      perecivel: true,
      dataValidade: new Date('2018-06-21'),
      dataFabricacao: new Date('2018-11-10'),
      unidadeMedida: 'Litro',
      quantidade: '2.5 lt'
    };
    this.cadastra(item);

    item = {
      id: 1541223702636,
      nome: 'Produto nunca vence',
      preco: 87.3,
      perecivel: false,
      dataValidade: null,
      dataFabricacao: new Date('2017-12-10'),
      unidadeMedida: 'Unidade',
      quantidade: '53 un'
    };
    this.cadastra(item);

    item = {
      id: 1541223719061,
      nome: 'Produto 3 casas decimais',
      preco: 1.99,
      perecivel: false,
      dataValidade: null,
      dataFabricacao: new Date('2018-08-01'),
      unidadeMedida: 'Quilograma',
      quantidade: '1.998 kg'
    };
    this.cadastra(item);

  }


}
