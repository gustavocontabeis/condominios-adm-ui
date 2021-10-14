import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoletoAddComponent } from './boleto-add/boleto-add.component';
import { BoletoListComponent } from './boleto-list/boleto-list.component';

const routes: Routes = [
  { path: ':id', component: BoletoListComponent },
  { path: 'boleto-add', component: BoletoAddComponent },
  { path: 'boleto-add/:id', component: BoletoAddComponent },
  { path: 'boleto-list', component: BoletoListComponent },
  { path: 'apartamento/:id_apartamento', component: BoletoListComponent },
  { path: 'faturamento/:id_faturamento', component: BoletoListComponent },
  { path: 'titular/:id_titular', component: BoletoListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoletoRoutingModule { }
