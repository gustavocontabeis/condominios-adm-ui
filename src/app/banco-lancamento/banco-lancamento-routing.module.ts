import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BancoLancamentoAddComponent } from './banco-lancamento-add/banco-lancamento-add.component';
import { BancoLancamentoFilterComponent } from './banco-lancamento-filter/banco-lancamento-filter.component';
import { BancoLancamentoListComponent } from './banco-lancamento-list/banco-lancamento-list.component';

const routes: Routes = [
  { path: 'banco-lancamento-add', component: BancoLancamentoAddComponent },
  { path: 'banco-lancamento-add/:id', component: BancoLancamentoAddComponent },
  { path: 'banco-lancamento-filter', component: BancoLancamentoFilterComponent },
  { path: 'banco-lancamento-list', component: BancoLancamentoListComponent },
  { path: 'banco/:id_banco', component: BancoLancamentoListComponent },
  { path: 'centroDeCusto/:id_centroDeCusto', component: BancoLancamentoListComponent },
  { path: ':id', component: BancoLancamentoListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BancoLancamentoRoutingModule { }
