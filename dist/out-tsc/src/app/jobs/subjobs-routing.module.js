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
var add_subjob_component_1 = require("./add/add-subjob.component");
var subjobs_list_component_1 = require("./list/subjobs-list.component");
var edit_subjob_component_1 = require("./add/edit-subjob.component");
var routes = [
    {
        path: '',
        children: [
            {
                path: 'add/:job_id',
                component: add_subjob_component_1.AddSubjobComponent,
                data: {
                    title: 'Add Job'
                }
            },
            {
                path: 'edit/:job_id',
                component: edit_subjob_component_1.EditSubjobComponent,
                data: {
                    title: 'Add Job'
                }
            },
            {
                path: 'list',
                component: subjobs_list_component_1.SubjobsListComponent,
                data: {
                    title: 'Sub Jobs'
                }
            }
        ]
    }
];
var SubjobsRoutingModule = (function () {
    function SubjobsRoutingModule() {
    }
    SubjobsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule],
        })
    ], SubjobsRoutingModule);
    return SubjobsRoutingModule;
}());
exports.SubjobsRoutingModule = SubjobsRoutingModule;
//# sourceMappingURL=subjobs-routing.module.js.map