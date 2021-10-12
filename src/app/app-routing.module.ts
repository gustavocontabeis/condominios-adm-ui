import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'condominio', loadChildren: () => import('./condominio/condominio.module').then(m => m.CondominioModule)},
  { path: 'bloco', loadChildren: () => import('./bloco/bloco.module').then(m => m.BlocoModule)},
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
