import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingModule } from 'ngx-loading';

// components
import { AddSubjobComponent } from './add/add-subjob.component';
import { SubjobsListComponent } from './list/subjobs-list.component';
import { SubjobsRoutingModule } from './subjobs-routing.module';
import { EditSubjobComponent } from './add/edit-subjob.component';


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
        SubjobsRoutingModule,
        LoadingModule,
        NgbModule,
        NgbModalModule.forRoot(),
        NgbDatepickerModule.forRoot(),
        NgxDatatableModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        AddSubjobComponent,
        SubjobsListComponent,
        EditSubjobComponent
    ]
})
export class SubJobModule { }
