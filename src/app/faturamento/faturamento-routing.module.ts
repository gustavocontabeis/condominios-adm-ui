import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaturamentoAddComponent } from './faturamento-add/faturamento-add.component';
import { FaturamentoListComponent } from './faturamento-list/faturamento-list.component';

const routes: Routes = [
  { path: 'faturamento-add', component: FaturamentoAddComponent },
  { path: 'faturamento-add/:id', component: FaturamentoAddComponent },
  { path: 'faturamento-list', component: FaturamentoListComponent },
  { path: 'condominio/:id_condominio', component: FaturamentoListComponent },
  { path: ':id', component: FaturamentoListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaturamentoRoutingModule { }
