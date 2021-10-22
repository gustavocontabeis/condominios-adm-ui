import { Router, ActivatedRoute } from '@angular/router';
import { BancoService } from '../banco.service';
import { Component, OnInit } from '@angular/core';
import { Banco } from '../banco';
import { MessageService, ConfirmationService, SelectItem, LazyLoadEvent } from 'primeng/api';
import { Item } from 'src/app/models/dto/item';
import { Condominio } from 'src/app/condominio/condominio';

@Component({
  selector: 'app-banco-list',
  templateUrl: './banco-list.component.html',
  styleUrls: ['./banco-list.component.css']
})
export class BancoListComponent implements OnInit {

  bancos!: Banco[];
  banco!: Banco;
  totalRecords: number = 0;
  filters: Item[] = [];

//[declaracoes]

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private bancoService: BancoService) { }

  ngOnInit() {
    this.banco = new Banco();
	  this.banco.condominio = new Condominio();
	
//[buscarFK]
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        const id = params.id ? Number(params.id) : null;
        this.banco.id = Number(id);
      }
      if (params.id_condominio) {
        const idCondominio = params.id_condominio ? Number(params.id_condominio) : null;
        this.banco.condominio.id = Number(idCondominio);
      }
    });

  }


  buscarBancoPorCondominio(idCondominio: number) {
    this.bancoService.buscarPorCondominio(idCondominio).subscribe(resposta => {
      this.bancos = resposta as Banco[];
    }, error => {
      console.log(error);
      alert('erro Condominio.' + error);
    });
  }


  consultarPaginado(event: LazyLoadEvent) {
    console.log(event);
    this.filters = this.formatFilters( event );
    if(this.banco.condominio.id){
      let it = new Item();
      it.field = 'condominio.id';
      it.matchMode = 'equals';
      it.value = String(this.banco.condominio.id);
      this.filters.push(it);
    }

    event.globalFilter = this.filters;
    console.log(this.filters);
    this.bancoService.consultarPaginado(event).subscribe((resposta: any) => {
      console.log(resposta);
      this.bancos = resposta.content as Banco[];
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
    this.bancoService.consultar().subscribe((resposta: Banco[]) => {
      this.bancos = resposta as Banco[];
    }, (error: string) => {
      console.log(error);
      alert('erro bancos.' + error);
    });
  }

  onSubmit(bancoForm: any) {

  }

}

