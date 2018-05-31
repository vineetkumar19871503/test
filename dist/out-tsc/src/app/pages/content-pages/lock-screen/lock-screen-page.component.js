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
var LockScreenPageComponent = (function () {
    function LockScreenPageComponent() {
    }
    LockScreenPageComponent.prototype.onSubmit = function () {
        this.lockScreenForm.reset();
    };
    __decorate([
        core_1.ViewChild('f'),
        __metadata("design:type", forms_1.NgForm)
    ], LockScreenPageComponent.prototype, "lockScreenForm", void 0);
    LockScreenPageComponent = __decorate([
        core_1.Component({
            selector: 'app-lock-screen-page',
            templateUrl: './lock-screen-page.component.html',
            styleUrls: ['./lock-screen-page.component.scss']
        })
    ], LockScreenPageComponent);
    return LockScreenPageComponent;
}());
exports.LockScreenPageComponent = LockScreenPageComponent;
//# sourceMappingURL=lock-screen-page.component.js.map