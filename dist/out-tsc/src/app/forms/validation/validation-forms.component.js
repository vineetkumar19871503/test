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
var forms_1 = require("@angular/forms");
var ValidationFormsComponent = (function () {
    function ValidationFormsComponent() {
        this.radioOptions = ['Option one is this', 'Option two can be something else'];
    }
    ValidationFormsComponent.prototype.ngOnInit = function () {
        this.regularForm = new forms_1.FormGroup({
            'inputEmail': new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.email]),
            'password': new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.maxLength(24)]),
            'textArea': new forms_1.FormControl(null, [forms_1.Validators.required]),
            'radioOption': new forms_1.FormControl('Option one is this')
        }, { updateOn: 'blur' });
    };
    ValidationFormsComponent.prototype.onReactiveFormSubmit = function () {
        this.regularForm.reset();
    };
    ValidationFormsComponent.prototype.onTemplateFormSubmit = function () {
        this.floatingLabelForm.reset();
    };
    ValidationFormsComponent.prototype.onCustomFormSubmit = function () {
        this.validationForm.reset();
    };
    __decorate([
        core_1.ViewChild('f'),
        __metadata("design:type", forms_1.NgForm)
    ], ValidationFormsComponent.prototype, "floatingLabelForm", void 0);
    __decorate([
        core_1.ViewChild('vform'),
        __metadata("design:type", forms_1.FormGroup)
    ], ValidationFormsComponent.prototype, "validationForm", void 0);
    ValidationFormsComponent = __decorate([
        core_1.Component({
            selector: 'app-validation-forms',
            templateUrl: './validation-forms.component.html',
            styleUrls: ['./validation-forms.component.scss']
        })
    ], ValidationFormsComponent);
    return ValidationFormsComponent;
}());
exports.ValidationFormsComponent = ValidationFormsComponent;
//# sourceMappingURL=validation-forms.component.js.map