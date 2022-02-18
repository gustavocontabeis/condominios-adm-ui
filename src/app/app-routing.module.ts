import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'condominio', loadChildren: () => import('./condominio/condominio.module').then(m => m.CondominioModule)},
  { path: 'bloco', loadChildren: () => import('./bloco/bloco.module').then(m => m.BlocoModule)},
  { path: 'apartamento', loadChildren: () => import('./apartamento/apartamento.module').then(m => m.ApartamentoModule)},
  { path: 'sindico', loadChildren: () => import('./sindico/sindico.module').then(m => m.SindicoModule)},
  { path: 'morador', loadChildren: () => import('./morador/morador.module').then(m => m.MoradorModule)},
  { path: 'faturamento', loadChildren: () => import('./faturamento/faturamento.module').then(m => m.FaturamentoModule)},
  { path: 'boleto', loadChildren: () => import('./boleto/boleto.module').then(m => m.BoletoModule)},
  { path: 'centro-de-custo', loadChildren: () => import('./centro-de-custo/centro-de-custo.module').then(m => m.CentroDeCustoModule)},
  { path: 'caixa', loadChildren: () => import('./caixa/caixa.module').then(m => m.CaixaModule)},
  { path: 'banco', loadChildren: () => import('./banco/banco.module').then(m => m.BancoModule)},
  { path: 'banco-lancamento', loadChildren: () => import('./banco-lancamento/banco-lancamento.module').then(m => m.BancoLancamentoModule)},
  { path: 'pessoa', loadChildren: () => import('./pessoa/pessoa.module').then(m => m.PessoaModule)},
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
