import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Item } from './item.model';
import { Observable } from 'rxjs';
import { API } from 'src/app/app.api';

@Injectable()
export class ItemService {

  // evento de atualização de tela
  @Output() event = new EventEmitter();

  constructor(private http: HttpClient) { }

  // POST
  cadastra(item: Item): Observable<Item> {
    return this.http.post<Item>(`${API}/itens`, item);
  }

  // GET
  listar(): Observable<Item[]> {
    return this.http.get<Item[]>(`${API}/itens`);
  }

  // GET by ID
  itemByID(id: number): Observable<Item> {
    return this.http.get<Item>(`${API}/itens/` + id);
  }

  // PUT
  atualizar(item: Item): Observable<Item> {
    return this.http.put<Item>(`${API}/itens/` + item.id, item);
  }

  // DELETE
  excluir(item: Item): Observable<Item> {
    return this.http.delete<Item>(`${API}/itens/` + item.id);
  }


  // dados fictícios
  cargaDados() {
    let item: Item = {
      nome: 'Você não vai conseguir colocar números aqui ao editar - 20kg',
      preco: 2.8,
      perecivel: true,
      dataValidade: '2018-03-27',
      dataFabricacao: '2017-01-27',
      unidadeMedida: 'Quilograma',
      quantidade: '20 un'
    };
    this.cadastra(item).subscribe(console.log);

    item = {
      nome: 'Produto somente letras',
      preco: 118.3,
      perecivel: false,
      dataValidade: null,
      dataFabricacao: '2018-09-28',
      unidadeMedida: 'Quilograma',
      quantidade: '53 kg'
    };
    this.cadastra(item).subscribe(console.log);

    item = {
      nome: 'Coca-Cola dois litros e meio',
      preco: 5.47,
      perecivel: true,
      dataValidade: '2018-12-25',
      dataFabricacao: '2018-10-11',
      unidadeMedida: 'Litro',
      quantidade: '2.5 lt'
    };
    this.cadastra(item).subscribe(console.log);

    item = {
      nome: 'Sem criatividade para nome',
      preco: 87.3,
      perecivel: false,
      dataValidade: null,
      dataFabricacao: '2010-10-12',
      unidadeMedida: 'Unidade',
      quantidade: '53 un'
    };
    this.cadastra(item).subscribe(console.log);

    item = {
      nome: 'Qualquer item',
      preco: 1.99,
      perecivel: false,
      dataValidade: null,
      dataFabricacao: '2008-10-11',
      unidadeMedida: 'Quilograma',
      quantidade: '1.998 kg'
    };
    this.cadastra(item).subscribe((resp) => {
      console.log(resp);

      // emite evento para atualizar listagem
      this.event.emit();
    });
  }


}
