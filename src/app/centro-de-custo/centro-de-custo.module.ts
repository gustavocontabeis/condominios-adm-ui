import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { CentroDeCustoAddComponent } from './centro-de-custo-add/centro-de-custo-add.component';
import { CentroDeCustoListComponent } from './centro-de-custo-list/centro-de-custo-list.component';
import { CentroDeCustoRoutingModule } from './centro-de-custo-routing.module';
import { CentroDeCustoService } from './centro-de-custo.service';


@NgModule({
  declarations: [CentroDeCustoAddComponent, CentroDeCustoListComponent],
  imports: [
    CommonModule, FormsModule,
    ToastModule, PanelModule, TableModule, ButtonModule,
    CentroDeCustoRoutingModule,
  ],
  providers: [MessageService, ConfirmationService, CentroDeCustoService]
})
export class CentroDeCustoModule { }

