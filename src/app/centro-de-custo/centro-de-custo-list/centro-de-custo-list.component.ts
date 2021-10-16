import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem, LazyLoadEvent } from 'primeng/api';
import { Item } from 'src/app/models/dto/item';
import { CentroDeCusto } from '../centro-de-custo';
import { CentroDeCustoService } from '../centro-de-custo.service';

@Component({
  selector: 'app-centro-de-custo-list',
  templateUrl: './centro-de-custo-list.component.html',
  styleUrls: ['./centro-de-custo-list.component.css']
})
export class CentroDeCustoListComponent implements OnInit {

  centroDeCustos!: CentroDeCusto[];
  centroDeCusto!: CentroDeCusto;
  totalRecords: number = 0;
  filters: Item[] = [];

//[declaracoes]

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private centroDeCustoService: CentroDeCustoService) { }

  ngOnInit() {
    this.centroDeCusto = new CentroDeCusto();
	    
//[buscarFK]
    this.activatedRoute.params.subscribe(params => {
      const id = params.id ? Number(params.id) : null;
      console.log(id);
      if (id != null) {
      console.log('contem id: ' + id);
        //this.buscar(id);
      }
    });

  }

  consultarPaginado(event: LazyLoadEvent) {
    console.log(event);
    this.filters = this.formatFilters( event );
    event.globalFilter = this.filters;
    console.log(this.filters);
    this.centroDeCustoService.consultarPaginado(event).subscribe((resposta: any) => {
      console.log(resposta);
      this.centroDeCustos = resposta.content as CentroDeCusto[];
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

  displayTitle( s: string ) {
    return s.replace(/(^|[_-])([a-z])/g, (a, b, c) => c.toUpperCase())
      .replace(/([a-z])([A-Z])/g, (a, b, c) => `${b} ${c}`
  ) }

  consultar() {
    this.centroDeCustoService.consultar().subscribe((resposta: CentroDeCusto[]) => {
      this.centroDeCustos = resposta as CentroDeCusto[];
    }, (error: string) => {
      console.log(error);
      alert('erro centroDeCustos.' + error);
    });
  }

  onSubmit(centroDeCustoForm: any) {

  }

}

