"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WizardFormsComponent = (function () {
    function WizardFormsComponent() {
    }
    WizardFormsComponent.prototype.ngOnInit = function () {
        $.getScript('./assets/js/jquery.steps.min.js');
        $.getScript('./assets/js/wizard-steps.js');
    };
    WizardFormsComponent = __decorate([
        core_1.Component({
            selector: 'app-wizard-forms',
            templateUrl: './wizard-forms.component.html',
            styleUrls: ['./wizard-forms.component.scss']
        })
    ], WizardFormsComponent);
    return WizardFormsComponent;
}());
exports.WizardFormsComponent = WizardFormsComponent;
//# sourceMappingURL=wizard-forms.component.js.map