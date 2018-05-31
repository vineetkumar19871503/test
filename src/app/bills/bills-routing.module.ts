import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillsListComponent } from './list/bills-list.component';
import { JobTagsListComponent } from './list/job-tag-list.component';
import { AddTagComponent } from './add/add-tag.component';
import { AddBillComponent } from './add/add-bill.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: BillsListComponent,
        data: {
          title: 'Bills List'
        }
      },
      {
        path: 'tagsListByJobId/:id/:date/:cid',
        component: JobTagsListComponent,
        data: {
          title: 'Tags List'
        }
      },
      {
        path: 'tag/add/:id/:date/:customer_id',
        component: AddTagComponent,
        data: {
          title: 'Add Tag'
        }
      },
      {
        path: 'addbill/:id',
        component: AddBillComponent,
        data: {
          title: 'Add Bill'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillsRoutingModule { }
