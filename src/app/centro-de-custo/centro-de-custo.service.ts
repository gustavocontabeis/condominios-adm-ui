import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { LazyLoadEvent } from 'primeng/api';
import { CentroDeCusto } from './centro-de-custo';

@Injectable({
  providedIn: 'root'
})
export class CentroDeCustoService {

  apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl + '/centro-de-custos';
  }

  adicionar(centroDeCusto: CentroDeCusto): any {
    console.log('adicionar', centroDeCusto);
    return this.httpClient.post(this.apiUrl, centroDeCusto);
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

  excluir(centroDeCusto: CentroDeCusto): any {
    console.log('excluir', centroDeCusto);
    return this.httpClient.delete(this.apiUrl + '/' + centroDeCusto.id);
  }

}

