import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingModule } from 'ngx-loading';

// components
import { AddJobComponent } from './add/add-job.component';
import { JobsListComponent } from './list/jobs-list.component';
import { AssignJobComponent } from './assign/assign-job.component';
import { DispatchJobComponent } from './dispatch/dispatch-job.component';
import { JobsRoutingModule } from './jobs-routing.module';
import { CustomerJobsComponent } from './list/customer-jobs.component';
import { SubJobsComponent } from './list/sub-jobs.component';


// date and time picker modules
import { NgbModalModule, NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

// google map module
import { AgmCoreModule } from '@agm/core';

// form modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// table modules
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        // google map configuration
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBr5_picK8YJK7fFR2CPzTVMj6GG1TtRGo',
            libraries: ['places']
        }),
        CommonModule,
        FormsModule,
        JobsRoutingModule,
        LoadingModule,
        NgbModule,
        NgbModalModule.forRoot(),
        NgbDatepickerModule.forRoot(),
        NgxDatatableModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        AssignJobComponent,
        AddJobComponent,
        JobsListComponent,
        DispatchJobComponent,
        CustomerJobsComponent,
        SubJobsComponent
    ]
})
export class JobModule { }
