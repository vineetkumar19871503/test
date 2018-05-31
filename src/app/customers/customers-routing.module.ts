import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditCustomerComponent } from './edit/edit-customer.component';

const routes: Routes = [
  {
    path: '',
    children: [
      // {
      //   path: 'add',
      //   component: EditCustomerComponent,
      //   data: {
      //     title: 'Add Job'
      //   }
      // },
      {
        path: 'edit/:id',
        component: EditCustomerComponent,
        data: {
          title: 'Edit Job'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule { }
