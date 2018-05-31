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
var AddressComponent = (function () {
    function AddressComponent(router, route, formDataService, workflowService) {
        this.router = router;
        this.route = route;
        this.formDataService = formDataService;
        this.workflowService = workflowService;
        this.title = 'Where do you live?';
    }
    AddressComponent.prototype.ngOnInit = function () {
        this.address = this.formDataService.getAddress();
    };
    //Save button event Starts
    AddressComponent.prototype.save = function (form) {
        if (!form.valid)
            return;
        this.formDataService.setAddress(this.address);
        var firstState = this.workflowService.getFirstInvalidStep(workflow_model_1.STEPS.work);
        this.router.navigate(['result'], { relativeTo: this.route.parent, skipLocationChange: true });
    };
    //Save button event Ends
    //Cancel button event Starts
    AddressComponent.prototype.cancel = function () {
        this.router.navigate(['work'], { relativeTo: this.route.parent, skipLocationChange: true });
    };
    AddressComponent = __decorate([
        core_1.Component({
            selector: 'mt-wizard-address',
            templateUrl: './address.component.html',
            styleUrls: ['./address.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute, formData_service_1.FormDataService,
            workflow_service_1.WorkflowService])
    ], AddressComponent);
    return AddressComponent;
}());
exports.AddressComponent = AddressComponent;
//# sourceMappingURL=address.component.js.map