import { Router, ActivatedRoute } from '@angular/router';
import { FaturamentoService } from '../faturamento.service';
import { Component, OnInit } from '@angular/core';
import { Faturamento } from '../faturamento';
import { MessageService, ConfirmationService, SelectItem, LazyLoadEvent } from 'primeng/api';
import { Item } from 'src/app/models/dto/item';
import { Condominio } from 'src/app/condominio/condominio';

@Component({
  selector: 'app-faturamento-list',
  templateUrl: './faturamento-list.component.html',
  styleUrls: ['./faturamento-list.component.css']
})
export class FaturamentoListComponent implements OnInit {

  faturamentos!: Faturamento[];
  faturamento!: Faturamento;
  totalRecords: number = 0;
  filters: Item[] = [];

  //[declaracoes]

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private faturamentoService: FaturamentoService) { }

  ngOnInit() {
    this.faturamento = new Faturamento();
    this.faturamento.condominio = new Condominio();

    //[buscarFK]
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        const id = params.id ? Number(params.id) : null;
        this.faturamento.id = Number(id);
      }
      if (params.id_condominio) {
        const idCondominio = params.id_condominio ? Number(params.id_condominio) : null;
        this.faturamento.condominio.id = Number(idCondominio);
      }
    });
  }

  buscarFaturamentoPorCondominio(idCondominio: number) {
    this.faturamentoService.buscarPorCondominio(idCondominio).subscribe(resposta => {
      this.faturamentos = resposta as Faturamento[];
    }, error => {
      console.log(error);
      alert('erro Condominio.' + error);
    });
  }


  consultarPaginado(event: LazyLoadEvent) {
    console.log(event);
    this.filters = this.formatFilters(event);
    if (this.faturamento.condominio.id) {
      let it = new Item();
      it.field = 'condominio.id';
      it.matchMode = 'equals';
      it.value = this.faturamento.condominio.id+"";
      this.filters.push(it);
    }

    event.globalFilter = this.filters;
    console.log(this.filters);
    this.faturamentoService.consultarPaginado(event).subscribe((resposta: any) => {
      console.log(resposta);
      this.faturamentos = resposta.content as Faturamento[];
      this.totalRecords = resposta.totalElements;
    }, (error: any) => {
      console.log(error);
      alert('erro condominios.' + error);
    });
  }

  formatFilters(event: LazyLoadEvent): Item[] {
    const filterStrings: string[] = [];
    const itens: Item[] = [];
    for (let prop in event.filters) {
      let filterField: string = prop;
      let filterMeta = event.filters[filterField];
      if (Array.isArray(filterMeta)) {
        for (let meta of filterMeta) {
          if (meta.value !== null) {
            const field: string = this.displayTitle(filterField);
            filterStrings.push(`${field} (${meta.matchMode}) ${meta.value}`);
            let it = new Item();
            it.field = field;
            it.matchMode = meta.matchMode;
            it.value = meta.value;
            itens.push(it);
          }
        }
      }
    }
    console.warn(filterStrings);
    return itens;
  }
  /*
  */
  displayTitle(s: string) {
    return s.replace(/(^|[_-])([a-z])/g, (a, b, c) => c.toUpperCase())
      .replace(/([a-z])([A-Z])/g, (a, b, c) => `${b} ${c}`
      )
  }


  consultar() {
    this.faturamentoService.consultar().subscribe((resposta: Faturamento[]) => {
      this.faturamentos = resposta as Faturamento[];
    }, (error: string) => {
      console.log(error);
      alert('erro faturamentos.' + error);
    });
  }

  onSubmit(faturamentoForm: any) {

  }

}

