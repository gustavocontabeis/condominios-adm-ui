import { Faturamento } from './faturamento';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { LazyLoadEvent } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class FaturamentoService {

  apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl + '/faturamentos';
  }

  adicionar(faturamento: Faturamento): any {
    console.log('adicionar', faturamento);
    return this.httpClient.post(this.apiUrl, faturamento);
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

  excluir(faturamento: Faturamento): any {
    console.log('excluir', faturamento);
    return this.httpClient.delete(this.apiUrl + '/' + faturamento.id);
  }

  buscarPorCondominio(idCondominio: number) {
    console.log('buscar por idCondominio', idCondominio);
    return this.httpClient.get(this.apiUrl + '/condominio/' + idCondominio);
  }

}

