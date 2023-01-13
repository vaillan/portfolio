import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreeGlobeComponent } from './three-globe/three-globe.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { NotauthorizedComponent } from './notauthorized/notauthorized.component';

@NgModule({
  declarations: [
    ThreeGlobeComponent,
    BreadcrumbComponent,
    LineChartComponent,
    BarChartComponent,
    NotauthorizedComponent,
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    AngularMaterialModule
  ],
  exports: [
    ThreeGlobeComponent,
    BreadcrumbComponent,
    LineChartComponent,
    BarChartComponent,
    NotauthorizedComponent,
  ]
})
export class SharedModule { }
