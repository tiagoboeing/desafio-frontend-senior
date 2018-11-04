import { Component, OnInit, Input } from '@angular/core';
import { Item } from './item.model';
import { ItemService } from './item.service';
import { NotificationService } from 'src/app/shared/messages/notification.service';

@Component({
  selector: '[item]',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  dados: Item[];
  @Input('item') item: Item;

  constructor(private itemService: ItemService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    // this.dados = JSON.parse(localStorage.getItem('itens'));
    // this.itemService.lista.subscribe(resp => {
    //   this.dados = resp;
    // });
  }

  excluir(item: Item) {
    if (window.confirm('Deseja mesmo excluir')) {
      this.itemService.excluir(item)
        .subscribe(resp => {
          // emitimos um evento para atualizar lista
          this.itemService.event.emit();

          // emitimos uma mensagem para snackbar
          this.notificationService.notify(`danger`, `O item de ID #${item.id} foi excluído corretamente!`);
        });
    }
  }


}
