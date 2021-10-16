import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CentroDeCusto } from '../centro-de-custo';
import { CentroDeCustoService } from '../centro-de-custo.service';

@Component({
  selector: 'app-centro-de-custo-add',
  templateUrl: './centro-de-custo-add.component.html',
  styleUrls: ['./centro-de-custo-add.component.css']
})
export class CentroDeCustoAddComponent implements OnInit {

  centroDeCusto: CentroDeCusto = new CentroDeCusto();
  centroDeCustos!: CentroDeCusto[];
  exibirDialog!: boolean;
  novoRegistro!: boolean;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private centroDeCustoService: CentroDeCustoService) { }

  ngOnInit() {

    console.log('::::::::::::::::::::::::::::::::::::');
    console.log('::::::::::::::::::::::::::::::::::::');
    console.log('::::::::::::::::::::::::::::::::::::');
    console.log('::::::::::::::::::::::::::::::::::::');
    console.log('::::::::::::::::::::::::::::::::::::');
    console.log('::::::::::::::::::::::::::::::::::::');
    console.log('::::::::::::::::::::::::::::::::::::');
    
    this.exibirDialog = false;
    this.novoRegistro = false;
    this.centroDeCusto = new CentroDeCusto();


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
    this.centroDeCustoService.buscar(id).subscribe((resposta: CentroDeCusto) => {
      this.centroDeCusto = resposta as CentroDeCusto;
    }, (error:any) => {
      console.log(error);
      alert('erro centroDeCustos.' + error);
    });
  }

  consultar() {
    this.centroDeCustoService.consultar().subscribe((resposta: CentroDeCusto[]) => {
      this.centroDeCustos = resposta as CentroDeCusto[];
    }, (error:any) => {
      console.log(error);
      alert('erro centroDeCustos.' + error);
    });
  }

  novo() {
    const centroDeCusto = new CentroDeCusto();
    this.exibirModal(centroDeCusto);
  }

  exibirModal(centroDeCusto: CentroDeCusto) {
    this.novoRegistro = true;
    this.exibirDialog = true;
    this.centroDeCusto = centroDeCusto;
  }

  salvar() {
    console.log('salvar');
    this.centroDeCustoService.adicionar(this.centroDeCusto).subscribe((resposta: CentroDeCusto) => {
      this.consultar();
      this.exibirDialog = false;
      this.novoRegistro = false;
      this.messageService.add({severity: 'success', summary: 'OK', detail: 'Registro adicionado com sucesso.'});
      this.router.navigate(['/centro-de-custo/centro-de-custo-list']);
      }, (error:any) => {
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
    this.centroDeCustoService.excluir(this.centroDeCusto).subscribe((resposta: CentroDeCusto) => {
      this.consultar();
      this.exibirDialog = false;
      this.novoRegistro = false;
      this.messageService.add({severity: 'success', summary: 'OK', detail: 'Registro excluído com sucesso.'});
      }, (error:any) => alert('erro centroDeCustos.')
    );
  }

  aoSelecionar(event: any) {
    this.novoRegistro = false;
  }
  
  onSubmit(centroDeCustoForm: any) {

  }

}

