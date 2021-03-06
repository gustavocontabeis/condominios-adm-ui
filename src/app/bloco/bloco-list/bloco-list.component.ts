import { BlocoService } from '../bloco.service';
import { Component, OnInit } from '@angular/core';
import { Bloco } from '../bloco';
import { MessageService, ConfirmationService, SelectItem, LazyLoadEvent } from 'primeng/api';
import { Item } from 'src/app/models/dto/item';
import { ActivatedRoute, Router } from '@angular/router';
import { Condominio } from 'src/app/condominio/condominio';

@Component({
  selector: 'app-bloco-list',
  templateUrl: './bloco-list.component.html',
  styleUrls: ['./bloco-list.component.css']
})
export class BlocoListComponent implements OnInit {

  blocos!: Bloco[];
  bloco!: Bloco;
  totalRecords: number = 0;
  filters: Item[] = [];

  //[declaracoes]

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private blocoService: BlocoService) { }

  ngOnInit() {
    this.bloco = new Bloco();
    this.bloco.condominio = new Condominio();

    //[buscarFK]
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        const id = params.id ? Number(params.id) : null;
        console.log(id);
        this.bloco.id = Number(params.id);
      }
      if (params.id_condominio) {
        const idcondominio = params.id_condominio ? Number(params.id_condominio) : null;
        console.log(idcondominio);
        this.bloco.condominio.id = Number(idcondominio);
      }
    });

  }

  buscarBlocoPorCondominio(idCondominio: number) {
    this.blocoService.buscarPorCondominio(idCondominio).subscribe(resposta => {
      this.blocos = resposta as Bloco[];
    }, error => {
      console.log(error);
      alert('erro Condominio.' + error);
    });
  }

  consultarPaginado(event: LazyLoadEvent) {
    console.log(event);
    this.filters = this.formatFilters(event);
    if (this.bloco.id) {
      let it = new Item();
      it.field = 'id';
      it.matchMode = 'equals';
      it.value = this.bloco.id + "";
      this.filters.push(it);
    }
    if (this.bloco.condominio.id) {
      let it = new Item();
      it.field = 'condominio.id';
      it.matchMode = 'equals';
      it.value = this.bloco.condominio.id + "";
      this.filters.push(it);
    }

    event.globalFilter = this.filters;
    console.log(this.filters);
    this.blocoService.consultarPaginado(event).subscribe((resposta: any) => {
      console.log(resposta);
      this.blocos = resposta.content as Bloco[];
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
    this.blocoService.consultar().subscribe((resposta: Bloco[]) => {
      this.blocos = resposta as Bloco[];
    }, (error: string) => {
      console.log(error);
      alert('erro blocos.' + error);
    });
  }

  onSubmit(blocoForm: any) {

  }

}

