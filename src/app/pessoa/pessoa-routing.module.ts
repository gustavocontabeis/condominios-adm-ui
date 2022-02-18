import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaAddComponent } from './pessoa-add/pessoa-add.component';

const routes: Routes = [
  { path: 'pessoa-add', component: PessoaAddComponent },
  { path: 'pessoa-add/:id', component: PessoaAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoaRoutingModule { }
