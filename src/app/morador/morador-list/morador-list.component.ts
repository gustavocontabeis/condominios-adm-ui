import { Router, ActivatedRoute } from '@angular/router';
import { MoradorService } from '../morador.service';
import { Component, OnInit } from '@angular/core';
import { Morador } from '../morador';
import { MessageService, ConfirmationService, SelectItem, LazyLoadEvent } from 'primeng/api';
import { Item } from 'src/app/models/dto/item';
import { Apartamento } from 'src/app/apartamento/apartamento';
import { Pessoa } from 'src/app/pessoa/pessoa';

@Component({
  selector: 'app-morador-list',
  templateUrl: './morador-list.component.html',
  styleUrls: ['./morador-list.component.css']
})
export class MoradorListComponent implements OnInit {

  moradores!: Morador[];
  morador!: Morador;
  totalRecords: number = 0;
  filters: Item[] = [];

//[declaracoes]

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private moradorService: MoradorService) { }

  ngOnInit() {
    this.morador = new Morador();
    this.morador.pessoa = new Pessoa();
	  this.morador.apartamento = new Apartamento();
	
//[buscarFK]
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        const id = params.id ? Number(params.id) : null;
        this.morador.id = Number(id);
      }
      if (params.id_pessoa) {
        const idpessoa = params.id_pessoa ? Number(params.id_pessoa) : null;
        //this.morador.pessoa.id = idSindico; COLOQUE AQUI A LÓGICA
      }
      if (params.id_apartamento) {
        const idapartamento = params.id_apartamento ? Number(params.id_apartamento) : null;
        this.morador.apartamento.id = Number(idapartamento)
      }
    });

  }


  buscarMoradorPorPessoa(idPessoa: number) {
    this.moradorService.buscarPorPessoa(idPessoa).subscribe(resposta => {
      this.moradores = resposta as Morador[];
    }, error => {
      console.log(error);
      alert('erro Pessoa.' + error);
    });
  }

  buscarMoradorPorApartamento(idApartamento: number) {
    this.moradorService.buscarPorApartamento(idApartamento).subscribe(resposta => {
      this.moradores = resposta as Morador[];
    }, error => {
      console.log(error);
      alert('erro Apartamento.' + error);
    });
  }


  consultarPaginado(event: LazyLoadEvent) {
    console.log(event);
    this.filters = this.formatFilters( event );
    if(this.morador.pessoa.id){
      let it = new Item();
      it.field = 'pessoa.id';
      it.matchMode = 'equals';
      it.value = this.morador.pessoa.id+"";
      this.filters.push(it);
    }
    if(this.morador.apartamento.id){
      let it = new Item();
      it.field = 'apartamento.id';
      it.matchMode = 'equals';
      it.value = this.morador.apartamento.id+"";
      this.filters.push(it);
    }

    event.globalFilter = this.filters;
    console.log(this.filters);
    this.moradorService.consultarPaginado(event).subscribe((resposta: any) => {
      console.log(resposta);
      this.moradores = resposta.content as Morador[];
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
    this.moradorService.consultar().subscribe((resposta: Morador[]) => {
      this.moradores = resposta as Morador[];
    }, (error: string) => {
      console.log(error);
      alert('erro moradores.' + error);
    });
  }

  onSubmit(moradorForm: any) {

  }

}

