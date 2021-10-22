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
import { BlocoService } from './bloco.service';

import { BlocoRoutingModule } from './bloco-routing.module';
import { BlocoAddComponent } from './bloco-add/bloco-add.component';
import { BlocoListComponent } from './bloco-list/bloco-list.component';

@NgModule({
  declarations: [BlocoAddComponent, BlocoListComponent],
  imports: [
    CommonModule, FormsModule,
    ToastModule, PanelModule, TableModule, ButtonModule, DropdownModule, InputTextModule, ConfirmDialogModule,
    BlocoRoutingModule,
  ],
  providers: [MessageService, ConfirmationService, BlocoService]
})
export class BlocoModule { }

