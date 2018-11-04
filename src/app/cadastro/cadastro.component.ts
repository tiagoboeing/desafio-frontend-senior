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

  dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  datePattern = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

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


  // verifica se fabricacao é inferior ao vencimento informado
  // static checaFabricacao(group: AbstractControl): { [key: string]: boolean } {
  //   const fabricacao = group.get('fabricacao').value;
  //   const validade = group.get('validade').value;

  //   console.log(group.get('perecivel').value);


  //   if (fabricacao > validade) {
  //     group.get('validade').setErrors({ fabricacaoInvalida: false });
  //     // return { fabricacaoInvalida: true };
  //   }

  //   return undefined;
  // }


  ngOnInit() {

    this.itemForm = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(this.nomePattern)]),
      unidadeMedida: new FormControl('Unidade', [Validators.required]),
      quantidade: new FormControl(''),
      preco: new FormControl('', [Validators.required, Validators.min(0.01)]),
      perecivel: new FormControl(this.perecivel, [Validators.required]),
      dataValidade: new FormControl('', [this.checaValidade]),
      dataFabricacao: new FormControl('', [Validators.required])
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
