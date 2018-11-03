import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { Item } from '../listagem/item/item.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(private router: Router) { }

  dados: Item[];
  itemForm: FormGroup;
  // moeda: `([0-9]{1,3}\.)?[0-9]{1,3},[0-9]{2}$`;
  perecivel = false;

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
      nome: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      unidadeMedida: new FormControl('Unidade', [Validators.required]),
      quantidade: new FormControl(''),
      preco: new FormControl('', [Validators.required]),
      perecivel: new FormControl(this.perecivel, [Validators.required]),
      validade: new FormControl(''),
      fabricacao: new FormControl('', [Validators.required])
    });


    // subscribe no checkbox perecivel
    this.itemForm.root.get('perecivel').valueChanges.subscribe(res => {
      this.perecivel = res;
    });
  }

  // referência do formControl
  get input() { return this.itemForm.controls; }

  salvar(item: Item) {
    // pegamos tudo o que há no localStorage e guardamos na variável dados
    this.dados = JSON.parse(localStorage.getItem('itens'));
    // limpamos o localStorage
    localStorage.removeItem('itens');
    // jogamos o novo item para o localStorage
    this.dados.push(item);
    // guardamos o que havia no localStorage + novo item
    localStorage.setItem('itens', JSON.stringify(this.dados));

    // invalidamos os dados (cache) - stateless
    this.dados = [];

    // devolvemos para página de listagem
    this.router.navigate(['/listagem']);
  }

  // poderíamos utilizar de um guard.ts
  cancelar() {
    if (window.confirm('Ao clicar em cancelar você perderá os dados do formulário caso não tenham sido salvos')) {
      this.router.navigate(['/listagem']);
    }
  }

  // se data validade informada < dataHoje = produto vencido
  checaValidade(control: AbstractControl): { [key: string]: boolean } | null {
    const today = new Date();
    const dd = ('0' + today.getDate()).slice(-2);
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    const dataHoje = yyyy + '-' + mm + '-' + dd;

    if (control.value !== undefined && control.value < dataHoje) {
      return { 'validade': true };
    }
    return null;
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
    if (this.itemForm.get('unidadeMedida').value === 'Unidade') {
      return this.unidadeMask;
    } else if (this.itemForm.get('unidadeMedida').value === 'Litro') {
      return this.litroMask;
    } else if (this.itemForm.get('unidadeMedida').value === 'Quilograma') {
      return this.quiloMask;
    } else {
      return this.unidadeMask;
    }
  }

}
