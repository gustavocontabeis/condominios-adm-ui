import { Router, ActivatedRoute } from '@angular/router';
import { BlocoService } from '../bloco.service';
import { Component, OnInit } from '@angular/core';
import { Bloco } from '../bloco';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { CondominioService } from 'src/app/condominio/condominio.service';
import { ApartamentoService } from 'src/app/apartamento/apartamento.service';
import { Condominio } from 'src/app/condominio/condominio';
import { Apartamento } from 'src/app/apartamento/apartamento';

@Component({
  selector: 'app-bloco-add',
  templateUrl: './bloco-add.component.html',
  styleUrls: ['./bloco-add.component.css']
})
export class BlocoAddComponent implements OnInit {

  bloco: Bloco = new Bloco();
  blocos!: Bloco[];
  exibirDialog!: boolean;
  novoRegistro!: boolean;

  tipos: SelectItem[] = [];
  condominios: SelectItem[] = [];
  apartamentos: SelectItem[] = [];


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private blocoService: BlocoService, 
    private condominioService: CondominioService, 
    private apartamentosService: ApartamentoService) { }

  ngOnInit() {
    this.exibirDialog = false;
    this.novoRegistro = false;
    this.bloco = new Bloco();
    this.tipos = [{label: 'Selecione', value: null},
      {label: 'BLOCO', value: 'BLOCO'},
      {label: 'TORRE', value: 'TORRE'},
];  this.condominios = [];
  this.apartamentos = [];

    this.buscarCondominio();
    this.buscarApartamentos();

    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        const id = params.id ? Number(params.id) : null;
        this.buscar(Number(id));
      } else if (params.id_condominio) {
        const idcondominio = params.id_condominio ? Number(params.id_condominio) : null;
        this.buscarBlocoPorCondominio(Number(idcondominio));
      } else {
        this.consultar();
      }
    });

  }
  
  buscarCondominio(){
    this.condominioService.consultar().subscribe((resposta: any) => {
      const itens = resposta as Condominio[];
      itens.forEach(element => {
         this.condominios.push({label: element.nome, value: element});
      });
      }, (error: any) => {
        console.log(error);
        alert(error.ok);
      }
    );
  }
  buscarApartamentos(){
    this.apartamentosService.consultar().subscribe((resposta: any) => {
      const itens = resposta as Apartamento[];
      itens.forEach(element => {
         this.apartamentos.push({label: element.numero, value: element});
      });
      }, (error: any) => {
        console.log(error);
        alert(error.ok);
      }
    );
  }

  buscarBlocoPorCondominio(idCondominio: number) {
    this.blocoService.buscarPorCondominio(idCondominio).subscribe((resposta: any) => {
      this.blocos = resposta as Bloco[];
    }, (error: any) => {
      console.log(error);
      alert('erro Condominio.' + error);
    });
  }

  buscar(id: number) {
    this.blocoService.buscar(id).subscribe((resposta: any) => {
      this.bloco = resposta as Bloco;
    }, (error: any) => {
      console.log(error);
      alert('erro blocos.' + error);
    });
  }

  consultar() {
    this.blocoService.consultar().subscribe((resposta: any) => {
      this.blocos = resposta as Bloco[];
    }, (error: any) => {
      console.log(error);
      alert('erro blocos.' + error);
    });
  }

  novo() {
    const bloco = new Bloco();
    this.exibirModal(bloco);
  }

  exibirModal(bloco: Bloco) {
    this.novoRegistro = true;
    this.exibirDialog = true;
    this.bloco = bloco;
  }

  salvar() {
    console.log('salvar');
    this.blocoService.adicionar(this.bloco).subscribe((resposta: any) => {
      this.consultar();
      this.exibirDialog = false;
      this.novoRegistro = false;
      this.messageService.add({severity: 'success', summary: 'OK', detail: 'Registro adicionado com sucesso.'});
      this.router.navigate(['/bloco/bloco-list']);
      }, (error: any) => {
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
    this.blocoService.excluir(this.bloco).subscribe((resposta: any) => {
      this.consultar();
      this.exibirDialog = false;
      this.novoRegistro = false;
      this.messageService.add({severity: 'success', summary: 'OK', detail: 'Registro excluído com sucesso.'});
      }, (error: any) => alert('erro blocos.')
    );
  }

  aoSelecionar(event: any) {
    this.novoRegistro = false;
  }
  
  onSubmit(blocoForm: any) {

  }

}

