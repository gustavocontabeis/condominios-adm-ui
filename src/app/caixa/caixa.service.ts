import { Caixa } from './caixa';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { LazyLoadEvent } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CaixaService {

  apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl + '/caixas';
  }

  adicionar(caixa: Caixa): any {
    console.log('adicionar', caixa);
    return this.httpClient.post(this.apiUrl, caixa);
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

  excluir(caixa: Caixa): any {
    console.log('excluir', caixa);
    return this.httpClient.delete(this.apiUrl + '/' + caixa.id);
  }

  buscarPorCondominio(idCondominio: number) {
    console.log('buscar por idCondominio', idCondominio);
    return this.httpClient.get(this.apiUrl + '/condominio/' + idCondominio);
  }

  buscarPorPessoa(idPessoa: number) {
    console.log('buscar por idPessoa', idPessoa);
    return this.httpClient.get(this.apiUrl + '/pessoa/' + idPessoa);
  }

  buscarPorCentroDeCusto(idCentroDeCusto: number) {
    console.log('buscar por idCentroDeCusto', idCentroDeCusto);
    return this.httpClient.get(this.apiUrl + '/centroDeCusto/' + idCentroDeCusto);
  }

  ultimo(idCondominio: number) {
    console.log('buscar iltimo', idCondominio);
    return this.httpClient.get(this.apiUrl + '/last/' + idCondominio);
  }
}

