import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAdminComponent } from './user-admin.component';

const routes: Routes = [
  {
    path: 'login',
    component: UserAdminComponent,
    data: {
      breadcrumb: 'Login',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAdminRoutingModule { }
