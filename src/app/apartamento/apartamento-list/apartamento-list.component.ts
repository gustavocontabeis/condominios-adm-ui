import { Router, ActivatedRoute } from '@angular/router';
import { ApartamentoService } from '../apartamento.service';
import { Component, OnInit } from '@angular/core';
import { Apartamento } from '../apartamento';
import { MessageService, ConfirmationService, SelectItem, LazyLoadEvent } from 'primeng/api';
import { Item } from 'src/app/models/dto/item';
import { Bloco } from 'src/app/bloco/bloco';

@Component({
  selector: 'app-apartamento-list',
  templateUrl: './apartamento-list.component.html',
  styleUrls: ['./apartamento-list.component.css']
})
export class ApartamentoListComponent implements OnInit {

  apartamentos!: Apartamento[];
  apartamento!: Apartamento;
  totalRecords: number = 0;
  filters: Item[] = [];

//[declaracoes]

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private apartamentoService: ApartamentoService) { }

  ngOnInit() {
    this.apartamento = new Apartamento();
	  this.apartamento.bloco = new Bloco();
	  this.apartamento.proprietario = {};
	  this.apartamento.titular = {};
	
//[buscarFK]
    this.activatedRoute.params.subscribe(params => {
      if (params.id_bloco) {
        console.log('xxxxxxxxxxxxxxxxxxxxxx');
        const idbloco = params.id_bloco ? Number(params.id_bloco) : null;
        this.apartamento.bloco.id = Number(idbloco);
      }
      if (params.id_proprietario) {
        const idproprietario = params.id_proprietario ? Number(params.id_proprietario) : null;
        //this.apartamento.pessoa.id = idSindico; COLOQUE AQUI A LÓGICA
      }
      if (params.id_titular) {
        const idtitular = params.id_titular ? Number(params.id_titular) : null;
        //this.apartamento.pessoa.id = idSindico; COLOQUE AQUI A LÓGICA
      }
    });

  }


  buscarApartamentoPorBloco(idBloco: number) {
    this.apartamentoService.buscarPorBloco(idBloco).subscribe(resposta => {
      this.apartamentos = resposta as Apartamento[];
    }, error => {
      console.log(error);
      alert('erro Bloco.' + error);
    });
  }

  buscarApartamentoPorProprietario(idProprietario: number) {
    this.apartamentoService.buscarPorProprietario(idProprietario).subscribe(resposta => {
      this.apartamentos = resposta as Apartamento[];
    }, error => {
      console.log(error);
      alert('erro Proprietario.' + error);
    });
  }

  buscarApartamentoPorTitular(idTitular: number) {
    this.apartamentoService.buscarPorTitular(idTitular).subscribe(resposta => {
      this.apartamentos = resposta as Apartamento[];
    }, error => {
      console.log(error);
      alert('erro Titular.' + error);
    });
  }


  consultarPaginado(event: LazyLoadEvent) {
    console.log(event);
    this.filters = this.formatFilters( event );
    if(this.apartamento.bloco.id){
      let it = new Item();
      it.field = 'bloco.id';
      it.matchMode = 'equals';
      it.value = this.apartamento.bloco.id+"";
      this.filters.push(it);
    }
    if(this.apartamento.proprietario.id){
      let it = new Item();
      it.field = 'proprietario.id';
      it.matchMode = 'equals';
      it.value = this.apartamento.proprietario.id;
      this.filters.push(it);
    }
    if(this.apartamento.titular.id){
      let it = new Item();
      it.field = 'titular.id';
      it.matchMode = 'equals';
      it.value = this.apartamento.titular.id;
      this.filters.push(it);
    }

    event.globalFilter = this.filters;
    console.log(this.filters);
    this.apartamentoService.consultarPaginado(event).subscribe((resposta: any) => {
      console.log(resposta);
      this.apartamentos = resposta.content as Apartamento[];
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
    console.warn( filterStrings );
    return itens;
  }
  /*
  */
  displayTitle( s: string ) {
    return s.replace(/(^|[_-])([a-z])/g, (a, b, c) => c.toUpperCase())
      .replace(/([a-z])([A-Z])/g, (a, b, c) => `${b} ${c}`
  ) }
  

  consultar() {
    this.apartamentoService.consultar().subscribe((resposta: Apartamento[]) => {
      this.apartamentos = resposta as Apartamento[];
    }, (error: string) => {
      console.log(error);
      alert('erro apartamentos.' + error);
    });
  }

  onSubmit(apartamentoForm: any) {

  }

}

