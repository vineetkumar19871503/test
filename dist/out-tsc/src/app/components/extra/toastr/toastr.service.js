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
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var core_1 = require("@angular/core");
var ToastrService = (function () {
    function ToastrService(toastr) {
        this.toastr = toastr;
    }
    // Success Type
    ToastrService.prototype.typeSuccess = function () {
        this.toastr.success('You are awesome!', 'Success!');
    };
    // Success Type
    ToastrService.prototype.typeInfo = function () {
        this.toastr.info('We do have the Kapua suite available.', 'Turtle Bay Resort');
    };
    // Success Type
    ToastrService.prototype.typeWarning = function () {
        this.toastr.warning('My name is Inigo Montoya. You killed my father, prepare to die!');
    };
    // Success Type
    ToastrService.prototype.typeError = function () {
        this.toastr.error('I do not think that word means what you think it means.', 'Inconceivable!');
    };
    // Custom Type
    ToastrService.prototype.typeCustom = function () {
        this.toastr.custom('<span style="color: red">Message in red.</span>', null, { enableHTML: true });
    };
    // Timeout
    ToastrService.prototype.timeout = function () {
        this.toastr.error('I do not think that word means what you think it means.', 'Timeout!', { "toastLife": 2000 });
    };
    //Dismiss toastr on Click
    ToastrService.prototype.dismissToastOnClick = function () {
        this.toastr.info('We do have the Kapua suite available.', 'Turtle Bay Resort', { dismiss: 'click' });
    };
    // Dismiss Toast controlled code
    ToastrService.prototype.dismissToastControlled = function () {
        var _this = this;
        this.toastr.success('You are awesome!', 'Success!', { dismiss: 'controlled' })
            .then(function (toast) {
            setTimeout(function () {
                _this.toastr.dismissToast(toast);
            }, 10000);
        });
    };
    // Remove current toasts using animation
    ToastrService.prototype.clearToast = function () {
        this.toastr.clearAllToasts();
    };
    // Show close button
    ToastrService.prototype.showCloseButton = function () {
        this.toastr.info('Have fun storming the castle!', 'Miracle Max Says', { showCloseButton: true });
    };
    // Enable  HTML
    ToastrService.prototype.enableHtml = function () {
        this.toastr.info('<i>Have fun <b>storming</b> the castle!</i>', 'Miracle Max Says', { enableHTML: true });
    };
    // Title Class
    ToastrService.prototype.titleClass = function () {
        this.toastr.info('Have fun storming the castle!', 'Miracle Max Says', { titleClass: 'h3' });
    };
    // Message Class
    ToastrService.prototype.messageClass = function () {
        this.toastr.info('Have fun storming the castle!', 'Miracle Max Says', { messageClass: 'text-uppercase' });
    };
    ToastrService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager])
    ], ToastrService);
    return ToastrService;
}());
exports.ToastrService = ToastrService;
//# sourceMappingURL=toastr.service.js.map