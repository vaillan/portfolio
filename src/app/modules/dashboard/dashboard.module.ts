import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BreadcrumbModule } from 'xng-breadcrumb';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    BreadcrumbModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class DashboardModule { }
