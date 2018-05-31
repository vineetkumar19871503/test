"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shape = require("d3-shape");
//Bar Chart
exports.barChartView = [550, 400];
// options
exports.barChartShowXAxis = true;
exports.barChartShowYAxis = true;
exports.barChartGradient = false;
exports.barChartShowLegend = false;
exports.barChartShowXAxisLabel = true;
exports.barChartXAxisLabel = 'Country';
exports.barChartShowYAxisLabel = true;
exports.barChartYAxisLabel = 'Population';
exports.barChartColorScheme = {
    domain: ['#009DA0', '#FF8D60', '#FF586B', '#AAAAAA']
};
//Pie CHart
exports.pieChartView = [550, 400];
// options
exports.pieChartShowLegend = false;
exports.pieChartColorScheme = {
    domain: ['#009DA0', '#FF8D60', '#FF586B', '#AAAAAA']
};
// pie
exports.pieChartShowLabels = true;
exports.pieChartExplodeSlices = false;
exports.pieChartDoughnut = true;
exports.pieChartGradient = false;
exports.pieChart1ExplodeSlices = true;
exports.pieChart1Doughnut = false;
//Line Charts
exports.lineChartView = [550, 400];
// options
exports.lineChartShowXAxis = true;
exports.lineChartShowYAxis = true;
exports.lineChartGradient = false;
exports.lineChartShowLegend = false;
exports.lineChartShowXAxisLabel = true;
exports.lineChartXAxisLabel = 'Country';
exports.lineChartShowYAxisLabel = true;
exports.lineChartYAxisLabel = 'Population';
exports.lineChartColorScheme = {
    domain: ['#009DA0', '#FF8D60', '#FF586B', '#AAAAAA']
};
// line, area
exports.lineChartAutoScale = true;
exports.lineChartLineInterpolation = shape.curveBasis;
//Area Charts
exports.areaChartView = [550, 400];
// options
exports.areaChartShowXAxis = true;
exports.areaChartShowYAxis = true;
exports.areaChartGradient = false;
exports.areaChartShowLegend = false;
exports.areaChartShowXAxisLabel = true;
exports.areaChartXAxisLabel = 'Country';
exports.areaChartShowYAxisLabel = true;
exports.areaChartYAxisLabel = 'Population';
exports.areaChartColorScheme = {
    domain: ['#FF8D60', '#FF586B', '#1CBCD8', '#AAAAAA']
};
// line, area
exports.areaChartAutoScale = true;
exports.areaChartLineInterpolation = shape.curveBasis;
//# sourceMappingURL=ngx-charts.config.js.map