import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from 'ngx-loading';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { NgbModalModule, NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LoadingModule,
        ReactiveFormsModule,
        UsersRoutingModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class UserModule { }
