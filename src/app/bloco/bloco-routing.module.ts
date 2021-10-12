import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlocoAddComponent } from './bloco-add/bloco-add.component';
import { BlocoListComponent } from './bloco-list/bloco-list.component';

const routes: Routes = [
  { path: 'bloco-add', component: BlocoAddComponent },
  { path: 'bloco-add/:id', component: BlocoAddComponent },
  { path: 'bloco-list', component: BlocoListComponent },
  { path: 'condominio/:id_condominio', component: BlocoListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlocoRoutingModule { }
