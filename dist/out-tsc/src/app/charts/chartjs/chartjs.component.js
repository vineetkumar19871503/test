"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var chartsData = require("../../shared/data/chartjs");
var ChartjsComponent = (function () {
    function ChartjsComponent() {
        // lineChart
        this.lineChartData = chartsData.lineChartData;
        this.lineChartLabels = chartsData.lineChartLabels;
        this.lineChartOptions = chartsData.lineChartOptions;
        this.lineChartColors = chartsData.lineChartColors;
        this.lineChartLegend = chartsData.lineChartLegend;
        this.lineChartType = chartsData.lineChartType;
        // areaChart
        this.areaChartData = chartsData.areaChartData;
        this.areaChartLabels = chartsData.areaChartLabels;
        this.areaChartOptions = chartsData.areaChartOptions;
        this.areaChartColors = chartsData.areaChartColors;
        this.areaChartLegend = chartsData.areaChartLegend;
        this.areaChartType = chartsData.areaChartType;
        // scatterChart
        this.scatterChartData = chartsData.scatterChartData;
        this.scatterChartLabels = chartsData.scatterChartLabels;
        this.scatterChartOptions = chartsData.scatterChartOptions;
        this.scatterChartColors = chartsData.scatterChartColors;
        this.scatterChartLegend = chartsData.scatterChartLegend;
        this.scatterChartType = chartsData.scatterChartType;
        // barChart
        this.barChartOptions = chartsData.barChartOptions;
        this.barChartLabels = chartsData.barChartLabels;
        this.barChartType = chartsData.barChartType;
        this.barChartLegend = chartsData.barChartLegend;
        this.barChartData = chartsData.barChartData;
        this.barChartColors = chartsData.barChartColors;
        // Doughnut
        this.doughnutChartLabels = chartsData.doughnutChartLabels;
        this.doughnutChartData = chartsData.doughnutChartData;
        this.doughnutChartType = chartsData.doughnutChartType;
        this.doughnutChartColors = chartsData.doughnutChartColors;
        this.doughnutChartOptions = chartsData.doughnutChartOptions;
        // Radar
        this.radarChartLabels = chartsData.radarChartLabels;
        this.radarChartData = chartsData.radarChartData;
        this.radarChartType = chartsData.radarChartType;
        this.radarChartColors = chartsData.radarChartColors;
        this.radarChartOptions = chartsData.radarChartOptions;
        // Pie
        this.pieChartLabels = chartsData.pieChartLabels;
        this.pieChartData = chartsData.pieChartData;
        this.pieChartType = chartsData.pieChartType;
        this.pieChartColors = chartsData.pieChartColors;
        this.pieChartOptions = chartsData.pieChartOptions;
        // PolarArea
        this.polarAreaChartLabels = chartsData.polarAreaChartLabels;
        this.polarAreaChartData = chartsData.polarAreaChartData;
        this.polarAreaLegend = chartsData.polarAreaLegend;
        this.ploarChartColors = chartsData.ploarChartColors;
        this.polarAreaChartType = chartsData.polarAreaChartType;
        this.polarChartOptions = chartsData.polarChartOptions;
    }
    // events
    ChartjsComponent.prototype.chartClicked = function (e) {
        //your code here
    };
    ChartjsComponent.prototype.chartHovered = function (e) {
        //your code here
    };
    ChartjsComponent = __decorate([
        core_1.Component({
            selector: 'app-chartjs',
            templateUrl: './chartjs.component.html',
            styleUrls: ['./chartjs.component.scss']
        })
    ], ChartjsComponent);
    return ChartjsComponent;
}());
exports.ChartjsComponent = ChartjsComponent;
//# sourceMappingURL=chartjs.component.js.map