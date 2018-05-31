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
var PaginationComponent = (function () {
    function PaginationComponent(config) {
        // Variable Declaration
        this.page = 4;
        this.page1 = 4;
        this.page2 = 4;
        this.page3 = 4;
        this.page4 = 4;
        this.page5 = 4;
        this.page6 = 4;
        this.page7 = 4;
        this.currentPage = 2;
        this.currentPage1 = 2;
        this.currentPage2 = 2;
        this.isDisabled = true;
        // customize default values of paginations used by this component tree
        config.boundaryLinks = true;
    }
    // Toggle Disabled
    PaginationComponent.prototype.toggleDisabled = function () {
        this.isDisabled = !this.isDisabled;
    };
    PaginationComponent = __decorate([
        core_1.Component({
            selector: 'app-pagination',
            templateUrl: './pagination.component.html',
            styleUrls: ['./pagination.component.scss'],
            providers: [ng_bootstrap_1.NgbPaginationConfig] // add NgbPaginationConfig to the component providers
        }),
        __metadata("design:paramtypes", [ng_bootstrap_1.NgbPaginationConfig])
    ], PaginationComponent);
    return PaginationComponent;
}());
exports.PaginationComponent = PaginationComponent;
//# sourceMappingURL=pagination.component.js.map