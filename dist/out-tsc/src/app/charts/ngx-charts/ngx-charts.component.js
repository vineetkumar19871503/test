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
var ngxChart_1 = require("../../shared/data/ngxChart");
var chartsData = require("../../shared/configs/ngx-charts.config");
var NGXChartsComponent = (function () {
    function NGXChartsComponent() {
        //Chart Data
        this.lineChartMulti = ngxChart_1.lineChartMulti;
        this.areaChartMulti = ngxChart_1.areaChartMulti;
        this.barChartmulti = ngxChart_1.barChartmulti;
        this.pieChartSingle = ngxChart_1.pieChartSingle;
        //Bar Charts
        this.barChartView = chartsData.barChartView;
        // options
        this.barChartShowYAxis = chartsData.barChartShowYAxis;
        this.barChartShowXAxis = chartsData.barChartShowXAxis;
        this.barChartGradient = chartsData.barChartGradient;
        this.barChartShowLegend = chartsData.barChartShowLegend;
        this.barChartShowXAxisLabel = chartsData.barChartShowXAxisLabel;
        this.barChartXAxisLabel = chartsData.barChartXAxisLabel;
        this.barChartShowYAxisLabel = chartsData.barChartShowYAxisLabel;
        this.barChartYAxisLabel = chartsData.barChartYAxisLabel;
        this.barChartColorScheme = chartsData.barChartColorScheme;
        //Pie Charts
        this.pieChartView = chartsData.pieChartView;
        // options
        this.pieChartShowLegend = chartsData.pieChartShowLegend;
        this.pieChartColorScheme = chartsData.pieChartColorScheme;
        // pie
        this.pieChartShowLabels = chartsData.pieChartShowLabels;
        this.pieChartExplodeSlices = chartsData.pieChartExplodeSlices;
        this.pieChartDoughnut = chartsData.pieChartDoughnut;
        this.pieChartGradient = chartsData.pieChartGradient;
        this.pieChart1ExplodeSlices = chartsData.pieChart1ExplodeSlices;
        this.pieChart1Doughnut = chartsData.pieChart1Doughnut;
        //Line Charts
        this.lineChartView = chartsData.lineChartView;
        // options
        this.lineChartShowXAxis = chartsData.lineChartShowXAxis;
        this.lineChartShowYAxis = chartsData.lineChartShowYAxis;
        this.lineChartGradient = chartsData.lineChartGradient;
        this.lineChartShowLegend = chartsData.lineChartShowLegend;
        this.lineChartShowXAxisLabel = chartsData.lineChartShowXAxisLabel;
        this.lineChartXAxisLabel = chartsData.lineChartXAxisLabel;
        this.lineChartShowYAxisLabel = chartsData.lineChartShowYAxisLabel;
        this.lineChartYAxisLabel = chartsData.lineChartYAxisLabel;
        this.lineChartColorScheme = chartsData.lineChartColorScheme;
        // line, area
        this.lineChartAutoScale = chartsData.lineChartAutoScale;
        this.lineChartLineInterpolation = chartsData.lineChartLineInterpolation;
        //Area Charts
        this.areaChartView = chartsData.areaChartView;
        // options
        this.areaChartShowXAxis = chartsData.areaChartShowXAxis;
        this.areaChartShowYAxis = chartsData.areaChartShowYAxis;
        this.areaChartGradient = chartsData.areaChartGradient;
        this.areaChartShowLegend = chartsData.areaChartShowLegend;
        this.areaChartShowXAxisLabel = chartsData.areaChartShowXAxisLabel;
        this.areaChartXAxisLabel = chartsData.areaChartXAxisLabel;
        this.areaChartShowYAxisLabel = chartsData.areaChartShowYAxisLabel;
        this.areaChartYAxisLabel = chartsData.areaChartYAxisLabel;
        this.areaChartColorScheme = chartsData.areaChartColorScheme;
        // line, area
        this.areaChartAutoScale = chartsData.areaChartAutoScale;
        this.areaChartLineInterpolation = chartsData.areaChartLineInterpolation;
        Object.assign(this, { barChartSingle: ngxChart_1.barChartSingle, barChartmulti: ngxChart_1.barChartmulti, pieChartSingle: ngxChart_1.pieChartSingle, pieChartmulti: ngxChart_1.pieChartmulti, lineChartSingle: ngxChart_1.lineChartSingle, lineChartMulti: ngxChart_1.lineChartMulti, areaChartSingle: ngxChart_1.areaChartSingle, areaChartMulti: ngxChart_1.areaChartMulti });
    }
    NGXChartsComponent.prototype.onSelect = function (event) {
        //your code here
    };
    NGXChartsComponent = __decorate([
        core_1.Component({
            selector: 'app-ngx',
            templateUrl: './ngx-charts.component.html',
            styleUrls: ['./ngx-charts.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], NGXChartsComponent);
    return NGXChartsComponent;
}());
exports.NGXChartsComponent = NGXChartsComponent;
//# sourceMappingURL=ngx-charts.component.js.map