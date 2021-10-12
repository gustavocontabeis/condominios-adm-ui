import { Router, ActivatedRoute } from '@angular/router';
import { BlocoService } from '../bloco.service';
import { Component, OnInit } from '@angular/core';
import { Bloco } from '../bloco';
import { MessageService, ConfirmationService, SelectItem, LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-bloco-list',
  templateUrl: './bloco-list.component.html',
  styleUrls: ['./bloco-list.component.css']
})
export class BlocoListComponent implements OnInit {

  blocos!: Bloco[];
  totalRecords: number = 0;
  bloco!: Bloco;

//[declaracoes]

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private blocoService: BlocoService) { }

  ngOnInit() {
//[ngOnInit]
//[buscarFK]
    this.activatedRoute.params.subscribe(params => {
      // if (params.id_condominio) {
      //   const idcondominio = params.id_condominio ? Number(params.id_condominio) : null;
      //   this.buscarBlocoPorCondominio(idcondominio);
      // }
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
    event.globalFilter=[
      {name:"condominio.id", value: {value: "1000", matchMode: "equals", operator: "and"}},
      {name:"nome", value: {value: "Bloco", matchMode: "strartWith", operator: "and"}},
    ];
    console.log('>>>');
    console.log(event);
    this.blocoService.consultarPaginado(event).subscribe((resposta: any) => {
      console.log(resposta);
      this.blocos = resposta.content as Bloco[];
      this.totalRecords = resposta.totalElements;
    }, (error : any) => {
      console.log(error);
      alert('erro condominios.' + error);
    });
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

