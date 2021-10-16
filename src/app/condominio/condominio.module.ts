import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { CondominioService } from './condominio.service';

import { CondominioRoutingModule } from './condominio-routing.module';
import { CondominioAddComponent } from './condominio-add/condominio-add.component';
import { CondominioFilterComponent } from './condominio-filter/condominio-filter.component';
import { CondominioListComponent } from './condominio-list/condominio-list.component';


@NgModule({
  declarations: [
    CondominioAddComponent,
    CondominioFilterComponent,
    CondominioListComponent
  ],
  imports: [
    CommonModule, FormsModule,
    ToastModule, PanelModule, TableModule, ButtonModule, DropdownModule, InputTextModule,
    CondominioRoutingModule,
  ],
  providers: [MessageService, ConfirmationService, CondominioService]
})
export class CondominioModule { }
