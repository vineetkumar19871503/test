"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ngx_loading_1 = require("ngx-loading");
// components
var add_job_component_1 = require("./add/add-job.component");
var jobs_list_component_1 = require("./list/jobs-list.component");
var assign_job_component_1 = require("./assign/assign-job.component");
var dispatch_job_component_1 = require("./dispatch/dispatch-job.component");
var jobs_routing_module_1 = require("./jobs-routing.module");
var customer_jobs_component_1 = require("./list/customer-jobs.component");
var sub_jobs_component_1 = require("./list/sub-jobs.component");
// date and time picker modules
var ng_bootstrap_2 = require("@ng-bootstrap/ng-bootstrap");
// google map module
var core_2 = require("@agm/core");
// form modules
var forms_1 = require("@angular/forms");
// table modules
var ngx_datatable_1 = require("@swimlane/ngx-datatable");
var shared_module_1 = require("../shared/shared.module");
var JobModule = (function () {
    function JobModule() {
    }
    JobModule = __decorate([
        core_1.NgModule({
            imports: [
                // google map configuration
                core_2.AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyBr5_picK8YJK7fFR2CPzTVMj6GG1TtRGo',
                    libraries: ['places']
                }),
                common_1.CommonModule,
                forms_1.FormsModule,
                jobs_routing_module_1.JobsRoutingModule,
                ngx_loading_1.LoadingModule,
                ng_bootstrap_1.NgbModule,
                ng_bootstrap_2.NgbModalModule.forRoot(),
                ng_bootstrap_2.NgbDatepickerModule.forRoot(),
                ngx_datatable_1.NgxDatatableModule,
                forms_1.ReactiveFormsModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                assign_job_component_1.AssignJobComponent,
                add_job_component_1.AddJobComponent,
                jobs_list_component_1.JobsListComponent,
                dispatch_job_component_1.DispatchJobComponent,
                customer_jobs_component_1.CustomerJobsComponent,
                sub_jobs_component_1.SubJobsComponent
            ]
        })
    ], JobModule);
    return JobModule;
}());
exports.JobModule = JobModule;
//# sourceMappingURL=jobs.module.js.map