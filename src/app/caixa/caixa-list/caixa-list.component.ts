import { Router, ActivatedRoute } from '@angular/router';
import { CaixaService } from '../caixa.service';
import { Component, OnInit } from '@angular/core';
import { Caixa } from '../caixa';
import { MessageService, ConfirmationService, SelectItem, LazyLoadEvent } from 'primeng/api';
import { Item } from 'src/app/models/dto/item';
import { Condominio } from 'src/app/condominio/condominio';
import { Pessoa } from 'src/app/pessoa/pessoa';
import { CentroDeCusto } from 'src/app/centro-de-custo/centro-de-custo';

@Component({
  selector: 'app-caixa-list',
  templateUrl: './caixa-list.component.html',
  styleUrls: ['./caixa-list.component.css']
})
export class CaixaListComponent implements OnInit {

  caixas!: Caixa[];
  caixa!: Caixa;
  totalRecords: number = 0;
  filters: Item[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private caixaService: CaixaService) { }

  ngOnInit() {
    this.caixa = new Caixa();
	  this.caixa.condominio = new Condominio();
    this.caixa.pessoa = new Pessoa();
    this.caixa.centroDeCusto = new CentroDeCusto();
	
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        const id = params.id ? Number(params.id) : null;
        this.caixa.id = Number(id);
      }
      if (params.id_condominio) {
        const idCondominio = params.id_condominio ? Number(params.id_condominio) : null;
        this.caixa.condominio.id = Number(idCondominio);
      }
      if (params.id_pessoa) {
        const idPessoa = params.id_pessoa ? Number(params.id_pessoa) : null;
        this.caixa.pessoa.id = Number(idPessoa);
      }
      if (params.id_centroDeCusto) {
        const idCentroDeCusto = params.id_centroDeCusto ? Number(params.id_centroDeCusto) : null;
        this.caixa.centroDeCusto.id = Number(idCentroDeCusto);
      }
    });

  }


  buscarCaixaPorCondominio(idCondominio: number) {
    this.caixaService.buscarPorCondominio(idCondominio).subscribe(resposta => {
      this.caixas = resposta as Caixa[];
    }, error => {
      console.log(error);
      alert('erro Condominio.' + error);
    });
  }

  buscarCaixaPorPessoa(idPessoa: number) {
    this.caixaService.buscarPorPessoa(idPessoa).subscribe(resposta => {
      this.caixas = resposta as Caixa[];
    }, error => {
      console.log(error);
      alert('erro Pessoa.' + error);
    });
  }

  buscarCaixaPorCentroDeCusto(idCentroDeCusto: number) {
    this.caixaService.buscarPorCentroDeCusto(idCentroDeCusto).subscribe(resposta => {
      this.caixas = resposta as Caixa[];
    }, error => {
      console.log(error);
      alert('erro CentroDeCusto.' + error);
    });
  }


  consultarPaginado(event: LazyLoadEvent) {
    console.log(event);
    this.filters = this.formatFilters( event );
    if(this.caixa.condominio.id){
      let it = new Item();
      it.field = 'condominio.id';
      it.matchMode = 'equals';
      it.value = String(this.caixa.condominio.id);
      this.filters.push(it);
    }
    if(this.caixa.pessoa.id){
      let it = new Item();
      it.field = 'pessoa.id';
      it.matchMode = 'equals';
      it.value = String(this.caixa.pessoa.id);
      this.filters.push(it);
    }
    if(this.caixa.centroDeCusto.id){
      let it = new Item();
      it.field = 'centroDeCusto.id';
      it.matchMode = 'equals';
      it.value = String(this.caixa.centroDeCusto.id);
      this.filters.push(it);
    }

    event.globalFilter = this.filters;
    console.log(this.filters);
    this.caixaService.consultarPaginado(event).subscribe((resposta: any) => {
      console.log(resposta);
      this.caixas = resposta.content as Caixa[];
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
    this.caixaService.consultar().subscribe((resposta: Caixa[]) => {
      this.caixas = resposta as Caixa[];
    }, (error: string) => {
      console.log(error);
      alert('erro caixas.' + error);
    });
  }

  onSubmit(caixaForm: any) {

  }

}

