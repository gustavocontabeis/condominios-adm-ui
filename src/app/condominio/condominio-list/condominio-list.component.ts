
import { Router, ActivatedRoute } from '@angular/router';
import { CondominioService } from '../condominio.service';
import { Component, OnInit } from '@angular/core';
import { Condominio } from '../condominio';
import { MessageService, ConfirmationService, SelectItem, LazyLoadEvent } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@Component({
  selector: 'app-condominio-list',
  templateUrl: './condominio-list.component.html',
  styleUrls: ['./condominio-list.component.css']
})
export class CondominioListComponent implements OnInit {

  condominio: Condominio = new Condominio();
  condominios!: Condominio[];
  exibirDialog!: boolean;
  novoRegistro!: boolean;
  totalRecords: number = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private condominioService: CondominioService) { }

  ngOnInit() {
    console.log('ngOnInit');
    
    this.exibirDialog = false;
    this.novoRegistro = false;
    this.condominio = new Condominio();
//[ngOnInit]
//[buscarFK]
    this.activatedRoute.params.subscribe(params => {
      if (params.id_sindico) {
        // const idsindico = params.id_sindico ? Number(params.id_sindico) : null;
        // this.buscarCondominioPorSindico(idsindico);
      } else {
        //let event = {first:0, rows:3}
        //this.consultarPaginado(event);
      }
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

  buscar(id: number) {
    this.condominioService.buscar(id).subscribe((resposta: Condominio) => {
      this.condominio = resposta as Condominio;
    }, (error : any) => {
      console.log(error);
      alert('erro condominios.' + error);
    });
  }

  consultarPaginado(event: LazyLoadEvent) {
    console.log(event);
    this.condominioService.consultarPaginado(event).subscribe((resposta: any) => {
      console.log(resposta);
      this.condominios = resposta.content as Condominio[];
      this.totalRecords = resposta.totalElements;
    }, (error : any) => {
      console.log(error);
      alert('erro condominios.' + error);
    });
  }

  consultar() {
    this.condominioService.consultar().subscribe((resposta: Condominio[]) => {
      console.log(resposta);
      this.condominios = resposta as Condominio[];
    }, (error : any) => {
      console.log(error);
      alert('erro condominios.' + error);
    });
  }

  novo() {
    const condominio = new Condominio();
    this.exibirModal(condominio);
  }

  exibirModal(condominio: Condominio) {
    this.novoRegistro = true;
    this.exibirDialog = true;
    this.condominio = condominio;
  }

  salvar() {
    console.log('salvar');
    this.condominioService.adicionar(this.condominio).subscribe((resposta: Condominio) => {
      this.consultar();
      this.exibirDialog = false;
      this.novoRegistro = false;
      this.messageService.add({severity: 'success', summary: 'OK', detail: 'Registro adicionado com sucesso.'});
      this.router.navigate(['/condominio/condominio-list']);
      }, (error : any) => {
        console.log(error);
        alert(error.ok);
      }
    );
  }

  confirmarExcluir() {
    console.log('confirmarExcluir');
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este registro?',
      accept: () => {
          console.log('confirmarExcluir - accept');
          this.excluir();
      },
      reject: () => {
          this.messageService.add({severity: 'success', summary: 'Cancelado', detail: 'Ok. Cancelado.'});
      }
    });
  }

  excluir() {
    console.log('excluir');
    this.condominioService.excluir(this.condominio).subscribe((resposta: Condominio) => {
      this.consultar();
      this.exibirDialog = false;
      this.novoRegistro = false;
      this.messageService.add({severity: 'success', summary: 'OK', detail: 'Registro excluído com sucesso.'});
      }, (error : any) => alert('erro condominios.')
    );
  }

  aoSelecionar(event: any) {
    this.novoRegistro = false;
  }

  onSubmit(condominioForm: any) {

  }

}

