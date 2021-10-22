import { Sindico } from './sindico';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { LazyLoadEvent } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class SindicoService {

  apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl + '/sindicos';
  }

  adicionar(sindico: Sindico): any {
    console.log('adicionar', sindico);
    return this.httpClient.post(this.apiUrl, sindico);
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

  excluir(sindico: Sindico): any {
    console.log('excluir', sindico);
    return this.httpClient.delete(this.apiUrl + '/' + sindico.id);
  }

  buscarPorPessoa(idPessoa: number) {
    console.log('buscar por idPessoa', idPessoa);
    return this.httpClient.get(this.apiUrl + '/pessoa/' + idPessoa);
  }

}

