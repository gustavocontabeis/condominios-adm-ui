import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BancoAddComponent } from './banco-add/banco-add.component';
import { BancoFilterComponent } from './banco-filter/banco-filter.component';
import { BancoListComponent } from './banco-list/banco-list.component';

const routes: Routes = [
  { path: 'banco-add', component: BancoAddComponent },
  { path: 'banco-add/:id', component: BancoAddComponent },
  { path: 'banco-filter', component: BancoFilterComponent },
  { path: 'banco-list', component: BancoListComponent },
  { path: 'condominio/:id_condominio', component: BancoListComponent },
  { path: ':id', component: BancoListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BancoRoutingModule { }
