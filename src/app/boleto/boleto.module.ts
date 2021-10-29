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
import { InputMaskModule } from 'primeng/inputmask';

import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { BoletoService } from './boleto.service';

import { BoletoRoutingModule } from './boleto-routing.module';
import { BoletoAddComponent } from './boleto-add/boleto-add.component';
import { BoletoListComponent } from './boleto-list/boleto-list.component';

@NgModule({
  declarations: [BoletoAddComponent, BoletoListComponent],
  imports: [
    CommonModule, FormsModule,
    ToastModule, PanelModule, TableModule, ButtonModule, DropdownModule, InputTextModule, ConfirmDialogModule, InputMaskModule,
    BoletoRoutingModule,
  ],
  providers: [MessageService, ConfirmationService, BoletoService]
})
export class BoletoModule { }

