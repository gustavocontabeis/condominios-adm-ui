import { Apartamento } from './apartamento';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { LazyLoadEvent } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ApartamentoService {

  apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl + '/apartamentos';
  }

  adicionar(apartamento: Apartamento): any {
    console.log('adicionar', apartamento);
    return this.httpClient.post(this.apiUrl, apartamento);
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

  excluir(apartamento: Apartamento): any {
    console.log('excluir', apartamento);
    return this.httpClient.delete(this.apiUrl + '/' + apartamento.id);
  }

  buscarPorBloco(idBloco: number) {
    console.log('buscar por idBloco', idBloco);
    return this.httpClient.get(this.apiUrl + '/bloco/' + idBloco);
  }

  buscarPorProprietario(idProprietario: number) {
    console.log('buscar por idProprietario', idProprietario);
    return this.httpClient.get(this.apiUrl + '/proprietario/' + idProprietario);
  }

  buscarPorTitular(idTitular: number) {
    console.log('buscar por idTitular', idTitular);
    return this.httpClient.get(this.apiUrl + '/titular/' + idTitular);
  }

}

