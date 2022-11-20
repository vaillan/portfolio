import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'page',
    children: [
      {
        path: '',
        loadChildren: () => import("../modules/init/init.module").then(m => m.InitModule),
      },
      {
        path: 'projects',
        loadChildren: () => import("../modules/projects/projects.module").then(m => m.ProjectsModule)
      },
    ],
    data: {
      breadcrumb: 'Init page',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
