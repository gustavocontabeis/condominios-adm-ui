import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SindicoAddComponent } from './sindico-add/sindico-add.component';
import { SindicoListComponent } from './sindico-list/sindico-list.component';

const routes: Routes = [
  { path: 'sindico-add', component: SindicoAddComponent },
  { path: 'sindico-add/:id', component: SindicoAddComponent },
  { path: 'sindico-list', component: SindicoListComponent },
  { path: 'pessoa/:id_pessoa', component: SindicoListComponent },
  { path: ':id', component: SindicoListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SindicoRoutingModule { }
