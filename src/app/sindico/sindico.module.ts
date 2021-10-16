import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SindicoRoutingModule } from './sindico-routing.module';
import { SindicoAddComponent } from './sindico-add/sindico-add.component';
import { SindicoListComponent } from './sindico-list/sindico-list.component';


@NgModule({
  declarations: [
    SindicoAddComponent,
    SindicoListComponent
  ],
  imports: [
    CommonModule,
    SindicoRoutingModule
  ]
})
export class SindicoModule { }
