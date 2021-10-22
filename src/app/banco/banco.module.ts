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
import { BancoService } from './banco.service';

import { BancoRoutingModule } from './banco-routing.module';
import { BancoAddComponent } from './banco-add/banco-add.component';
import { BancoFilterComponent } from './banco-filter/banco-filter.component';
import { BancoListComponent } from './banco-list/banco-list.component';

@NgModule({
  declarations: [BancoAddComponent, BancoFilterComponent, BancoListComponent],
  imports: [
    CommonModule, FormsModule,
    ToastModule, PanelModule, TableModule, ButtonModule, DropdownModule, InputTextModule, ConfirmDialogModule,
    BancoRoutingModule,
  ],
  providers: [MessageService, ConfirmationService, BancoService]
})
export class BancoModule { }

