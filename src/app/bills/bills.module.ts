import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingModule } from 'ngx-loading';

// components
import { AddTagComponent } from './add/add-tag.component';
import { BillsRoutingModule } from './bills-routing.module';

import { BillsListComponent } from './list/bills-list.component';
import { JobTagsListComponent } from './list/job-tag-list.component';
import { AddBillComponent } from './add/add-bill.component';
import { Ng2CompleterModule } from 'ng2-completer';


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
        BillsRoutingModule,
        LoadingModule,
        NgbModule,
        NgbModalModule.forRoot(),
        NgbDatepickerModule.forRoot(),
        NgxDatatableModule,
        Ng2CompleterModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        BillsListComponent,
        JobTagsListComponent,
        AddTagComponent,
        AddBillComponent,

    ]

})
export class BillModule { }
