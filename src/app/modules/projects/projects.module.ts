import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThreeGlobeProjectComponent } from './three-globe-project/three-globe-project.component';
import { DegreeProjectComponent } from './degree-project/degree-project.component';
import { DataAnalitysProjectComponent } from './data-analitys-project/data-analitys-project.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    ThreeGlobeProjectComponent,
    DegreeProjectComponent,
    DataAnalitysProjectComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    BreadcrumbModule,
    AngularMaterialModule,
    SharedModule,
  ]
})
export class ProjectsModule { }
