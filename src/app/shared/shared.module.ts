import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreeGlobeComponent } from './three-globe/three-globe.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [
    ThreeGlobeComponent,
    BreadcrumbComponent,
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    AngularMaterialModule
  ],
  exports: [
    ThreeGlobeComponent,
    BreadcrumbComponent,
  ]
})
export class SharedModule { }
