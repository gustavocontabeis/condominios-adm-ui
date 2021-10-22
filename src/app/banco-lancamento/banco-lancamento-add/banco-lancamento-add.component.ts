import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { BancoLancamento } from '../banco-lancamento';
import { BancoLancamentoService } from '../banco-lancamento.service';
import { BancoService } from 'src/app/banco/banco.service';
import { CentroDeCustoService } from 'src/app/centro-de-custo/centro-de-custo.service';
import { CentroDeCusto } from 'src/app/centro-de-custo/centro-de-custo';
import { Banco } from 'src/app/banco/banco';

@Component({
  selector: 'app-banco-lancamento-add',
  templateUrl: './banco-lancamento-add.component.html',
  styleUrls: ['./banco-lancamento-add.component.css']
})
export class BancoLancamentoAddComponent implements OnInit {

  bancoLancamento: BancoLancamento = new BancoLancamento();
  bancoLancamentos!: BancoLancamento[];
  exibirDialog!: boolean;
  novoRegistro!: boolean;

  bancos: SelectItem[] = [];
  centroDeCustos: SelectItem[] = [];


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private bancoLancamentoService: BancoLancamentoService, 
    private BancoService: BancoService, 
    private CentroDeCustoService: CentroDeCustoService) { }

  ngOnInit() {
    this.exibirDialog = false;
    this.novoRegistro = false;
    this.bancoLancamento = new BancoLancamento();
    this.bancoLancamento.centroDeCusto = new CentroDeCusto();
    this.bancoLancamento.banco = new Banco();

  this.bancos = [];
  this.centroDeCustos = [];

    this.buscarBanco();
    this.buscarCentroDeCusto();

    this.activatedRoute.params.subscribe(params => {
      if (params.id_banco) {
        const idbanco = params.id_banco ? Number(params.id_banco) : null;
        this.buscarBancoLancamentoPorBanco(Number(idbanco));
      } else {
        this.consultar();
      }
      if (params.id_centroDeCusto) {
        const idcentroDeCusto = params.id_centroDeCusto ? Number(params.id_centroDeCusto) : null;
        this.buscarBancoLancamentoPorCentroDeCusto(Number(idcentroDeCusto));
      } else {
        this.consultar();
      }
    });

  }
  
  buscarBanco(){
    this.BancoService.consultar().subscribe((resposta: any) => {
      const itens = resposta as Banco[];
      itens.forEach(element => {
         this.bancos.push({label: element.numero+'/'+element.agencia+'/'+element.conta, value: element});
      });
      }, (error: any) => {
        console.log(error);
        alert(error.ok);
      }
    );
  }
  buscarCentroDeCusto(){
    this.CentroDeCustoService.consultar().subscribe((resposta: any) => {
      const itens = resposta as CentroDeCusto[];
      itens.forEach(element => {
         this.centroDeCustos.push({label: element.nome, value: element});
      });
      }, (error: any) => {
        console.log(error);
        alert(error.ok);
      }
    );
  }

  buscarBancoLancamentoPorBanco(idBanco: number) {
    this.bancoLancamentoService.buscarPorBanco(idBanco).subscribe((resposta: any) => {
      this.bancoLancamentos = resposta as BancoLancamento[];
    }, (error: any) => {
      console.log(error);
      alert('erro Banco.' + error);
    });
  }

  buscarBancoLancamentoPorCentroDeCusto(idCentroDeCusto: number) {
    this.bancoLancamentoService.buscarPorCentroDeCusto(idCentroDeCusto).subscribe((resposta: any) => {
      this.bancoLancamentos = resposta as BancoLancamento[];
    }, (error: any) => {
      console.log(error);
      alert('erro CentroDeCusto.' + error);
    });
  }

  buscar(id: number) {
    this.bancoLancamentoService.buscar(id).subscribe((resposta: any) => {
      this.bancoLancamento = resposta as BancoLancamento;
    }, (error: any) => {
      console.log(error);
      alert('erro bancoLancamentos.' + error);
    });
  }

  consultar() {
    this.bancoLancamentoService.consultar().subscribe((resposta: any) => {
      this.bancoLancamentos = resposta as BancoLancamento[];
    }, (error: any) => {
      console.log(error);
      alert('erro bancoLancamentos.' + error);
    });
  }

  novo() {
    const bancoLancamento = new BancoLancamento();
    this.exibirModal(bancoLancamento);
  }

  exibirModal(bancoLancamento: BancoLancamento) {
    this.novoRegistro = true;
    this.exibirDialog = true;
    this.bancoLancamento = bancoLancamento;
  }

  salvar() {
    console.log('salvar');
    this.bancoLancamentoService.adicionar(this.bancoLancamento).subscribe((resposta: any) => {
      this.consultar();
      this.exibirDialog = false;
      this.novoRegistro = false;
      this.messageService.add({severity: 'success', summary: 'OK', detail: 'Registro adicionado com sucesso.'});
      this.router.navigate(['/banco-lancamento/banco-lancamento-list']);
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
    this.bancoLancamentoService.excluir(this.bancoLancamento).subscribe((resposta: any) => {
      this.consultar();
      this.exibirDialog = false;
      this.novoRegistro = false;
      this.messageService.add({severity: 'success', summary: 'OK', detail: 'Registro excluído com sucesso.'});
      }, (error: any) => alert('erro bancoLancamentos.')
    );
  }

  aoSelecionar(event: any) {
    this.novoRegistro = false;
  }
  
  onSubmit(bancoLancamentoForm: any) {

  }

}

