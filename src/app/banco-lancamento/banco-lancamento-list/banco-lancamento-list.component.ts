import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem, LazyLoadEvent } from 'primeng/api';
import { Item } from 'src/app/models/dto/item';
import { BancoLancamento } from '../banco-lancamento';
import { BancoLancamentoService } from '../banco-lancamento.service';
import { CentroDeCusto } from 'src/app/centro-de-custo/centro-de-custo';
import { Banco } from 'src/app/banco/banco';


@Component({
  selector: 'app-banco-lancamento-list',
  templateUrl: './banco-lancamento-list.component.html',
  styleUrls: ['./banco-lancamento-list.component.css']
})
export class BancoLancamentoListComponent implements OnInit {

  bancoLancamentos!: BancoLancamento[];
  bancoLancamento!: BancoLancamento;
  totalRecords: number = 0;
  filters: Item[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private bancoLancamentoService: BancoLancamentoService) { }

  ngOnInit() {
    this.bancoLancamento = new BancoLancamento();
    this.bancoLancamento.centroDeCusto = new CentroDeCusto();
    this.bancoLancamento.banco = new Banco();
	
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        const id = params.id ? Number(params.id) : null;
        this.bancoLancamento.id = Number(id);
      }
      if (params.id_banco) {
        const idBanco = params.id_banco ? Number(params.id_banco) : null;
        this.bancoLancamento.banco.id = Number(idBanco);
      }
      if (params.id_centroDeCusto) {
        const idCentroDeCusto = params.id_centroDeCusto ? Number(params.id_centroDeCusto) : null;
        this.bancoLancamento.centroDeCusto.id = Number(idCentroDeCusto);
      }
    });

  }


  buscarBancoLancamentoPorBanco(idBanco: number) {
    this.bancoLancamentoService.buscarPorBanco(idBanco).subscribe(resposta => {
      this.bancoLancamentos = resposta as BancoLancamento[];
    }, error => {
      console.log(error);
      alert('erro Banco.' + error);
    });
  }

  buscarBancoLancamentoPorCentroDeCusto(idCentroDeCusto: number) {
    this.bancoLancamentoService.buscarPorCentroDeCusto(idCentroDeCusto).subscribe(resposta => {
      this.bancoLancamentos = resposta as BancoLancamento[];
    }, error => {
      console.log(error);
      alert('erro CentroDeCusto.' + error);
    });
  }


  consultarPaginado(event: LazyLoadEvent) {
    console.log(event);
    this.filters = this.formatFilters( event );
    if(this.bancoLancamento.banco.id){
      let it = new Item();
      it.field = 'banco.id';
      it.matchMode = 'equals';
      it.value = String(this.bancoLancamento.banco.id);
      this.filters.push(it);
    }
    if(this.bancoLancamento.centroDeCusto.id){
      let it = new Item();
      it.field = 'centroDeCusto.id';
      it.matchMode = 'equals';
      it.value = String(this.bancoLancamento.centroDeCusto.id);
      this.filters.push(it);
    }

    event.globalFilter = this.filters;
    console.log(this.filters);
    this.bancoLancamentoService.consultarPaginado(event).subscribe((resposta: any) => {
      console.log(resposta);
      this.bancoLancamentos = resposta.content as BancoLancamento[];
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
    this.bancoLancamentoService.consultar().subscribe((resposta: BancoLancamento[]) => {
      this.bancoLancamentos = resposta as BancoLancamento[];
    }, (error: string) => {
      console.log(error);
      alert('erro bancoLancamentos.' + error);
    });
  }

  onSubmit(bancoLancamentoForm: any) {

  }

}

