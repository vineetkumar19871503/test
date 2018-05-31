"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var add_job_component_1 = require("./add/add-job.component");
var jobs_list_component_1 = require("./list/jobs-list.component");
var customer_jobs_component_1 = require("./list/customer-jobs.component");
var sub_jobs_component_1 = require("./list/sub-jobs.component");
// import { RunningJobsComponent } from './list/running-jobs.component';
var assign_job_component_1 = require("./assign/assign-job.component");
var dispatch_job_component_1 = require("./dispatch/dispatch-job.component");
var routes = [
    {
        path: '',
        children: [
            {
                path: 'add/:id',
                component: add_job_component_1.AddJobComponent,
                data: {
                    title: 'Add Job'
                }
            },
            {
                path: 'list',
                component: jobs_list_component_1.JobsListComponent,
                data: {
                    title: 'Jobs'
                }
            },
            {
                path: 'add/:id',
                component: add_job_component_1.AddJobComponent,
                data: {
                    title: 'Add Job'
                }
            },
            {
                path: 'dispatch',
                component: dispatch_job_component_1.DispatchJobComponent,
                data: {
                    title: 'Dispatch Job'
                }
            },
            {
                path: 'assign/:job_id',
                component: assign_job_component_1.AssignJobComponent,
                data: {
                    title: 'Assign Job'
                }
            },
            {
                path: 'jobsListByCustomerId/:id',
                component: customer_jobs_component_1.CustomerJobsComponent,
                data: {
                    title: 'Customer Jobs'
                }
            },
            {
                path: 'SubjobsListByJobId/:id',
                component: sub_jobs_component_1.SubJobsComponent,
                data: {
                    title: 'Sub Jobs'
                }
            }
        ]
    }
];
var JobsRoutingModule = (function () {
    function JobsRoutingModule() {
    }
    JobsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule],
        })
    ], JobsRoutingModule);
    return JobsRoutingModule;
}());
exports.JobsRoutingModule = JobsRoutingModule;
//# sourceMappingURL=jobs-routing.module.js.map