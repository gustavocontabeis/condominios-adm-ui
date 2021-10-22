import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { ApartamentoService } from './apartamento.service';

import { ApartamentoRoutingModule } from './apartamento-routing.module';
import { ApartamentoAddComponent } from './apartamento-add/apartamento-add.component';
import { ApartamentoListComponent } from './apartamento-list/apartamento-list.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [ApartamentoAddComponent, ApartamentoListComponent],
  imports: [
    CommonModule, FormsModule,
    ToastModule, PanelModule, TableModule, ButtonModule, DropdownModule, InputTextModule, ConfirmDialogModule,
    ApartamentoRoutingModule,
  ],
  providers: [MessageService, ConfirmationService, ApartamentoService]
})
export class ApartamentoModule { }

