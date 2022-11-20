import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'projects',
    loadChildren: () => import("../modules/projects/projects.module").then(m => m.ProjectsModule)
  },
  {
    path: 'init-page',
    loadChildren: () => import("../modules/init/init.module").then(m => m.InitModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
