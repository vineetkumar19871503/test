"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var alertFunctions = require("../../../shared/data/sweet-alerts");
var SweetAlertsComponent = (function () {
    function SweetAlertsComponent() {
    }
    // Simple Alert
    SweetAlertsComponent.prototype.basicAlert = function () {
        alertFunctions.basicAlert();
    };
    // Alert with Title
    SweetAlertsComponent.prototype.withTitle = function () {
        alertFunctions.withTitle();
    };
    //  HTML Alert
    SweetAlertsComponent.prototype.htmlAlert = function () {
        alertFunctions.htmlAlert();
    };
    // Question Type Alert
    SweetAlertsComponent.prototype.typeQuestion = function () {
        alertFunctions.typeQuestion();
    };
    // Success Type Alert
    SweetAlertsComponent.prototype.typeSuccess = function () {
        alertFunctions.typeSuccess();
    };
    // Info Type Alert
    SweetAlertsComponent.prototype.typeInfo = function () {
        alertFunctions.typeInfo();
    };
    // Warning Type Alert
    SweetAlertsComponent.prototype.typeWarning = function () {
        alertFunctions.typeWarning();
    };
    // Error Type Alert
    SweetAlertsComponent.prototype.typeError = function () {
        alertFunctions.typeError();
    };
    // Custom Icon 
    SweetAlertsComponent.prototype.customIcon = function () {
        alertFunctions.customIcon();
    };
    // Auto close timer
    SweetAlertsComponent.prototype.autoClose = function () {
        alertFunctions.autoClose();
    };
    // Allow Outside Click
    SweetAlertsComponent.prototype.outsideClick = function () {
        alertFunctions.outsideClick();
    };
    // Ajax Request
    SweetAlertsComponent.prototype.ajaxRequest = function () {
        alertFunctions.ajaxRequest();
    };
    // Button Options
    SweetAlertsComponent.prototype.customButton = function () {
        alertFunctions.customButton();
    };
    // Prompt Function
    SweetAlertsComponent.prototype.promptFunction = function () {
        alertFunctions.promptFunction();
    };
    // Confirm Button Action
    SweetAlertsComponent.prototype.confirmText = function () {
        alertFunctions.confirmText();
    };
    // Confirm & Cancel Button
    SweetAlertsComponent.prototype.confirmCancelButton = function () {
        alertFunctions.confirmCancelButton();
    };
    // Chaining modals / Steps
    SweetAlertsComponent.prototype.steps = function () {
        alertFunctions.steps();
    };
    SweetAlertsComponent = __decorate([
        core_1.Component({
            selector: 'app-sweet-alerts',
            templateUrl: './sweet-alerts.component.html',
            styleUrls: ['./sweet-alerts.component.scss']
        })
    ], SweetAlertsComponent);
    return SweetAlertsComponent;
}());
exports.SweetAlertsComponent = SweetAlertsComponent;
//# sourceMappingURL=sweet-alerts.component.js.map