import { Router, ActivatedRoute } from '@angular/router';
import { ApartamentoService } from '../apartamento.service';
import { Component, OnInit } from '@angular/core';
import { Apartamento } from '../apartamento';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BlocoService } from 'src/app/bloco/bloco.service';
import { Pessoa } from 'src/app/pessoa/pessoa';
import { Bloco } from 'src/app/bloco/bloco';
import { PessoaService } from 'src/app/pessoa/pessoa.service';

@Component({
  selector: 'app-apartamento-add',
  templateUrl: './apartamento-add.component.html',
  styleUrls: ['./apartamento-add.component.css']
})
export class ApartamentoAddComponent implements OnInit {

  apartamento: Apartamento = new Apartamento();
  apartamentos!: Apartamento[];
  exibirDialog!: boolean;
  novoRegistro!: boolean;

  moradores: SelectItem[] = [];
  blocos: SelectItem[] = [];
  proprietarios: SelectItem[] = [];
  titulares: SelectItem[] = [];


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private apartamentoService: ApartamentoService, 
    private blocoService: BlocoService, 
    private pessoaService: PessoaService) { }

  ngOnInit() {
    this.exibirDialog = false;
    this.novoRegistro = false;
    this.apartamento = new Apartamento();
  this.moradores = [];
  this.blocos = [];
  this.proprietarios = [];
  this.titulares = [];

    this.buscarBloco();
    this.buscarPessoa();

    this.activatedRoute.params.subscribe(params => {
      if (params.id_bloco) {
        const idbloco = params.id_bloco ? Number(params.id_bloco) : null;
        this.buscarblocoPorId(Number(idbloco));
        //this.buscarApartamentoPorBloco(Number(idbloco));
      } else  if (params.id_proprietario) {
        const idproprietario = params.id_proprietario ? Number(params.id_proprietario) : null;
        this.buscarApartamentoPorProprietario(Number(idproprietario));
      } else if (params.id_titular) {
        const idtitular = params.id_titular ? Number(params.id_titular) : null;
        this.buscarApartamentoPorTitular(Number(idtitular));
      } else if (params.id) {
        const id = params.id ? Number(params.id) : null;
        this.buscar(Number(id));
      } else {
        this.consultar();
      }
    });

  }
  
  buscarblocoPorId(id: number){
    this.blocoService.buscar(id).subscribe((resposta: Bloco) => {
      this.blocos.push({label: resposta.nome, value: resposta});
      this.apartamento.bloco = resposta;
      }, (error: any) => {
        console.log(error);
        alert(error.ok);
      }
    );
  }
  buscarBloco(){
    this.blocoService.consultar().subscribe((resposta: any) => {
      const itens = resposta as Bloco[];
      itens.forEach(element => {
         this.blocos.push({label: element.nome, value: element});
         let item = element as Bloco;
         if(this.apartamento.bloco && this.apartamento.bloco.id == item.id){
          this.apartamento.bloco = item;
         }
      });
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
        this.proprietarios.push({label: element.nome, value: element});
      });
      }, (error: any) => {
        console.log(error);
        alert(error.ok);
      }
    );
  }

  buscarApartamentoPorBloco(idBloco: number) {
    this.apartamentoService.buscarPorBloco(idBloco).subscribe((resposta: any) => {
      this.apartamentos = resposta as Apartamento[];
    }, (error: any) => {
      console.log(error);
      alert('erro Bloco.' + error);
    });
  }

  buscarApartamentoPorProprietario(idProprietario: number) {
    this.apartamentoService.buscarPorProprietario(idProprietario).subscribe((resposta: any) => {
      this.apartamentos = resposta as Apartamento[];
    }, (error: any) => {
      console.log(error);
      alert('erro Proprietario.' + error);
    });
  }

  buscarApartamentoPorTitular(idTitular: number) {
    this.apartamentoService.buscarPorTitular(idTitular).subscribe((resposta: any) => {
      this.apartamentos = resposta as Apartamento[];
    }, (error: any) => {
      console.log(error);
      alert('erro Titular.' + error);
    });
  }

  buscar(id: number) {
    this.apartamentoService.buscar(id).subscribe((resposta: any) => {
      this.apartamento = resposta as Apartamento;
    }, (error: any) => {
      console.log(error);
      alert('erro apartamentos.' + error);
    });
  }

  consultar() {
    this.apartamentoService.consultar().subscribe((resposta: any) => {
      this.apartamentos = resposta as Apartamento[];
    }, (error: any) => {
      console.log(error);
      alert('erro apartamentos.' + error);
    });
  }

  novo() {
    const apartamento = new Apartamento();
    this.exibirModal(apartamento);
  }

  exibirModal(apartamento: Apartamento) {
    this.novoRegistro = true;
    this.exibirDialog = true;
    this.apartamento = apartamento;
  }

  salvar() {
    console.log('salvar');
    this.apartamentoService.adicionar(this.apartamento).subscribe((resposta: any) => {
      this.consultar();
      this.exibirDialog = false;
      this.novoRegistro = false;
      this.messageService.add({severity: 'success', summary: 'OK', detail: 'Registro adicionado com sucesso.'});
      this.router.navigate(['/apartamento/bloco/', this.apartamento.bloco.id]);
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
    this.apartamentoService.excluir(this.apartamento).subscribe((resposta: any) => {
      this.consultar();
      this.exibirDialog = false;
      this.novoRegistro = false;
      this.messageService.add({severity: 'success', summary: 'OK', detail: 'Registro excluído com sucesso.'});
      }, (error: any) => alert('erro apartamentos.')
    );
  }

  aoSelecionar(event: any) {
    this.novoRegistro = false;
  }
  
  onSubmit(apartamentoForm: any) {

  }

}

