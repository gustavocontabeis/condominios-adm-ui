import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CondominioAddComponent } from './condominio-add/condominio-add.component';
import { CondominioFilterComponent } from './condominio-filter/condominio-filter.component';
import { CondominioListComponent } from './condominio-list/condominio-list.component';

const routes: Routes = [
  { path: '', component: CondominioListComponent },
  { path: 'condominio-add', component: CondominioAddComponent },
  { path: 'condominio-add/:id', component: CondominioAddComponent },
  { path: 'condominio-filter', component: CondominioFilterComponent },
  { path: 'condominio-list', component: CondominioListComponent },
  { path: 'sindico/:id_sindico', component: CondominioListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CondominioRoutingModule { }
