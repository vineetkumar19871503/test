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
var Subject_1 = require("rxjs/Subject");
var AlertsComponent = (function () {
    // Closable Alert's code
    function AlertsComponent() {
        this.alerts = [];
        this._success = new Subject_1.Subject();
        this.staticAlertClosed = false;
        this.alerts.push({
            id: 1,
            type: 'success',
            message: 'This is a success alert',
        }, {
            id: 2,
            type: 'info',
            message: 'This is an info alert',
        }, {
            id: 3,
            type: 'warning',
            message: 'This is a warning alert',
        }, {
            id: 4,
            type: 'danger',
            message: 'This is a danger alert',
        }, {
            id: 5,
            type: 'primary',
            message: 'This is a primary alert',
        }, {
            id: 6,
            type: 'secondary',
            message: 'This is a secondary alert',
        }, {
            id: 7,
            type: 'light',
            message: 'This is a light alert',
        }, {
            id: 8,
            type: 'dark',
            message: 'This is a dark alert',
        });
        this.backup = this.alerts.map(function (alert) { return Object.assign({}, alert); });
    }
    // Close Alert on close icon click
    AlertsComponent.prototype.closeAlert = function (alert) {
        var index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    };
    // Reset all the alerts on click of reset button
    AlertsComponent.prototype.reset = function () {
        this.alerts = this.backup.map(function (alert) { return Object.assign({}, alert); });
    };
    AlertsComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Auto close alert timer
        setTimeout(function () { return _this.staticAlertClosed = true; }, 20000);
        // Success message
        this._success.subscribe(function (message) { return _this.successMessage = message; });
        // Subscribe section code
        this._success.debounceTime(5000).subscribe(function () { return _this.successMessage = null; });
    };
    // Self closing alert's message change code
    AlertsComponent.prototype.changeSuccessMessage = function () {
        this._success.next(new Date() + " - Message successfully changed.");
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], AlertsComponent.prototype, "alerts", void 0);
    AlertsComponent = __decorate([
        core_1.Component({
            selector: 'app-alerts',
            templateUrl: './alerts.component.html',
            styleUrls: ['./alerts.component.scss'],
        }),
        __metadata("design:paramtypes", [])
    ], AlertsComponent);
    return AlertsComponent;
}());
exports.AlertsComponent = AlertsComponent;
//# sourceMappingURL=alerts.component.js.map