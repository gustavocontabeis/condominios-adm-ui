import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { BancoLancamentoAddComponent } from './banco-lancamento-add/banco-lancamento-add.component';
import { BancoLancamentoFilterComponent } from './banco-lancamento-filter/banco-lancamento-filter.component';
import { BancoLancamentoListComponent } from './banco-lancamento-list/banco-lancamento-list.component';
import { BancoLancamentoRoutingModule } from './banco-lancamento-routing.module';
import { BancoLancamentoService } from './banco-lancamento.service';

@NgModule({
  declarations: [BancoLancamentoAddComponent, BancoLancamentoFilterComponent, BancoLancamentoListComponent],
  imports: [
    CommonModule, FormsModule,
    ToastModule, PanelModule, TableModule, ButtonModule, DropdownModule, InputTextModule, ConfirmDialogModule,
    BancoLancamentoRoutingModule,
  ],
  providers: [MessageService, ConfirmationService, BancoLancamentoService]
})
export class BancoLancamentoModule { }

