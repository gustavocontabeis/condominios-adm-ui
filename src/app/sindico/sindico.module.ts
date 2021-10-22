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
import { SindicoService } from './sindico.service';

import { SindicoRoutingModule } from './sindico-routing.module';
import { SindicoAddComponent } from './sindico-add/sindico-add.component';
import { SindicoListComponent } from './sindico-list/sindico-list.component';

@NgModule({
  declarations: [SindicoAddComponent, SindicoListComponent],
  imports: [
    CommonModule, FormsModule,
    ToastModule, PanelModule, TableModule, ButtonModule, DropdownModule, InputTextModule, ConfirmDialogModule,
    SindicoRoutingModule,
  ],
  providers: [MessageService, ConfirmationService, SindicoService]
})
export class SindicoModule { }

