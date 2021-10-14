import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { FaturamentoService } from './faturamento.service';

import { FaturamentoRoutingModule } from './faturamento-routing.module';
import { FaturamentoAddComponent } from './faturamento-add/faturamento-add.component';
import { FaturamentoListComponent } from './faturamento-list/faturamento-list.component';

@NgModule({
  declarations: [FaturamentoAddComponent, FaturamentoListComponent],
  imports: [
    CommonModule, FormsModule,
    ToastModule, PanelModule, TableModule, ButtonModule,
    FaturamentoRoutingModule,
  ],
  providers: [MessageService, ConfirmationService, FaturamentoService]
})
export class FaturamentoModule { }

