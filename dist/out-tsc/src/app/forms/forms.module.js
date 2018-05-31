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
var forms_1 = require("@angular/forms");
var forms_routing_module_1 = require("./forms-routing.module");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ngx_wizard_module_1 = require("./ngx-wizard/ngx-wizard.module");
var ng2_validation_1 = require("ng2-validation");
var match_height_directive_1 = require("../shared/directives/match-height.directive");
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
var FormModule = (function () {
    function FormModule() {
    }
    FormModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_routing_module_1.FormsRoutingModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                ngx_wizard_module_1.NGXFormWizardModule,
                ng2_validation_1.CustomFormsModule,
                match_height_directive_1.MatchHeightModule,
                ng_bootstrap_1.NgbModule
            ],
            declarations: [
                validation_forms_component_1.ValidationFormsComponent,
                wizard_forms_component_1.WizardFormsComponent,
                basic_component_1.BasicComponent,
                horizontal_component_1.HorizontalComponent,
                hidden_labels_component_1.HiddenLabelsComponent,
                form_actions_component_1.FormActionsComponent,
                bordered_component_1.BorderedComponent,
                striped_rows_component_1.StripedRowsComponent,
                inputs_component_1.InputsComponent,
                input_groups_component_1.InputGroupsComponent,
                input_grid_component_1.InputGridComponent
            ]
        })
    ], FormModule);
    return FormModule;
}());
exports.FormModule = FormModule;
//# sourceMappingURL=forms.module.js.map