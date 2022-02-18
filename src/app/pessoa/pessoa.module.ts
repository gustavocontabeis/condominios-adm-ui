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
import { NgxCurrencyModule } from "ngx-currency";
import { RadioButtonModule } from 'primeng/radiobutton';
import { PessoaRoutingModule } from './pessoa-routing.module';
import { PessoaAddComponent } from './pessoa-add/pessoa-add.component';
import { PessoaListComponent } from './pessoa-list/pessoa-list.component';


@NgModule({
  declarations: [PessoaAddComponent, PessoaListComponent],
  imports: [
    CommonModule, FormsModule,
    ToastModule, PanelModule, TableModule, ButtonModule, DropdownModule, InputTextModule, ConfirmDialogModule,
    InputMaskModule, NgxCurrencyModule, RadioButtonModule,
    PessoaRoutingModule
  ]
})
export class PessoaModule { }
