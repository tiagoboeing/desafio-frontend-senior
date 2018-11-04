import { Injectable, Output, EventEmitter } from '@angular/core';
import { Item } from './item.model';

@Injectable()
export class ItemService {

  // apenas para manipulação no serviço
  dados: Item[];

  cache: any;

  // emissão de eventos
  @Output() eventos = new EventEmitter<Item[]>();

  // lista observável
  // listagem: Observable<any[]> = new Observable((observer => {
  //   observer.next(JSON.parse(localStorage.getItem('itens')));
  // }));

  getStorage() {
      this.cache = JSON.parse(localStorage.getItem('itens'));
  }

  // carrega dados fictícios para localStorage
  cargaDados() {
    this.dados = [];
    this.dados.push({
      id: 1541223639453,
      nome: 'Soja 20kg',
      preco: 2.8,
      perecivel: true,
      dataValidade: new Date(),
      dataFabricacao: new Date(),
      unidadeMedida: 'Quilograma',
      quantidade: '20 un'
    });
    this.dados.push({
      id: 1541223690478,
      nome: 'Coca-Cola 2,5 lt',
      preco: 5.47,
      perecivel: true,
      dataValidade: new Date('2018-06-21'),
      dataFabricacao: new Date('2018-11-10'),
      unidadeMedida: 'Litro',
      quantidade: '2.5 lt'
    });
    this.dados.push({
      id: 1541223702636,
      nome: 'Produto nunca vence',
      preco: 87.3,
      perecivel: false,
      dataValidade: null,
      dataFabricacao: new Date('2017-12-10'),
      unidadeMedida: 'Unidade',
      quantidade: '53 un'
    });
    this.dados.push({
      id: 1541223719061,
      nome: 'Produto 3 casas decimais',
      preco: 1.99,
      perecivel: false,
      dataValidade: null,
      dataFabricacao: new Date('2018-08-01'),
      unidadeMedida: 'Quilograma',
      quantidade: '1.998 kg'
    });

    // guardamos os novos dados no localStorage
    localStorage.setItem('itens', JSON.stringify(this.dados));

    // emitimos evento informando que houve alteração na lista
    this.eventos.emit(this.dados);
  }


}
