import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingModule } from 'ngx-loading';

// components
import { EditCustomerComponent } from './edit/edit-customer.component';
import { CustomersRoutingModule } from './customers-routing.module';

// date and time picker modules
import { NgbModalModule, NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

// google map module
import { AgmCoreModule } from '@agm/core';

// form modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// table modules
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
    imports: [
        // google map configuration
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBr5_picK8YJK7fFR2CPzTVMj6GG1TtRGo',
            libraries: ['places']
        }),
        CommonModule,
        FormsModule,
        CustomersRoutingModule,
        LoadingModule,
        NgbModule,
        NgbModalModule.forRoot(),
        NgbDatepickerModule.forRoot(),
        NgxDatatableModule,
        ReactiveFormsModule,
    ],
    declarations: [
        EditCustomerComponent
    ]

})
export class CustomerModule { }
