import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/portfolio/init-page",
    pathMatch: "full"
  },
  {
    path: "portfolio",
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import("../app/layout/layout.module").then(m => m.LayoutModule)
      }
    ]
  },
  {
    path: "**",
    redirectTo: "/portfolio/init-page"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
