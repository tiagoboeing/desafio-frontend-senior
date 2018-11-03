import { Component, OnInit, Input } from '@angular/core';
import { Item } from './item.model';
import { ItemService } from './item.service';

@Component({
  selector: '[item]',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  dados: Item[];
  @Input('item') item: Item;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    // this.dados = JSON.parse(localStorage.getItem('itens'));
    // this.itemService.lista.subscribe(resp => {
    //   this.dados = resp;
    // });
  }

  // excluir(item: Item) {
  //   if (window.confirm('Deseja mesmo excluir')) {
  //     // descobrimos a posição no array
  //     const index = this.dados.findIndex(x => x.id === item.id);

  //     // excluímos do array
  //     this.dados.splice(index, 1);
  //     this.itemService.guardaArray(this.dados);

  //     // invalida dados
  //     this.dados = [];
  //   }
  // }





  // forma alternativa ao pipe number e *ngIf
  // não está sendo utilizada, apenas exemplo
  // de como formatar o valor durante exibição e não no form
  // {{unidade(item.quantidade, item.unidadeMedida)}}
  unidade(quantidade: number, medida: string) {
    switch (medida) {

      case 'Quilograma':
        return quantidade.toPrecision(4) + ' kg';
        break;

      case 'Litro':
        return quantidade.toPrecision(4) + ' lt';
        break;

      case 'Unidade':
        return quantidade.toPrecision(5) + ' un';
        break;

      default:
        return 'Não informada';
    }
  }

}
