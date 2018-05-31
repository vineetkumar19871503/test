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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var TooltipComponent = (function () {
    function TooltipComponent() {
        this.greeting = {};
        this.name = 'World';
    }
    TooltipComponent.prototype.changeGreeting = function (greeting) {
        var isOpen = this.tooltip.isOpen();
        this.tooltip.close();
        if (greeting !== this.greeting || !isOpen) {
            this.greeting = greeting;
            this.tooltip.open(greeting);
        }
    };
    __decorate([
        core_1.ViewChild('x'),
        __metadata("design:type", ng_bootstrap_1.NgbTooltip)
    ], TooltipComponent.prototype, "tooltip", void 0);
    TooltipComponent = __decorate([
        core_1.Component({
            selector: 'app-tooltip',
            templateUrl: './tooltip.component.html',
            styleUrls: ['./tooltip.component.scss']
        })
    ], TooltipComponent);
    return TooltipComponent;
}());
exports.TooltipComponent = TooltipComponent;
//# sourceMappingURL=tooltip.component.js.map