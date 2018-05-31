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
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
var toastr_service_1 = require("./toastr.service");
// let style = require("../../../../../src/assets/css/ng2-toastr.min.css");
var ToastrComponent = (function () {
    function ToastrComponent(service) {
        this.service = service;
    }
    // Success Type
    ToastrComponent.prototype.typeSuccess = function () {
        this.service.typeSuccess();
    };
    // Success Type
    ToastrComponent.prototype.typeInfo = function () {
        this.service.typeInfo();
    };
    // Success Type
    ToastrComponent.prototype.typeWarning = function () {
        this.service.typeWarning();
    };
    // Success Type
    ToastrComponent.prototype.typeError = function () {
        this.service.typeError();
    };
    // Custom Type
    ToastrComponent.prototype.typeCustom = function () {
        this.service.typeCustom();
    };
    // Remove current toasts using animation
    ToastrComponent.prototype.clearToast = function () {
        this.service.clearToast();
    };
    // Show close button
    ToastrComponent.prototype.showCloseButton = function () {
        this.service.showCloseButton();
    };
    //Dismiss toastr on Click
    ToastrComponent.prototype.dismissToastOnClick = function () {
        this.service.dismissToastOnClick();
    };
    //Dismiss toastr Controlled
    ToastrComponent.prototype.dismissToastControlled = function () {
        this.service.dismissToastControlled();
    };
    // Timeout
    ToastrComponent.prototype.timeout = function () {
        this.service.timeout();
    };
    // Enable HTML
    ToastrComponent.prototype.enableHtml = function () {
        this.service.enableHtml();
    };
    // Title Class
    ToastrComponent.prototype.titleClass = function () {
        this.service.titleClass();
    };
    // Message Class
    ToastrComponent.prototype.messageClass = function () {
        this.service.messageClass();
    };
    ToastrComponent = __decorate([
        core_1.Component({
            selector: 'app-toastr',
            templateUrl: './toastr.component.html',
            styleUrls: ['./toastr.component.scss'],
            providers: [toastr_service_1.ToastrService]
        }),
        __metadata("design:paramtypes", [toastr_service_1.ToastrService])
    ], ToastrComponent);
    return ToastrComponent;
}());
exports.ToastrComponent = ToastrComponent;
//# sourceMappingURL=toastr.component.js.map