import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { LazyLoadEvent } from 'primeng/api';
import { BancoLancamento } from './banco-lancamento';

@Injectable({
  providedIn: 'root'
})
export class BancoLancamentoService {

  apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl + '/banco-lancamentos';
  }

  adicionar(bancoLancamento: BancoLancamento): any {
    console.log('adicionar', bancoLancamento);
    return this.httpClient.post(this.apiUrl, bancoLancamento);
  }

  buscar(id: number): any {
    console.log('buscar', this.apiUrl);
    return this.httpClient.get(this.apiUrl + '/' + id);
  }
  
  consultar(): any {
    console.log('consultar', this.apiUrl);
    return this.httpClient.get(this.apiUrl);
  }

  consultarPaginado(event: LazyLoadEvent): Observable<Object> {
    console.log('consultarPaginado-service', event.first, event.rows);
    return this.httpClient.post(this.apiUrl + '/page', event);
  }

  excluir(bancoLancamento: BancoLancamento): any {
    console.log('excluir', bancoLancamento);
    return this.httpClient.delete(this.apiUrl + '/' + bancoLancamento.id);
  }

  buscarPorBanco(idBanco: number) {
    console.log('buscar por idBanco', idBanco);
    return this.httpClient.get(this.apiUrl + '/banco/' + idBanco);
  }

  buscarPorCentroDeCusto(idCentroDeCusto: number) {
    console.log('buscar por idCentroDeCusto', idCentroDeCusto);
    return this.httpClient.get(this.apiUrl + '/centroDeCusto/' + idCentroDeCusto);
  }

}

