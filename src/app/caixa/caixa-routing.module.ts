import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaixaAddComponent } from './caixa-add/caixa-add.component';
import { CaixaFilterComponent } from './caixa-filter/caixa-filter.component';
import { CaixaListComponent } from './caixa-list/caixa-list.component';

const routes: Routes = [
  { path: 'caixa-add', component: CaixaAddComponent },
  { path: 'caixa-add/:id', component: CaixaAddComponent },
  { path: 'caixa-add/condominio/:id_condominio', component: CaixaAddComponent },
  { path: 'caixa-filter', component: CaixaFilterComponent },
  { path: 'caixa-list', component: CaixaListComponent },
  { path: 'condominio/:id_condominio', component: CaixaListComponent },
  { path: 'pessoa/:id_pessoa', component: CaixaListComponent },
  { path: 'centroDeCusto/:id_centroDeCusto', component: CaixaListComponent },
  { path: ':id', component: CaixaListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaixaRoutingModule { }
