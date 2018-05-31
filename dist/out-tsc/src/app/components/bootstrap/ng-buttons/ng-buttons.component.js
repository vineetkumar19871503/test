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
var NgButtonsComponent = (function () {
    function NgButtonsComponent(formBuilder) {
        this.formBuilder = formBuilder;
        // Checkbox Buttons
        this.model = {
            left: true,
            middle: false,
            right: false
        };
        // Radio Buttons
        this.modelRadio = 1;
    }
    NgButtonsComponent.prototype.ngOnInit = function () {
        this.checkboxGroupForm = this.formBuilder.group({
            left: true,
            middle: false,
            right: false
        });
        this.radioGroupForm = this.formBuilder.group({
            'modelRadioForm': 'Left'
        });
    };
    NgButtonsComponent = __decorate([
        core_1.Component({
            selector: 'app-ng-buttons',
            templateUrl: './ng-buttons.component.html',
            styleUrls: ['./ng-buttons.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder])
    ], NgButtonsComponent);
    return NgButtonsComponent;
}());
exports.NgButtonsComponent = NgButtonsComponent;
//# sourceMappingURL=ng-buttons.component.js.map