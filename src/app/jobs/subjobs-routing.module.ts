import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSubjobComponent } from './add/add-subjob.component';
import { SubjobsListComponent } from './list/subjobs-list.component';
import { EditSubjobComponent } from './add/edit-subjob.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'add/:job_id',
        component: AddSubjobComponent,
        data: {
          title: 'Add Job'
        }
      },
      {
        path: 'edit/:job_id',
        component: EditSubjobComponent,
        data: {
          title: 'Add Job'
        }
      },
      {
        path: 'list',
        component: SubjobsListComponent,
        data: {
          title: 'Sub Jobs'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjobsRoutingModule { }
