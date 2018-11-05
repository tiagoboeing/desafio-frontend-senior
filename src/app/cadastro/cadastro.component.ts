import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { Item } from '../listagem/item/item.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from '../listagem/item/item.service';
import { NotificationService } from '../shared/messages/notification.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(private itemService: ItemService,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  dados: Item[];
  itemForm: FormGroup;
  // moeda: `([0-9]{1,3}\.)?[0-9]{1,3},[0-9]{2}$`;

  perecivel = false;
  editar = false;
  id: number = null;

  nomePattern = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ -]+$/;

  unidadeMask = createNumberMask({
    prefix: '',
    suffix: ' un',
    allowDecimal: false,
    decimalSymbol: ',',
    thousandsSeparatorSymbol: '.',
    requireDecimal: false
  });

  litroMask = createNumberMask({
    prefix: '',
    suffix: ' lt',
    allowDecimal: true,
    decimalSymbol: ',',
    thousandsSeparatorSymbol: '.',
    requireDecimal: false,
    decimalLimit: 3
  });

  quiloMask = createNumberMask({
    prefix: '',
    suffix: ' kg',
    allowDecimal: true,
    decimalSymbol: ',',
    thousandsSeparatorSymbol: '.',
    requireDecimal: false,
    decimalLimit: 3
  });


  ngOnInit() {

    this.itemForm = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(this.nomePattern)]),
      unidadeMedida: new FormControl('Unidade', [Validators.required]),
      quantidade: new FormControl(''),
      preco: new FormControl('', [Validators.required, Validators.min(0.01)]),
      perecivel: new FormControl(this.perecivel, [Validators.required]),
      dataValidade: new FormControl('', [this.checaValidade]),
      dataFabricacao: new FormControl('', [Validators.required, this.checaFabricacao])
    });

    // subscribe no checkbox perecivel
    this.itemForm.root.get('perecivel').valueChanges.subscribe(res => {
      this.perecivel = res;
    });

    // obtemos o item a ser editado
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.editar = true;
        this.id = params.id;

        return this.itemService.itemByID(params.id).subscribe(res => {
          // setamos valores no form
          this.itemForm.setValue(res);
        });
      }
    });
  }

  // referência do formControl
  get input() { return this.itemForm.controls; }

  salvar(item: Item) {
    // definimos o que requisitar: PUT ou POST
    if (this.editar) {
      return this.itemService.atualizar(item)
        .subscribe(() => {
          // emitimos uma mensagem para snackbar
          this.notificationService.notify(`warning`, `O item com ID #${item.id} foi atualizado corretamente!`);

          // encaminha para lista novamente
          this.router.navigate(['/listagem']);
        });
    } else {
      return this.itemService.cadastra(item)
        .subscribe(() => {
          // emitimos uma mensagem para snackbar
          this.notificationService.notify(`success`, `Item cadastrado com sucesso!`);

          this.router.navigate(['/listagem']);
        });
    }
  }

  // se data validade informada < dataHoje = produto vencido
  checaValidade(control: AbstractControl): { [key: string]: boolean } | null {
    let valido = true;
    let perecivel = true;

    const today = new Date();
    const dd = ('0' + today.getDate()).slice(-2);
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    const dataHoje = yyyy + '-' + mm + '-' + dd;

    // analisamos o campo perecivel
    const group = control.parent;
    if (group && group.controls['perecivel'].value) { perecivel = true; } else { perecivel = false; }

    // caso atualize a validade, comparamos novamente: fabricacao > validade?
    if (group && group.controls['dataFabricacao'].value) {
      if (group.controls['dataFabricacao'].value < control.value) {
        control.parent.controls['dataFabricacao'].setErrors(null);
      } else if (group.controls['dataFabricacao'].value === control.value) {
        control.parent.controls['dataFabricacao'].setErrors(null);
      } else {
        console.log(control.parent.controls['dataFabricacao'].setErrors({ 'superior': true }));
      }
    }

    // verificamos se é válido
    if (control.value !== undefined && control.value < dataHoje) { valido = false; } else { valido = true; }

    // personalizamos erros
    if (perecivel && valido) {
      return null;
    } else if (valido && !perecivel) {
      return null;
    } else if (!valido && perecivel) {
      return { 'validade': true };
    } else if (!valido && !perecivel) {
      if (control.value === '') { return null; } else { return { 'validade': true }; }
    }
  }

  // se data de fabricação > validade = não permitido
  checaFabricacao(control: AbstractControl): { [key: string]: boolean } | null {
    const group = control.parent;

    if ((control.value !== undefined && control.value) > (group && group.controls['dataValidade'].value)) {
      if (!group.controls['dataValidade'].value) { return null; } else { return { 'superior': true }; }
    } else {
      return null;
    }
  }

  // condição de obrigatoriedade
  checaPerecivel() {
    if (this.perecivel) {
      return true;
    } else {
      return false;
    }
  }

  // mask muda de acordo com select da unidade
  useMask() {
    switch (this.itemForm.get('unidadeMedida').value) {
      case 'Unidade':
        return this.unidadeMask;

      case 'Litro':
        return this.litroMask;

      case 'Quilograma':
        return this.quiloMask;

      default:
        return this.unidadeMask;
    }
  }

  // poderíamos utilizar um guard.ts ou ngOnDestroy()
  cancelar() {
    if (window.confirm('Ao clicar em cancelar você perderá os dados do formulário caso não tenham sido salvos')) {
      this.router.navigate(['/listagem']);
    }
  }

}
