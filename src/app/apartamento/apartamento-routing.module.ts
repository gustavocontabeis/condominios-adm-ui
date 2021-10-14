import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApartamentoAddComponent } from './apartamento-add/apartamento-add.component';
import { ApartamentoListComponent } from './apartamento-list/apartamento-list.component';

const routes: Routes = [
  { path: ':id', component: ApartamentoListComponent },
  { path: 'apartamento-add', component: ApartamentoAddComponent },
  { path: 'apartamento-add/:id', component: ApartamentoAddComponent },
  { path: 'apartamento-list', component: ApartamentoListComponent },
  { path: 'bloco/:id_bloco', component: ApartamentoListComponent },
  { path: 'proprietario/:id_proprietario', component: ApartamentoListComponent },
  { path: 'titular/:id_titular', component: ApartamentoListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartamentoRoutingModule { }
