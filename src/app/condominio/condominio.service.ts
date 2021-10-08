import { Condominio } from './condominio';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Data } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CondominioService {

  apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl + '/condominios';
  }

  adicionar(condominio: Condominio): any {
    console.log('adicionar', condominio);
    return this.httpClient.post(this.apiUrl, condominio);
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

  excluir(condominio: Condominio): any {
    console.log('excluir', condominio);
    return this.httpClient.delete(this.apiUrl + '/' + condominio.id);
  }

  buscarPorSindico(idSindico: number) {
    console.log('buscar por idSindico', idSindico);
    return this.httpClient.get(this.apiUrl + '/sindico/' + idSindico);
  }
}

