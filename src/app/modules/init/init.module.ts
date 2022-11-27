import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitRoutingModule } from './init-routing.module';
import { InitComponent } from './init.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    InitComponent
  ],
  imports: [
    CommonModule,
    InitRoutingModule,
    BreadcrumbModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class InitModule { }
