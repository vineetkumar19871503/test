"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var formData_service_1 = require("../data/formData.service");
var workflow_service_1 = require("../workflow/workflow.service");
var workflow_model_1 = require("../workflow/workflow.model");
var router_1 = require("@angular/router");
var PersonalComponent = (function () {
    function PersonalComponent(router, route, formDataService, workflowService) {
        this.router = router;
        this.route = route;
        this.formDataService = formDataService;
        this.workflowService = workflowService;
        this.title = 'Please tell us about yourself.';
    }
    PersonalComponent.prototype.ngOnInit = function () {
        this.personal = this.formDataService.getPersonal();
    };
    //Save button event Starts
    PersonalComponent.prototype.save = function (form) {
        if (!form.valid)
            return;
        this.formDataService.setPersonal(this.personal);
        var firstState = this.workflowService.getFirstInvalidStep(workflow_model_1.STEPS.work);
        if (firstState.length > 0) {
        }
        ;
        this.router.navigateByUrl('/forms/ngx/work', { relativeTo: this.route.parent, skipLocationChange: true });
    };
    PersonalComponent = __decorate([
        core_1.Component({
            selector: 'mt-wizard-personal',
            templateUrl: './personal.component.html',
            styleUrls: ['./personal.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute, formData_service_1.FormDataService,
            workflow_service_1.WorkflowService])
    ], PersonalComponent);
    return PersonalComponent;
}());
exports.PersonalComponent = PersonalComponent;
//# sourceMappingURL=personal.component.js.map