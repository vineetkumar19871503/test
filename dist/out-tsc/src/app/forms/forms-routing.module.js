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
var validation_forms_component_1 = require("./validation/validation-forms.component");
var wizard_forms_component_1 = require("./wizard/wizard-forms.component");
var basic_component_1 = require("./layouts/basic/basic.component");
var horizontal_component_1 = require("./layouts/horizontal/horizontal.component");
var hidden_labels_component_1 = require("./layouts/hidden-labels/hidden-labels.component");
var form_actions_component_1 = require("./layouts/form-actions/form-actions.component");
var bordered_component_1 = require("./layouts/bordered/bordered.component");
var striped_rows_component_1 = require("./layouts/striped-rows/striped-rows.component");
var inputs_component_1 = require("./elements/inputs/inputs.component");
var input_groups_component_1 = require("./elements/input-groups/input-groups.component");
var input_grid_component_1 = require("./elements/input-grid/input-grid.component");
var routes = [
    {
        path: '',
        children: [
            {
                path: 'basic',
                component: basic_component_1.BasicComponent,
                data: {
                    title: 'Basic Forms'
                }
            },
            {
                path: 'horizontal',
                component: horizontal_component_1.HorizontalComponent,
                data: {
                    title: 'Horizontal Forms'
                }
            },
            {
                path: 'hidden-labels',
                component: hidden_labels_component_1.HiddenLabelsComponent,
                data: {
                    title: 'Hidden Labels'
                }
            },
            {
                path: 'form-actions',
                component: form_actions_component_1.FormActionsComponent,
                data: {
                    title: 'Form Actions'
                }
            },
            {
                path: 'bordered',
                component: bordered_component_1.BorderedComponent,
                data: {
                    title: 'Bordered Forms'
                }
            },
            {
                path: 'striped-rows',
                component: striped_rows_component_1.StripedRowsComponent,
                data: {
                    title: 'Striped Rows'
                }
            },
            {
                path: 'inputs',
                component: inputs_component_1.InputsComponent,
                data: {
                    title: 'Inputs'
                }
            },
            {
                path: 'input-groups',
                component: input_groups_component_1.InputGroupsComponent,
                data: {
                    title: 'Input Groups'
                }
            },
            {
                path: 'input-grid',
                component: input_grid_component_1.InputGridComponent,
                data: {
                    title: 'Input Grid'
                }
            },
            {
                path: 'validation',
                component: validation_forms_component_1.ValidationFormsComponent,
                data: {
                    title: 'Validation Forms'
                }
            },
            {
                path: 'wizard',
                component: wizard_forms_component_1.WizardFormsComponent,
                data: {
                    title: 'Wizard Forms'
                }
            },
            {
                path: 'ngx',
                loadChildren: './ngx-wizard/ngx-wizard.module#NGXFormWizardModule'
            }
        ]
    }
];
var FormsRoutingModule = (function () {
    function FormsRoutingModule() {
    }
    FormsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule],
        })
    ], FormsRoutingModule);
    return FormsRoutingModule;
}());
exports.FormsRoutingModule = FormsRoutingModule;
//# sourceMappingURL=forms-routing.module.js.map