import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoradorAddComponent } from './morador-add/morador-add.component';
import { MoradorListComponent } from './morador-list/morador-list.component';

const routes: Routes = [
  { path: ':id', component: MoradorListComponent },
  { path: 'morador-add', component: MoradorAddComponent },
  { path: 'morador-add/:id', component: MoradorAddComponent },
  { path: 'morador-list', component: MoradorListComponent },
  { path: 'pessoa/:id_pessoa', component: MoradorListComponent },
  { path: 'apartamento/:id_apartamento', component: MoradorListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoradorRoutingModule { }
