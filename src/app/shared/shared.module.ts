import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreeGlobeComponent } from './three-globe/three-globe.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    ThreeGlobeComponent,
    BreadcrumbComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    AngularMaterialModule
  ],
  exports: [
    ThreeGlobeComponent,
    BreadcrumbComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
