import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAdminComponent } from './user-admin.component';

const routes: Routes = [
  {
    path: '',
    component: UserAdminComponent,
    data: {
      breadcrumb: 'Sign in',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAdminRoutingModule { }
