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
var ng2_charts_1 = require("ng2-charts");
var ng_chartist_1 = require("ng-chartist");
var ngx_charts_1 = require("@swimlane/ngx-charts");
var charts_routing_module_1 = require("./charts-routing.module");
var chartist_component_1 = require("./chartist/chartist.component");
var chartjs_component_1 = require("./chartjs/chartjs.component");
var ngx_charts_component_1 = require("./ngx-charts/ngx-charts.component");
var ChartsNg2Module = (function () {
    function ChartsNg2Module() {
    }
    ChartsNg2Module = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                charts_routing_module_1.ChartsRoutingModule,
                ng2_charts_1.ChartsModule,
                ng_chartist_1.ChartistModule,
                ngx_charts_1.NgxChartsModule
            ],
            declarations: [
                chartist_component_1.ChartistComponent,
                chartjs_component_1.ChartjsComponent,
                ngx_charts_component_1.NGXChartsComponent
            ],
        })
    ], ChartsNg2Module);
    return ChartsNg2Module;
}());
exports.ChartsNg2Module = ChartsNg2Module;
//# sourceMappingURL=charts.module.js.map