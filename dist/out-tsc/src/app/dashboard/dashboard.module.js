"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var dashboard_routing_module_1 = require("./dashboard-routing.module");
var ng_chartist_1 = require("ng-chartist");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var match_height_directive_1 = require("../shared/directives/match-height.directive");
var dashboard1_component_1 = require("./dashboard1/dashboard1.component");
var dashboard2_component_1 = require("./dashboard2/dashboard2.component");
var DashboardModule = (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                dashboard_routing_module_1.DashboardRoutingModule,
                ng_chartist_1.ChartistModule,
                ng_bootstrap_1.NgbModule,
                match_height_directive_1.MatchHeightModule
            ],
            exports: [],
            declarations: [
                dashboard1_component_1.Dashboard1Component,
                dashboard2_component_1.Dashboard2Component
            ],
            providers: [],
        })
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map