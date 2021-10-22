import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Sindico } from '../sindico';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { Pessoa } from 'src/app/pessoa/pessoa';
import { SindicoService } from '../sindico.service';

@Component({
  selector: 'app-sindico-add',
  templateUrl: './sindico-add.component.html',
  styleUrls: ['./sindico-add.component.css']
})
export class SindicoAddComponent implements OnInit {

  sindico: Sindico = new Sindico();
  sindicos!: Sindico[];
  exibirDialog!: boolean;
  novoRegistro!: boolean;

  pessoas: SelectItem[] = [];


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private sindicoService: SindicoService, 
    private pessoaService: SindicoService) { }

  ngOnInit() {
    this.exibirDialog = false;
    this.novoRegistro = false;
    this.sindico = new Sindico();
  this.pessoas = [];

    this.buscarPessoa();

    this.activatedRoute.params.subscribe(params => {
      if (params.id_pessoa) {
        const idpessoa = params.id_pessoa ? Number(params.id_pessoa) : null;
        this.buscarSindicoPorPessoa(Number(idpessoa));
      } else {
        this.consultar();
      }
    });

  }
  
  buscarPessoa(){
    this.pessoaService.consultar().subscribe((resposta: any) => {
      const itens = resposta as Pessoa[];
      itens.forEach(element => {
         this.pessoas.push({label: element.nome, value: element});
      });
      }, (error: any) => {
        console.log(error);
        alert(error.ok);
      }
    );
  }

  buscarSindicoPorPessoa(idPessoa: number) {
    this.sindicoService.buscarPorPessoa(idPessoa).subscribe((resposta: any) => {
      this.sindicos = resposta as Sindico[];
    }, (error: any) => {
      console.log(error);
      alert('erro Pessoa.' + error);
    });
  }

  buscar(id: number) {
    this.sindicoService.buscar(id).subscribe((resposta: any) => {
      this.sindico = resposta as Sindico;
    }, (error: any) => {
      console.log(error);
      alert('erro sindicos.' + error);
    });
  }

  consultar() {
    this.sindicoService.consultar().subscribe((resposta: any) => {
      this.sindicos = resposta as Sindico[];
    }, (error: any) => {
      console.log(error);
      alert('erro sindicos.' + error);
    });
  }

  novo() {
    const sindico = new Sindico();
    this.exibirModal(sindico);
  }

  exibirModal(sindico: Sindico) {
    this.novoRegistro = true;
    this.exibirDialog = true;
    this.sindico = sindico;
  }

  salvar() {
    console.log('salvar');
    this.sindicoService.adicionar(this.sindico).subscribe((resposta: any) => {
      this.consultar();
      this.exibirDialog = false;
      this.novoRegistro = false;
      this.messageService.add({severity: 'success', summary: 'OK', detail: 'Registro adicionado com sucesso.'});
      this.router.navigate(['/sindico/sindico-list']);
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
    this.sindicoService.excluir(this.sindico).subscribe((resposta: any) => {
      this.consultar();
      this.exibirDialog = false;
      this.novoRegistro = false;
      this.messageService.add({severity: 'success', summary: 'OK', detail: 'Registro excluído com sucesso.'});
      }, (error: any) => alert('erro sindicos.')
    );
  }

  aoSelecionar(event: any) {
    this.novoRegistro = false;
  }
  
  onSubmit(sindicoForm: any) {

  }

}

