import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'condominios-adm-ui';
  items!: MenuItem[];

  ngOnInit() {
    this.items = [
      {label: 'Condominio', icon: 'pi pi-fw pi-list', items: [
         {label: 'Listar Condominio', routerLink: 'condominio/condominio-list' , icon: 'pi pi-fw pi-list'},
         {label: 'Cadastrar Condominio', routerLink: 'condominio/condominio-add' , icon: 'pi pi-fw pi-plus'},
      ]},
      {label: 'Pessoa', icon: 'pi pi-fw pi-list', items: [
         {label: 'Listar Pessoa', routerLink: 'pessoa/pessoa-list' , icon: 'pi pi-fw pi-list'},
         {label: 'Cadastrar Pessoa', routerLink: 'pessoa/pessoa-add' , icon: 'pi pi-fw pi-plus'},
      ]},
      {label: 'Sindico', icon: 'pi pi-fw pi-list', items: [
         {label: 'Listar Sindico', routerLink: 'sindico/sindico-list' , icon: 'pi pi-fw pi-list'},
         {label: 'Cadastrar Sindico', routerLink: 'sindico/sindico-add' , icon: 'pi pi-fw pi-plus'},
      ]},
      {label: 'Bloco', icon: 'pi pi-fw pi-list', items: [
         {label: 'Listar Bloco', routerLink: 'bloco/bloco-list' , icon: 'pi pi-fw pi-list'},
         {label: 'Cadastrar Bloco', routerLink: 'bloco/bloco-add' , icon: 'pi pi-fw pi-plus'},
      ]},
      {label: 'Apartamento', icon: 'pi pi-fw pi-list', items: [
         {label: 'Listar Apartamento', routerLink: 'apartamento/apartamento-list' , icon: 'pi pi-fw pi-list'},
         {label: 'Cadastrar Apartamento', routerLink: 'apartamento/apartamento-add' , icon: 'pi pi-fw pi-plus'},
      ]},
      {label: 'Morador', icon: 'pi pi-fw pi-list', items: [
         {label: 'Listar Morador', routerLink: 'morador/morador-list' , icon: 'pi pi-fw pi-list'},
         {label: 'Cadastrar Morador', routerLink: 'morador/morador-add' , icon: 'pi pi-fw pi-plus'},
      ]},
      {label: 'Faturamento', icon: 'pi pi-fw pi-list', items: [
         {label: 'Listar Faturamento', routerLink: 'faturamento/faturamento-list' , icon: 'pi pi-fw pi-list'},
         {label: 'Cadastrar Faturamento', routerLink: 'faturamento/faturamento-add' , icon: 'pi pi-fw pi-plus'},
      ]},
      {label: 'Boleto', icon: 'pi pi-fw pi-list', items: [
         {label: 'Listar Boleto', routerLink: 'boleto/boleto-list' , icon: 'pi pi-fw pi-list'},
         {label: 'Cadastrar Boleto', routerLink: 'boleto/boleto-add' , icon: 'pi pi-fw pi-plus'},
      ]},
      {label: 'CentroDeCusto', icon: 'pi pi-fw pi-list', items: [
         {label: 'Listar CentroDeCusto', routerLink: 'centro-de-custo/centro-de-custo-list' , icon: 'pi pi-fw pi-list'},
         {label: 'Cadastrar CentroDeCusto', routerLink: 'centro-de-custo/centro-de-custo-add' , icon: 'pi pi-fw pi-plus'},
      ]},
      {label: 'Caixa', icon: 'pi pi-fw pi-list', items: [
         {label: 'Listar Caixa', routerLink: 'caixa/caixa-list' , icon: 'pi pi-fw pi-list'},
         {label: 'Cadastrar Caixa', routerLink: 'caixa/caixa-add' , icon: 'pi pi-fw pi-plus'},
      ]},
      {label: 'Banco', icon: 'pi pi-fw pi-list', items: [
         {label: 'Listar Banco', routerLink: 'banco/banco-list' , icon: 'pi pi-fw pi-list'},
         {label: 'Cadastrar Banco', routerLink: 'banco/banco-add' , icon: 'pi pi-fw pi-plus'},
      ]},
      {label: 'BancoLancamento', icon: 'pi pi-fw pi-list', items: [
         {label: 'Listar BancoLancamento', routerLink: 'banco-lancamento/banco-lancamento-list' , icon: 'pi pi-fw pi-list'},
         {label: 'Cadastrar BancoLancamento', routerLink: 'banco-lancamento/banco-lancamento-add' , icon: 'pi pi-fw pi-plus'},
      ]},
      {label: 'Garagem', icon: 'pi pi-fw pi-list', items: [
         {label: 'Listar Garagem', routerLink: 'garagem/garagem-list' , icon: 'pi pi-fw pi-list'},
         {label: 'Cadastrar Garagem', routerLink: 'garagem/garagem-add' , icon: 'pi pi-fw pi-plus'},
      ]},
    ];
  }      
}
