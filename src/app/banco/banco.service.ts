import { Banco } from './banco';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { LazyLoadEvent } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl + '/bancos';
  }

  adicionar(banco: Banco): any {
    console.log('adicionar', banco);
    return this.httpClient.post(this.apiUrl, banco);
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

  excluir(banco: Banco): any {
    console.log('excluir', banco);
    return this.httpClient.delete(this.apiUrl + '/' + banco.id);
  }

  buscarPorCondominio(idCondominio: number) {
    console.log('buscar por idCondominio', idCondominio);
    return this.httpClient.get(this.apiUrl + '/condominio/' + idCondominio);
  }

}

