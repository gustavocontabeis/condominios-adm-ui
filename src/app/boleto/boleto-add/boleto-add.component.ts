import { Router, ActivatedRoute } from '@angular/router';
import { BoletoService } from '../boleto.service';
import { Component, OnInit } from '@angular/core';
import { Boleto } from '../boleto';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ApartamentoService } from 'src/app/apartamento/apartamento.service';
import { FaturamentoService } from 'src/app/faturamento/faturamento.service';
import { PessoaService } from 'src/app/pessoa/pessoa.service';
import { Apartamento } from 'src/app/apartamento/apartamento';
import { Faturamento } from 'src/app/faturamento/faturamento';
import { Pessoa } from 'src/app/pessoa/pessoa';
import { CondominioService } from 'src/app/condominio/condominio.service';
import { Condominio } from 'src/app/condominio/condominio';

@Component({
  selector: 'app-boleto-add',
  templateUrl: './boleto-add.component.html',
  styleUrls: ['./boleto-add.component.css']
})
export class BoletoAddComponent implements OnInit {

  boleto: Boleto = new Boleto();
  boletos!: Boleto[];
  exibirDialog!: boolean;
  novoRegistro!: boolean;

  apartamentos: SelectItem[] = [];
  faturamentos: SelectItem[] = [];
  condominios: SelectItem[] = [];
  titulares: SelectItem[] = [];

  condominio: Condominio = new Condominio;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private boletoService: BoletoService, 
    private condominioService: CondominioService,
    private apartamentoService: ApartamentoService, 
    private faturamentoService: FaturamentoService, 
    private pessoaService: PessoaService) { }

    async ngOnInit() {
    this.exibirDialog = false;
    this.novoRegistro = false;
    this.boleto = new Boleto();
    this.boleto.apartamento = new Apartamento();
    this.boleto.faturamento = new Faturamento()
    this.apartamentos = [];
    this.faturamentos = [];
    this.titulares = [];

    await this.buscarCondominio();
    await this.buscarPessoa();

    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      if (params.id) {
        this.boleto.id = Number(params.id);
        this.buscar(this.boleto.id);
      } 
      if (params.id_apartamento) {
        const idapartamento = params.id_apartamento ? Number(params.id_apartamento) : null;
        this.buscarBoletoPorApartamento(Number(idapartamento));
      } 
      if (params.id_faturamento) {
        const idfaturamento = params.id_faturamento ? Number(params.id_faturamento) : null;
        this.faturamentoService.buscar(Number(idfaturamento)).subscribe((resposta: any) => {
          this.boleto.faturamento = resposta as Faturamento;
          console.log(this.boleto);
          this.buscarFaturamento();
          this.buscarApartamentosDoCondominio();
        }, (error: any) => {
            console.log(error);
            alert(error.ok);
          }
        );
      } 
      if (params.id_titular) {
        const idtitular = params.id_titular ? Number(params.id_titular) : null;
        this.buscarBoletoPorTitular(Number(idtitular));
      } 
    });
  }
  
  async buscarCondominio(){
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

  buscarApartamento(){
    this.apartamentoService.consultar().subscribe((resposta: any) => {
      const itens = resposta as Apartamento[];
      itens.forEach(element => {
         this.apartamentos.push({label: element.id + '/' + element.bloco.nome + '/' + element.numero, value: element});
      });
      }, (error: any) => {
        console.log(error);
        alert(error.ok);
      }
    );
  }

  buscarApartamentosDoCondominio(){
    this.apartamentoService.buscarPorCondominio(this.boleto.faturamento.condominio.id).subscribe((resposta: Apartamento[]) => {
      console.log('xxxxxxxxxxx', this.boleto.faturamento.condominio.id);
      console.log(resposta);
      
      const itens = resposta;
       itens.forEach(element => {
          this.apartamentos.push({label: element.id + '/' + element.bloco.nome + '/' + element.numero, value: element});
       });
      }, (error: any) => {
        console.log(error);
        alert(error.ok);
      }
    );
  }
  
  async buscarFaturamento(){
    this.faturamentoService.buscar(this.boleto.faturamento.id).subscribe((resposta: any) => {
      const element = resposta as Faturamento;
      this.faturamentos = [];
         this.faturamentos.push({label: element.condominio.nome + ' - ' + element.periodo, value: element});
      }, (error: any) => {
        console.log(error);
        alert(error.ok);
      }
    );
  }

  buscarPessoa(){
    this.pessoaService.consultar().subscribe((resposta: any) => {
      const itens = resposta as Pessoa[];
      itens.forEach(element => {
         this.titulares.push({label: element.nome, value: element});
      });
      }, (error: any) => {
        console.log(error);
        alert(error.ok);
      }
    );
  }

  buscarBoletoPorApartamento(idApartamento: number) {
    this.boletoService.buscarPorApartamento(idApartamento).subscribe((resposta: any) => {
      this.boletos = resposta as Boleto[];
    }, (error: any) => {
      console.log(error);
      alert('erro Apartamento.' + error);
    });
  }

  buscarBoletoPorFaturamento(idFaturamento: number) {
    console.log('buscarBoletoPorFaturamento 1');
    this.boletoService.buscarPorFaturamento(idFaturamento).subscribe((resposta: any) => {
      console.log('buscarBoletoPorFaturamento 2');
      console.log(resposta);
      this.boletos = resposta as Boleto[];
    }, (error: any) => {
      console.log(error);
      alert('erro Faturamento.' + error);
    });
  }

  buscarBoletoPorTitular(idTitular: number) {
    this.boletoService.buscarPorTitular(idTitular).subscribe((resposta: any) => {
      this.boletos = resposta as Boleto[];
    }, (error: any) => {
      console.log(error);
      alert('erro Titular.' + error);
    });
  }

  buscar(id: number) {
    this.boletoService.buscar(id).subscribe((resposta: any) => {
      this.boleto = resposta as Boleto;
      this.boleto.apartamento.id
      this.apartamentos.forEach(i=>{
        if(this.boleto.apartamento.id == i.value.id){
          this.boleto.apartamento = i.value;
        }
      });
    }, (error: any) => {
      console.log(error);
      alert('erro boletos.' + error);
    });
  }

  consultar() {
    this.boletoService.consultar().subscribe((resposta: any) => {
      this.boletos = resposta as Boleto[];
    }, (error: any) => {
      console.log(error);
      alert('erro boletos.' + error);
    });
  }

  novo() {
    const boleto = new Boleto();
    this.exibirModal(boleto);
  }

  exibirModal(boleto: Boleto) {
    this.novoRegistro = true;
    this.exibirDialog = true;
    this.boleto = boleto;
  }

  salvar() {
    console.log('salvar');
    this.boletoService.adicionar(this.boleto).subscribe((resposta: any) => {
      this.consultar();
      this.exibirDialog = false;
      this.novoRegistro = false;
      this.messageService.add({severity: 'success', summary: 'OK', detail: 'Registro adicionado com sucesso.'});
      this.router.navigate(['/boleto/faturamento/', this.boleto.faturamento.id]);
      }, (error: any) => {
        console.log(error);
        alert(error.ok);
      }
    );
  }

  atualizarValor(){
    let valor = this.boleto.valor != null ? this.boleto.valor : 0;
    let juros = this.boleto.juros != null ? this.boleto.juros : 0;
    let multa = this.boleto.multa != null ? this.boleto.multa : 0;
    this.boleto.total = Number(valor) + Number(juros) + Number(multa);
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
    this.boletoService.excluir(this.boleto).subscribe((resposta: any) => {
      this.consultar();
      this.exibirDialog = false;
      this.novoRegistro = false;
      this.messageService.add({severity: 'success', summary: 'OK', detail: 'Registro excluído com sucesso.'});
      this.router.navigate(['/boleto/faturamento/', this.boleto.faturamento.id]);
      }, (error: any) => alert('erro boletos.')
    );
  }

  aoSelecionar(event: any) {
    this.novoRegistro = false;
  }
  
  onSubmit(boletoForm: any) {

  }

}

