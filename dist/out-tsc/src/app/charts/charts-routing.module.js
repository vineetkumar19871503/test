"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var chartist_component_1 = require("./chartist/chartist.component");
var chartjs_component_1 = require("./chartjs/chartjs.component");
var ngx_charts_component_1 = require("./ngx-charts/ngx-charts.component");
var routes = [
    {
        path: '',
        children: [
            {
                path: 'chartist',
                component: chartist_component_1.ChartistComponent,
                data: {
                    title: 'Chartist'
                }
            },
            {
                path: 'chartjs',
                component: chartjs_component_1.ChartjsComponent,
                data: {
                    title: 'Chartjs'
                }
            },
            {
                path: 'ngx',
                component: ngx_charts_component_1.NGXChartsComponent,
                data: {
                    title: 'NGX Charts'
                }
            },
        ]
    }
];
var ChartsRoutingModule = (function () {
    function ChartsRoutingModule() {
    }
    ChartsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule],
        })
    ], ChartsRoutingModule);
    return ChartsRoutingModule;
}());
exports.ChartsRoutingModule = ChartsRoutingModule;
//# sourceMappingURL=charts-routing.module.js.map