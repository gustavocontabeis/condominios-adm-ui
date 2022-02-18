import { Router, ActivatedRoute } from '@angular/router';
import { CaixaService } from '../caixa.service';
import { Component, OnInit } from '@angular/core';
import { Caixa } from '../caixa';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CondominioService } from 'src/app/condominio/condominio.service';
import { PessoaService } from 'src/app/pessoa/pessoa.service';
import { CentroDeCustoService } from 'src/app/centro-de-custo/centro-de-custo.service';
import { Condominio } from 'src/app/condominio/condominio';
import { Pessoa } from 'src/app/pessoa/pessoa';
import { CentroDeCusto } from 'src/app/centro-de-custo/centro-de-custo';

@Component({
  selector: 'app-caixa-add',
  templateUrl: './caixa-add.component.html',
  styleUrls: ['./caixa-add.component.css']
})
export class CaixaAddComponent implements OnInit {

  caixa: Caixa = new Caixa();
  caixas!: Caixa[];
  exibirDialog!: boolean;
  novoRegistro!: boolean;

  condominios: SelectItem[] = [];
  pessoas: SelectItem[] = [];
  centroDeCustos: SelectItem[] = [];
  tipoDocumentos: SelectItem[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private caixaService: CaixaService,
    private condominioService: CondominioService,
    private pessoaService: PessoaService,
    private centroDeCustoService: CentroDeCustoService) { }

    async ngOnInit() {
    this.exibirDialog = false;
    this.novoRegistro = false;
    this.caixa = new Caixa();
    this.condominios = [];
    this.pessoas = [];
    this.centroDeCustos = [];
    this.tipoDocumentos = [
      { label: 'Selecione', value: null },
      { label: 'NOTA FISCAL', value: 'NOTA_FISCAL' },
      { label: 'RECIBO', value: 'RECIBO' },
      { label: 'NENHUM', value: 'NENHUM' },
    ];

    await this.buscarCondominio();
    await this.buscarPessoa();
    await this.buscarCentroDeCusto();

    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      if (params.id) {
        const id = params.id ? Number(params.id) : null;
        this.buscar(Number(id));
      } else if (params.id_condominio) {
        const idcondominio = params.id_condominio ? Number(params.id_condominio) : null;
        console.log(idcondominio);
        console.log(this.condominios);
        this.condominios.forEach(c=>{
          if(c.value.id == idcondominio){
            this.caixa.condominio = c.value;
          }
        });
        this.buscarSaldo();
      } else if (params.id_pessoa) {
        const idpessoa = params.id_pessoa ? Number(params.id_pessoa) : null;
        this.buscarCaixaPorPessoa(Number(idpessoa));
      } else if (params.id_centroDeCusto) {
        const idcentroDeCusto = params.id_centroDeCusto ? Number(params.id_centroDeCusto) : null;
        this.buscarCaixaPorCentroDeCusto(Number(idcentroDeCusto));
      } else {
        this.consultar();
      }
    });

  }

  async buscarCondominio() {
    console.log('buscarCondominio');
    this.condominioService.consultar().subscribe((resposta: any) => {
      const itens = resposta as Condominio[];
      itens.forEach(element => {
        this.condominios.push({ label: element.nome, value: element });
      });
      //seleciona o consominio do parametro
      this.activatedRoute.params.subscribe(params => {
        if (params.id_condominio) {
          const idcondominio = params.id_condominio ? Number(params.id_condominio) : null;
          this.condominios.forEach(c=>{
            if(c.value.id == idcondominio){
              this.caixa.condominio = c.value;
            }
          });
        }
      });
    }, (error: any) => {
      console.log(error);
      alert(error.ok);
    }
    );
  }

  async buscarPessoa() {
    this.pessoaService.consultar().subscribe((resposta: any) => {
      const itens = resposta as Pessoa[];
      itens.forEach(element => {
        this.pessoas.push({ label: element.nome, value: element });
      });
    }, (error: any) => {
      console.log(error);
      alert(error.ok);
    }
    );
  }

  async buscarCentroDeCusto() {
    this.centroDeCustoService.consultar().subscribe((resposta: any) => {
      const itens = resposta as CentroDeCusto[];
      itens.forEach(element => {
        this.centroDeCustos.push({ label: element.nome, value: element });
      });
    }, (error: any) => {
      console.log(error);
      alert(error.ok);
    }
    );
  }

  buscarCaixaPorCondominio(idCondominio: number) {
    this.caixaService.buscarPorCondominio(idCondominio).subscribe((resposta: any) => {
      this.caixas = resposta as Caixa[];
      console.log(this.caixas);
    }, (error: any) => {
      console.log(error);
      alert('erro Condominio.' + error);
    });
  }

  buscarCaixaPorPessoa(idPessoa: number) {
    this.caixaService.buscarPorPessoa(idPessoa).subscribe((resposta: any) => {
      this.caixas = resposta as Caixa[];
    }, (error: any) => {
      console.log(error);
      alert('erro Pessoa.' + error);
    });
  }

  buscarCaixaPorCentroDeCusto(idCentroDeCusto: number) {
    this.caixaService.buscarPorCentroDeCusto(idCentroDeCusto).subscribe((resposta: any) => {
      this.caixas = resposta as Caixa[];
    }, (error: any) => {
      console.log(error);
      alert('erro CentroDeCusto.' + error);
    });
  }

  buscar(id: number) {
    this.caixaService.buscar(id).subscribe((resposta: any) => {
      this.caixa = resposta as Caixa;
    }, (error: any) => {
      console.log(error);
      alert('erro caixas.' + error);
    });
  }

  consultar() {
    this.caixaService.consultar().subscribe((resposta: any) => {
      this.caixas = resposta as Caixa[];
    }, (error: any) => {
      console.log(error);
      alert('erro caixas.' + error);
    });
  }

  novo() {
    const caixa = new Caixa();
    this.exibirModal(caixa);
  }

  exibirModal(caixa: Caixa) {
    this.novoRegistro = true;
    this.exibirDialog = true;
    this.caixa = caixa;
  }

  salvar() {
    console.log('salvar');
    this.caixaService.adicionar(this.caixa).subscribe((resposta: any) => {
      this.consultar();
      this.exibirDialog = false;
      this.novoRegistro = false;
      this.messageService.add({ severity: 'success', summary: 'OK', detail: 'Registro adicionado com sucesso.' });
      this.router.navigate(['/caixa/caixa-list']);
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
        this.messageService.add({ severity: 'success', summary: 'Cancelado', detail: 'Ok. Cancelado.' });
      }
    });
  }

  excluir() {
    console.log('excluir');
    this.caixaService.excluir(this.caixa).subscribe((resposta: any) => {
      this.consultar();
      this.exibirDialog = false;
      this.novoRegistro = false;
      this.messageService.add({ severity: 'success', summary: 'OK', detail: 'Registro excluído com sucesso.' });
    }, (error: any) => alert('erro caixas.')
    );
  }

  buscarSaldo(){
    this.caixaService.ultimo(this.caixa.condominio.id).subscribe((resposta: any) => {
      let res = resposta as Caixa[];
      console.log(resposta);
      if(res.length == 0){
        this.caixa.saldo = 0;
      }else{
        this.caixa.data = res[0].data;
        if(this.caixa.fluxo == 'ENTRADA'){
          this.caixa.saldo = res[0].saldo + this.caixa.valor;
        }else{
          this.caixa.saldo = res[0].saldo - this.caixa.valor;
        }
      }
    }, (error: any) => alert('erro caixas.')
    );
  }

  aoSelecionar(event: any) {
    this.novoRegistro = false;
  }

  onSubmit(caixaForm: any) {

  }

}

