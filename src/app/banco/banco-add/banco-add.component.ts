import { Router, ActivatedRoute } from '@angular/router';
import { BancoService } from '../banco.service';
import { Component, OnInit } from '@angular/core';
import { Banco } from '../banco';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { CondominioService } from 'src/app/condominio/condominio.service';
import { Condominio } from 'src/app/condominio/condominio';

@Component({
  selector: 'app-banco-add',
  templateUrl: './banco-add.component.html',
  styleUrls: ['./banco-add.component.css']
})
export class BancoAddComponent implements OnInit {

  banco: Banco = new Banco();
  bancos!: Banco[];
  exibirDialog!: boolean;
  novoRegistro!: boolean;

  condominios: SelectItem[] = [];
  tipos: SelectItem[] = [];
  lancamentos: SelectItem[] = [];


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private bancoService: BancoService, 
    private condominioService: CondominioService) { }

  ngOnInit() {
    this.exibirDialog = false;
    this.novoRegistro = false;
    this.banco = new Banco();
    this.banco.condominio = new Condominio();
    
    this.condominios = [];
    this.tipos = [{label: 'Selecione', value: null},
      {label: 'CONTA_CORRENTE', value: 'CONTA_CORRENTE'},
      {label: 'POUPANCA', value: 'POUPANCA'},
];  this.lancamentos = [];

    this.buscarCondominio();

    this.activatedRoute.params.subscribe(params => {
      if (params.id_condominio) {
        const idcondominio = params.id_condominio ? Number(params.id_condominio) : null;
        this.buscarBancoPorCondominio(Number(idcondominio));
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

  buscarBancoPorCondominio(idCondominio: number) {
    this.bancoService.buscarPorCondominio(idCondominio).subscribe((resposta: any) => {
      this.bancos = resposta as Banco[];
    }, (error: any) => {
      console.log(error);
      alert('erro Condominio.' + error);
    });
  }

  buscar(id: number) {
    this.bancoService.buscar(id).subscribe((resposta: any) => {
      this.banco = resposta as Banco;
    }, (error: any) => {
      console.log(error);
      alert('erro bancos.' + error);
    });
  }

  consultar() {
    this.bancoService.consultar().subscribe((resposta: any) => {
      this.bancos = resposta as Banco[];
    }, (error: any) => {
      console.log(error);
      alert('erro bancos.' + error);
    });
  }

  novo() {
    const banco = new Banco();
    this.exibirModal(banco);
  }

  exibirModal(banco: Banco) {
    this.novoRegistro = true;
    this.exibirDialog = true;
    this.banco = banco;
  }

  salvar() {
    console.log('salvar');
    this.bancoService.adicionar(this.banco).subscribe((resposta: any) => {
      this.consultar();
      this.exibirDialog = false;
      this.novoRegistro = false;
      this.messageService.add({severity: 'success', summary: 'OK', detail: 'Registro adicionado com sucesso.'});
      this.router.navigate(['/banco/banco-list']);
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
    this.bancoService.excluir(this.banco).subscribe((resposta: any) => {
      this.consultar();
      this.exibirDialog = false;
      this.novoRegistro = false;
      this.messageService.add({severity: 'success', summary: 'OK', detail: 'Registro excluído com sucesso.'});
      }, (error: any) => alert('erro bancos.')
    );
  }

  aoSelecionar(event: any) {
    this.novoRegistro = false;
  }
  
  onSubmit(bancoForm: any) {

  }

}

