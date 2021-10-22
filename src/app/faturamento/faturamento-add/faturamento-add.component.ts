import { Router, ActivatedRoute } from '@angular/router';
import { FaturamentoService } from '../faturamento.service';
import { Component, OnInit } from '@angular/core';
import { Faturamento } from '../faturamento';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { CondominioService } from 'src/app/condominio/condominio.service';
import { BoletoService } from 'src/app/boleto/boleto.service';
import { Condominio } from 'src/app/condominio/condominio';
import { Boleto } from 'src/app/boleto/boleto';

@Component({
  selector: 'app-faturamento-add',
  templateUrl: './faturamento-add.component.html',
  styleUrls: ['./faturamento-add.component.css']
})
export class FaturamentoAddComponent implements OnInit {

  faturamento: Faturamento = new Faturamento();
  faturamentos!: Faturamento[];
  exibirDialog!: boolean;
  novoRegistro!: boolean;

  condominios: SelectItem[] = [];
  boletos: SelectItem[] = [];


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private faturamentoService: FaturamentoService, 
    private CondominioService: CondominioService, 
    private BoletoService: BoletoService) { }

  ngOnInit() {
    this.exibirDialog = false;
    this.novoRegistro = false;

    this.faturamento = new Faturamento();
    this.faturamento.condominio = new Condominio();
  this.condominios = [];
  this.boletos = [];

    this.buscarCondominio();
    //this.buscarBoleto();

    this.activatedRoute.params.subscribe(params => {
      if (params.id_condominio) {
        const idcondominio = params.id_condominio ? Number(params.id_condominio) : null;
        this.buscarFaturamentoPorCondominio(Number(idcondominio));
      } else {
        this.consultar();
      }
    });

  }
  
  buscarCondominio(){
    this.CondominioService.consultar().subscribe((resposta: any) => {
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

  buscarBoleto(){
    this.BoletoService.consultar().subscribe((resposta: any) => {
      const itens = resposta as Boleto[];
      itens.forEach(element => {
         this.boletos.push({label: element.apartamento.numero + '/' + element.id, value: element});
      });
      }, (error: any) => {
        console.log(error);
        alert(error.ok);
      }
    );
  }

  buscarFaturamentoPorCondominio(idCondominio: number) {
    this.faturamentoService.buscarPorCondominio(idCondominio).subscribe((resposta: any) => {
      this.faturamentos = resposta as Faturamento[];
    }, (error: any) => {
      console.log(error);
      alert('erro Condominio.' + error);
    });
  }

  buscar(id: number) {
    this.faturamentoService.buscar(id).subscribe((resposta: any) => {
      this.faturamento = resposta as Faturamento;
    }, (error: any) => {
      console.log(error);
      alert('erro faturamentos.' + error);
    });
  }

  consultar() {
    this.faturamentoService.consultar().subscribe((resposta: any) => {
      this.faturamentos = resposta as Faturamento[];
    }, (error: any) => {
      console.log(error);
      alert('erro faturamentos.' + error);
    });
  }

  novo() {
    const faturamento = new Faturamento();
    this.exibirModal(faturamento);
  }

  exibirModal(faturamento: Faturamento) {
    this.novoRegistro = true;
    this.exibirDialog = true;
    this.faturamento = faturamento;
  }

  salvar() {
    console.log('salvar');
    this.faturamentoService.adicionar(this.faturamento).subscribe((resposta: any) => {
      this.consultar();
      this.exibirDialog = false;
      this.novoRegistro = false;
      this.messageService.add({severity: 'success', summary: 'OK', detail: 'Registro adicionado com sucesso.'});
      this.router.navigate(['/faturamento/faturamento-list']);
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
    this.faturamentoService.excluir(this.faturamento).subscribe((resposta: any) => {
      this.consultar();
      this.exibirDialog = false;
      this.novoRegistro = false;
      this.messageService.add({severity: 'success', summary: 'OK', detail: 'Registro excluído com sucesso.'});
      }, (error: any) => alert('erro faturamentos.')
    );
  }

  aoSelecionar(event: any) {
    this.novoRegistro = false;
  }
  
  onSubmit(faturamentoForm: any) {

  }

}

