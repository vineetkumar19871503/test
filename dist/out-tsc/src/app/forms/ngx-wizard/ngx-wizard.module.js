"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ngx_wizard_routing_module_1 = require("./ngx-wizard-routing.module");
var forms_1 = require("@angular/forms");
/* App Root */
var ngx_wizard_component_1 = require("./ngx-wizard.component");
var navbar_component_1 = require("./navbar/navbar.component");
/* Feature Components */
var personal_component_1 = require("./personal/personal.component");
var work_component_1 = require("./work/work.component");
var address_component_1 = require("./address/address.component");
var result_component_1 = require("./result/result.component");
/* Shared Service */
var formData_service_1 = require("./data/formData.service");
var workflow_service_1 = require("./workflow/workflow.service");
var common_1 = require("@angular/common");
var NGXFormWizardModule = (function () {
    function NGXFormWizardModule() {
    }
    NGXFormWizardModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule,
                forms_1.FormsModule,
                ngx_wizard_routing_module_1.NGXWizardRoutingModule
            ],
            providers: [{ provide: formData_service_1.FormDataService, useClass: formData_service_1.FormDataService },
                { provide: workflow_service_1.WorkflowService, useClass: workflow_service_1.WorkflowService }],
            declarations: [ngx_wizard_component_1.NGXFormWizardComponent, navbar_component_1.NavbarComponent, personal_component_1.PersonalComponent, work_component_1.WorkComponent, address_component_1.AddressComponent, result_component_1.ResultComponent],
            bootstrap: [ngx_wizard_component_1.NGXFormWizardComponent]
        })
    ], NGXFormWizardModule);
    return NGXFormWizardModule;
}());
exports.NGXFormWizardModule = NGXFormWizardModule;
//# sourceMappingURL=ngx-wizard.module.js.map