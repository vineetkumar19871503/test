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
var ngx_wizard_component_1 = require("./ngx-wizard.component");
var personal_component_1 = require("./personal/personal.component");
var work_component_1 = require("./work/work.component");
var address_component_1 = require("./address/address.component");
var result_component_1 = require("./result/result.component");
var routes = [
    {
        path: '',
        component: ngx_wizard_component_1.NGXFormWizardComponent,
        data: {
            title: 'ngx-wizard'
        },
        children: [
            {
                path: 'wizard',
                component: personal_component_1.PersonalComponent,
                data: {
                    title: 'Personal'
                }
            },
            {
                path: 'work',
                component: work_component_1.WorkComponent,
                data: {
                    title: 'Work'
                }
            },
            {
                path: 'address',
                component: address_component_1.AddressComponent,
                data: {
                    title: 'Address'
                }
            },
            {
                path: 'result',
                component: result_component_1.ResultComponent,
                data: {
                    title: 'Result'
                }
            }
        ]
    }
];
var NGXWizardRoutingModule = (function () {
    function NGXWizardRoutingModule() {
    }
    NGXWizardRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule],
        })
    ], NGXWizardRoutingModule);
    return NGXWizardRoutingModule;
}());
exports.NGXWizardRoutingModule = NGXWizardRoutingModule;
exports.routedComponents = [ngx_wizard_component_1.NGXFormWizardComponent];
//# sourceMappingURL=ngx-wizard-routing.module.js.map