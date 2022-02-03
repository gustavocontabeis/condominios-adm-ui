import { Router, ActivatedRoute } from '@angular/router';
import { BoletoService } from '../boleto.service';
import { Component, OnInit } from '@angular/core';
import { Boleto } from '../boleto';
import { MessageService, ConfirmationService, SelectItem, LazyLoadEvent } from 'primeng/api';
import { Item } from 'src/app/models/dto/item';
import { Faturamento } from 'src/app/faturamento/faturamento';
import { Apartamento } from 'src/app/apartamento/apartamento';
import { Pessoa } from 'src/app/pessoa/pessoa';

@Component({
  selector: 'app-boleto-list',
  templateUrl: './boleto-list.component.html',
  styleUrls: ['./boleto-list.component.css']
})
export class BoletoListComponent implements OnInit {

  boletos!: Boleto[];
  boleto!: Boleto;
  totalRecords: number = 0;
  filters: Item[] = [];

//[declaracoes]

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private boletoService: BoletoService) { }

  ngOnInit() {
    this.boleto = new Boleto();
	  this.boleto.faturamento = new Faturamento();
    this.boleto.apartamento = new Apartamento();
    this.boleto.titular = new Pessoa();
	
//[buscarFK]
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        const id = params.id ? Number(params.id) : null;
        this.boleto.id = Number(id);
      }
      if (params.id_apartamento) {
        const idApartamento = params.id_apartamento ? Number(params.id_apartamento) : null;
        this.boleto.apartamento.id = Number(idApartamento);
      }
      if (params.id_faturamento) {
        const idFaturamento = params.id_faturamento ? Number(params.id_faturamento) : null;
        this.boleto.faturamento.id = Number(idFaturamento);
      }
      if (params.id_titular) {
        const idTitular = params.id_titular ? Number(params.id_titular) : null;
        this.boleto.titular.id = Number(idTitular);
      }
    });
  }

  buscarBoletoPorApartamento(idApartamento: number) {
    this.boletoService.buscarPorApartamento(idApartamento).subscribe(resposta => {
      this.boletos = resposta as Boleto[];
    }, error => {
      console.log(error);
      alert('erro Apartamento.' + error);
    });
  }

  buscarBoletoPorFaturamento(idFaturamento: number) {
    this.boletoService.buscarPorFaturamento(idFaturamento).subscribe(resposta => {
      this.boletos = resposta as Boleto[];
    }, error => {
      console.log(error);
      alert('erro Faturamento.' + error);
    });
  }

  buscarBoletoPorTitular(idTitular: number) {
    this.boletoService.buscarPorTitular(idTitular).subscribe(resposta => {
      this.boletos = resposta as Boleto[];
    }, error => {
      console.log(error);
      alert('erro Titular.' + error);
    });
  }


  consultarPaginado(event: LazyLoadEvent) {
    this.filters = this.formatFilters( event );
    if(this.boleto.apartamento.id){
      let it = new Item();
      it.field = 'apartamento.id';
      it.matchMode = 'equals';
      it.value = this.boleto.apartamento.id+"";
      this.filters.push(it);
    }
    if(this.boleto.faturamento.id){
      let it = new Item();
      it.field = 'faturamento.id';
      it.matchMode = 'equals';
      it.value = this.boleto.faturamento.id+"";
      this.filters.push(it);
    }
    if(this.boleto.titular.id){
      let it = new Item();
      it.field = 'titular.id';
      it.matchMode = 'equals';
      it.value = this.boleto.titular.id+"";
      this.filters.push(it);
    }

    event.globalFilter = this.filters;
    this.boletoService.consultarPaginado(event).subscribe((resposta: any) => {
      this.boletos = resposta.content as Boleto[];
      this.totalRecords = resposta.totalElements;
    }, (error : any) => {
      console.log(error);
      alert('erro condominios.' + error);
    });
  }
  
  formatFilters( event: LazyLoadEvent ): Item[] {
    const filterStrings: string[] = [];
    const itens: Item[] = [];
    for ( let prop in event.filters ) {
      let filterField: string = prop;
      let filterMeta = event.filters[filterField];
      if (Array.isArray(filterMeta)) {
        for (let meta of filterMeta) {
          if( meta.value !== null ) {
            const field: string = this.displayTitle( filterField );
            filterStrings.push( `${field} (${meta.matchMode}) ${meta.value}` );
            let it = new Item();
            it.field = field;
            it.matchMode = meta.matchMode;
            it.value = meta.value;
            itens.push(it);
          }
        }
      }
    }
    return itens;
  }
  /*
  */
  displayTitle( s: string ) {
    return s.replace(/(^|[_-])([a-z])/g, (a, b, c) => c.toUpperCase())
      .replace(/([a-z])([A-Z])/g, (a, b, c) => `${b} ${c}`
  ) }
  

  consultar() {
    this.boletoService.consultar().subscribe((resposta: Boleto[]) => {
      this.boletos = resposta as Boleto[];
    }, (error: string) => {
      console.log(error);
      alert('erro boletos.' + error);
    });
  }

  onSubmit(boletoForm: any) {

  }

  toPay(id: number){
    this.boletoService.toPay(id).subscribe((resposta: any) => {
      this.boletos = resposta as Boleto[];
      this.messageService.add({severity: 'success', summary: 'Boleto pago', detail: 'Boleto pago com sucesso.'});
      //this.consultarPaginado({filters:{}});
    }, (error: string) => {
      console.log(error);
      alert('erro boletos.' + error);
    });
  }

}

