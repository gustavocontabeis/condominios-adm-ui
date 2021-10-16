import { Router, ActivatedRoute } from '@angular/router';
import { CondominioService } from '../condominio.service';
import { Component, OnInit } from '@angular/core';
import { Condominio } from '../condominio';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SindicoService } from 'src/app/sindico/sindico.service';
import { BlocoService } from 'src/app/bloco/bloco.service';
import { FaturamentoService } from 'src/app/faturamento/faturamento.service';
import { Sindico } from 'src/app/sindico/sindico';
import { Bloco } from 'src/app/bloco/bloco';
import { Faturamento } from 'src/app/faturamento/faturamento';
import { SindicoModule } from 'src/app/sindico/sindico.module';

@Component({
  selector: 'app-condominio-add',
  templateUrl: './condominio-add.component.html',
  styleUrls: ['./condominio-add.component.css']
})
export class CondominioAddComponent implements OnInit {

  condominio: Condominio = new Condominio();
  condominios!: Condominio[];
  exibirDialog!: boolean;
  novoRegistro!: boolean;

  sindicos: SelectItem[] = [];
  blocos: SelectItem[] = [];
  faturamentos: SelectItem[] = [];


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private condominioService: CondominioService,
    private sindicoService: SindicoService,
    private blocosService: BlocoService,
    private faturamentosService: FaturamentoService) { }

  ngOnInit() {
    this.exibirDialog = false;
    this.novoRegistro = false;
    this.condominio = new Condominio();
    this.condominio.sindico = new Sindico();
    
    this.sindicos = [];
    this.blocos = [];
    this.faturamentos = [];

    this.buscarSindico();
    this.buscarBlocos();
    this.buscarFaturamentos();

    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      
      if (params.id) {
        const id = params.id ? Number(params.id) : null;
        this.buscar(Number(id));
      } else if (params.id_sindico) {
        const idsindico = params.id_sindico ? Number(params.id_sindico) : null;
        this.buscarCondominioPorSindico(Number(idsindico));
      } else {
        this.consultar();
      }
    });

  }

  buscarSindico() {
    this.sindicoService.consultar().subscribe((resposta: any) => {
      const itens = resposta as Sindico[];
      console.log('buscarSindico()');
      console.log(resposta);
      itens.forEach((element: Sindico) => {
        this.sindicos.push({ label: String(element.pessoa.nome), value: element });
      });
    }, (error: any) => {
      console.log(error);
      alert(error.ok);
    }
    );
  }
  buscarBlocos() {
    // this.blocosService.consultar().subscribe((resposta: any) => {
    //   const itens = resposta as Bloco[];
    //   itens.forEach(element => {
    //      this.blocos.push({label: element.nome, value: element});
    //   });
    //   }, (error: any) => {
    //     console.log(error);
    //     alert(error.ok);
    //   }
    // );
  }
  buscarFaturamentos() {
    this.faturamentosService.consultar().subscribe((resposta: any) => {
      const itens = resposta as Faturamento[];
      itens.forEach((element: Faturamento) => {
        this.faturamentos.push({ label: element.periodo, value: element });
      });
    }, (error: any) => {
      console.log(error);
      alert(error.ok);
    }
    );
  }

  buscarCondominioPorSindico(idSindico: number) {
    this.condominioService.buscarPorSindico(idSindico).subscribe((resposta: any) => {
      this.condominios = resposta as Condominio[];
    }, (error: any) => {
      console.log(error);
      alert('erro Sindico.' + error);
    });
  }

  buscar(id: number) {
    this.condominioService.buscar(id).subscribe((resposta: any) => {
      this.condominio = resposta as Condominio;
    }, (error: any) => {
      console.log(error);
      alert('erro condominios.' + error);
    });
  }

  consultar() {
    this.condominioService.consultar().subscribe((resposta: any) => {
      console.log(resposta);
      this.condominios = resposta as Condominio[];
    }, (error: any) => {
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
    this.condominioService.adicionar(this.condominio).subscribe((resposta: any) => {
      this.consultar();
      this.exibirDialog = false;
      this.novoRegistro = false;
      this.messageService.add({ severity: 'success', summary: 'OK', detail: 'Registro adicionado com sucesso.' });
      this.router.navigate(['/condominio/condominio-list']);
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
    this.condominioService.excluir(this.condominio).subscribe((resposta: any) => {
      this.consultar();
      this.exibirDialog = false;
      this.novoRegistro = false;
      this.messageService.add({ severity: 'success', summary: 'OK', detail: 'Registro excluído com sucesso.' });
    }, (error: any) => alert('erro condominios.')
    );
  }

  aoSelecionar(event: any) {
    this.novoRegistro = false;
  }

  onSubmit(condominioForm: any) {

  }

}

