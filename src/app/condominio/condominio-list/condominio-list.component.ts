import { Router, ActivatedRoute } from '@angular/router';
import { CondominioService } from '../condominio.service';
import { Component, OnInit } from '@angular/core';
import { Condominio } from '../condominio';
import { MessageService, ConfirmationService, SelectItem, LazyLoadEvent } from 'primeng/api';
import { Item } from 'src/app/models/dto/item';

@Component({
  selector: 'app-condominio-list',
  templateUrl: './condominio-list.component.html',
  styleUrls: ['./condominio-list.component.css']
})
export class CondominioListComponent implements OnInit {

  condominios!: Condominio[];
  totalRecords: number = 0;
  filters: Item[] = [];
  
//[declaracoes]

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private condominioService: CondominioService) { }

  ngOnInit() {
//[ngOnInit]
//[buscarFK]
    this.activatedRoute.params.subscribe(params => {
      // if (params.id_sindico) {
      //   const idsindico = params.id_sindico ? Number(params.id_sindico) : null;
      //   this.buscarCondominioPorSindico(idsindico);
      // }
    });
  }

  buscarCondominioPorSindico(idSindico: number) {
    this.condominioService.buscarPorSindico(idSindico).subscribe(resposta => {
      this.condominios = resposta as Condominio[];
    }, error => {
      console.log(error);
      alert('erro Sindico.' + error);
    });
  }

  consultarPaginado(event: LazyLoadEvent) {
    console.log(">>>>>>>>>>>>>>");
    this.filters = this.formatFilters( event );
    console.log(">>>>>>>>>>>>>>!");
    event.globalFilter = this.filters;
    console.log(this.filters);
    this.condominioService.consultarPaginado(event).subscribe((resposta: any) => {
      console.log(resposta);
      console.log(resposta.content);
      this.condominios = resposta.content as Condominio[];
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
    this.condominioService.consultar().subscribe((resposta: Condominio[]) => {
      this.condominios = resposta as Condominio[];
    }, (error: string) => {
      console.log(error);
      alert('erro condominios.' + error);
    });
  }

  onSubmit(condominioForm: any) {

  }

}

