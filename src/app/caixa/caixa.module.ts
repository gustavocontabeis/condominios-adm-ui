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
import { CaixaService } from './caixa.service';
import { NgxCurrencyModule } from "ngx-currency";

import { CaixaRoutingModule } from './caixa-routing.module';
import { CaixaAddComponent } from './caixa-add/caixa-add.component';
import { CaixaFilterComponent } from './caixa-filter/caixa-filter.component';
import { CaixaListComponent } from './caixa-list/caixa-list.component';

@NgModule({
  declarations: [CaixaAddComponent, CaixaFilterComponent, CaixaListComponent],
  imports: [
    CommonModule, FormsModule,
    ToastModule, PanelModule, TableModule, ButtonModule, DropdownModule, InputTextModule, ConfirmDialogModule,
    CaixaRoutingModule, InputMaskModule, NgxCurrencyModule
  ],
  providers: [MessageService, ConfirmationService, CaixaService]
})
export class CaixaModule { }

