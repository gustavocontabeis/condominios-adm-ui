import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { MoradorService } from './morador.service';

import { MoradorRoutingModule } from './morador-routing.module';
import { MoradorAddComponent } from './morador-add/morador-add.component';
import { MoradorListComponent } from './morador-list/morador-list.component';

@NgModule({
  declarations: [MoradorAddComponent, MoradorListComponent],
  imports: [
    CommonModule, FormsModule,
    ToastModule, PanelModule, TableModule, ButtonModule,
    MoradorRoutingModule,
  ],
  providers: [MessageService, ConfirmationService, MoradorService]
})
export class MoradorModule { }

