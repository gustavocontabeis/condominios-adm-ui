import { Boleto } from './boleto';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { LazyLoadEvent } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class BoletoService {

  apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl + '/boletos';
  }

  adicionar(boleto: Boleto): any {
    console.log('adicionar', boleto);
    return this.httpClient.post(this.apiUrl, boleto);
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

  excluir(boleto: Boleto): any {
    console.log('excluir', boleto);
    return this.httpClient.delete(this.apiUrl + '/' + boleto.id);
  }

  buscarPorApartamento(idApartamento: number) {
    console.log('buscar por idApartamento', idApartamento);
    return this.httpClient.get(this.apiUrl + '/apartamento/' + idApartamento);
  }

  buscarPorFaturamento(idFaturamento: number) {
    console.log('buscar por idFaturamento', idFaturamento);
    return this.httpClient.get(this.apiUrl + '/faturamento/' + idFaturamento);
  }

  buscarPorTitular(idTitular: number) {
    console.log('buscar por idTitular', idTitular);
    return this.httpClient.get(this.apiUrl + '/titular/' + idTitular);
  }

  buscarTotaisPorFaturamento(idFaturamento: number) {
    return this.httpClient.get(this.apiUrl + '/totais/faturamento/' + idFaturamento);
  }

  toPay(id: number) {
    return this.httpClient.get(this.apiUrl + '/to-pay/' + id);
  }
}

