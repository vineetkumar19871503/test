import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddJobComponent } from './add/add-job.component';
import { JobsListComponent } from './list/jobs-list.component';
import { CustomerJobsComponent } from './list/customer-jobs.component';
import { SubJobsComponent } from './list/sub-jobs.component';

// import { RunningJobsComponent } from './list/running-jobs.component';

import { AssignJobComponent } from './assign/assign-job.component';
import { DispatchJobComponent } from './dispatch/dispatch-job.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'add/:id',
        component: AddJobComponent,
        data: {
          title: 'Add Job'
        }
      },
      {
        path: 'list',
        component: JobsListComponent,
        data: {
          title: 'Jobs'
        }
      },
      {
        path: 'add/:id',
        component: AddJobComponent,
        data: {
          title: 'Add Job'
        }
      },
      {
        path: 'dispatch',
        component: DispatchJobComponent,
        data: {
          title: 'Dispatch Job'
        }
      },
      {
        path: 'assign/:job_id',
        component: AssignJobComponent,
        data: {
          title: 'Assign Job'
        }
      },
      {
        path: 'jobsListByCustomerId/:id',
        component: CustomerJobsComponent,
        data: {
          title: 'Customer Jobs'
        }
      },
      {
        path: 'SubjobsListByJobId/:id',
        component: SubJobsComponent,
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
export class JobsRoutingModule { }
