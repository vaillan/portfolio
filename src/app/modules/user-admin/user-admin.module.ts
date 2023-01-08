import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAdminRoutingModule } from './user-admin-routing.module';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';

//Components
import { UserAdminComponent } from './user-admin.component';

@NgModule({
  declarations: [
    UserAdminComponent
  ],
  imports: [
    CommonModule,
    UserAdminRoutingModule,
    BreadcrumbModule,
    AngularMaterialModule,
    SharedModule,
  ]
})
export class UserAdminModule { }
