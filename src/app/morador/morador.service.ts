import { Morador } from './morador';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { LazyLoadEvent } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MoradorService {

  apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl + '/moradores';
  }

  adicionar(morador: Morador): any {
    console.log('adicionar', morador);
    return this.httpClient.post(this.apiUrl, morador);
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

  excluir(morador: Morador): any {
    console.log('excluir', morador);
    return this.httpClient.delete(this.apiUrl + '/' + morador.id);
  }

  buscarPorPessoa(idPessoa: number) {
    console.log('buscar por idPessoa', idPessoa);
    return this.httpClient.get(this.apiUrl + '/pessoa/' + idPessoa);
  }

  buscarPorApartamento(idApartamento: number) {
    console.log('buscar por idApartamento', idApartamento);
    return this.httpClient.get(this.apiUrl + '/apartamento/' + idApartamento);
  }

}

