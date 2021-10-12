import { Bloco } from './bloco';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { LazyLoadEvent } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class BlocoService {

  apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl + '/blocos';
  }

  adicionar(bloco: Bloco): any {
    console.log('adicionar', bloco);
    return this.httpClient.post(this.apiUrl, bloco);
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

  excluir(bloco: Bloco): any {
    console.log('excluir', bloco);
    return this.httpClient.delete(this.apiUrl + '/' + bloco.id);
  }

  buscarPorCondominio(idCondominio: number) {
    console.log('buscar por idCondominio', idCondominio);
    return this.httpClient.get(this.apiUrl + '/condominio/' + idCondominio);
  }

}