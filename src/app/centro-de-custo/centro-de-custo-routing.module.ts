import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CentroDeCustoAddComponent } from './centro-de-custo-add/centro-de-custo-add.component';
import { CentroDeCustoListComponent } from './centro-de-custo-list/centro-de-custo-list.component';

const routes: Routes = [
  { path: 'centro-de-custo-add', component: CentroDeCustoAddComponent },
  { path: 'centro-de-custo-add/:id', component: CentroDeCustoAddComponent },
  { path: 'centro-de-custo-list', component: CentroDeCustoListComponent },
  { path: ':id', component: CentroDeCustoListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentroDeCustoRoutingModule { }
