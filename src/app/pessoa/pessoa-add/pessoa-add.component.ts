import { Router, ActivatedRoute } from '@angular/router';
import { PessoaService } from '../pessoa.service';
import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../pessoa';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@Component({
  selector: 'app-pessoa-add',
  templateUrl: './pessoa-add.component.html',
  styleUrls: ['./pessoa-add.component.css']
})
export class PessoaAddComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();
  pessoas!: Pessoa[];
  exibirDialog!: boolean;
  novoRegistro!: boolean;

  generos: SelectItem[] = [];


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private pessoaService: PessoaService) { }

  ngOnInit() {
    this.exibirDialog = false;
    this.novoRegistro = false;
    this.pessoa = new Pessoa();

    this.generos = [{label: 'Selecione', value: null},
      {label: 'MASCULINO', value: 'MASCULINO'},
      {label: 'FEMININO', value: 'FEMININO'},
];

    this.activatedRoute.params.subscribe(params => {
      const id = params.id ? Number(params.id) : null;
      console.log(id);
      if (id != null) {
      console.log('contem id: ' + id);
        this.buscar(id);
      }
    });

  }
  

  buscar(id: number) {
    this.pessoaService.buscar(id).subscribe((resposta: any) => {
      this.pessoa = resposta as Pessoa;
    }, (error: any) => {
      console.log(error);
      alert('erro pessoas.' + error);
    });
  }

  consultar() {
    this.pessoaService.consultar().subscribe((resposta: any) => {
      this.pessoas = resposta as Pessoa[];
    }, (error: any) => {
      console.log(error);
      alert('erro pessoas.' + error);
    });
  }

  novo() {
    const pessoa = new Pessoa();
    this.exibirModal(pessoa);
  }

  exibirModal(pessoa: Pessoa) {
    this.novoRegistro = true;
    this.exibirDialog = true;
    this.pessoa = pessoa;
  }

  salvar() {
    console.log('salvar');
    this.pessoaService.adicionar(this.pessoa).subscribe((resposta: any) => {
      this.consultar();
      this.exibirDialog = false;
      this.novoRegistro = false;
      this.messageService.add({severity: 'success', summary: 'OK', detail: 'Registro adicionado com sucesso.'});
      this.router.navigate(['/pessoa/pessoa-list']);
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
    this.pessoaService.excluir(this.pessoa).subscribe((resposta: any) => {
      this.consultar();
      this.exibirDialog = false;
      this.novoRegistro = false;
      this.messageService.add({severity: 'success', summary: 'OK', detail: 'Registro excluído com sucesso.'});
      }, (error: any) => alert('erro pessoas.')
    );
  }

  aoSelecionar(event: any) {
    this.novoRegistro = false;
  }
  
  onSubmit(pessoaForm: any) {

  }

}

