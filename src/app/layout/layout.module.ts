import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    AngularMaterialModule
  ],
})
export class LayoutModule { }
