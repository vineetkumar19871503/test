"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Chartist = require("chartist");
var data = require('../../shared/data/chartist.json');
var ChartistComponent = (function () {
    function ChartistComponent() {
        // Line with Area Chart 1 Starts
        this.lineArea1 = {
            type: 'Line',
            data: data['lineArea1'],
            options: {
                low: 0,
                showArea: true,
                fullWidth: true,
                onlyInteger: true,
                axisY: {
                    low: 0,
                    scaleMinSpace: 50,
                },
                axisX: {
                    showGrid: false
                }
            },
            events: {
                created: function (data) {
                    var defs = data.svg.elem('defs');
                    defs.elem('linearGradient', {
                        id: 'gradient',
                        x1: 0,
                        y1: 1,
                        x2: 0,
                        y2: 0
                    }).elem('stop', {
                        offset: 0,
                        'stop-color': 'rgba(255, 255, 255, 1)'
                    }).parent().elem('stop', {
                        offset: 1,
                        'stop-color': 'rgba(38, 198, 218, 1)'
                    });
                },
            },
        };
        // Line with Area Chart 1 Ends
        // Line with Area Chart 2 Starts
        this.lineArea2 = {
            type: 'Line',
            data: data['lineArea2'],
            options: {
                showArea: true,
                fullWidth: true,
                lineSmooth: Chartist.Interpolation.none(),
                axisX: {
                    showGrid: false,
                },
                axisY: {
                    low: 0,
                    scaleMinSpace: 50,
                },
                chartPadding: { top: 0, right: 25, bottom: 0, left: 0 },
            },
            responsiveOptions: [
                ['screen and (max-width: 640px) and (min-width: 381px)', {
                        axisX: {
                            labelInterpolationFnc: function (value, index) {
                                return index % 2 === 0 ? value : null;
                            }
                        }
                    }],
                ['screen and (max-width: 380px)', {
                        axisX: {
                            labelInterpolationFnc: function (value, index) {
                                return index % 3 === 0 ? value : null;
                            }
                        }
                    }]
            ],
            events: {
                created: function (data) {
                    var defs = data.svg.elem('defs');
                    defs.elem('linearGradient', {
                        id: 'gradient1',
                        x1: 0,
                        y1: 1,
                        x2: 0,
                        y2: 0
                    }).elem('stop', {
                        offset: 0.2,
                        'stop-color': 'rgba(255, 255, 255, 1)'
                    }).parent().elem('stop', {
                        offset: 1,
                        'stop-color': 'rgba(38, 198, 218, 1)'
                    });
                    defs.elem('linearGradient', {
                        id: 'gradient2',
                        x1: 0,
                        y1: 1,
                        x2: 0,
                        y2: 0
                    }).elem('stop', {
                        offset: 0.5,
                        'stop-color': 'rgba(255, 255, 255, 1)'
                    }).parent().elem('stop', {
                        offset: 1,
                        'stop-color': 'rgba(255,141,96, 1)'
                    });
                },
                draw: function (data) {
                    var circleRadius = 6;
                    if (data.type === 'point') {
                        var circle = new Chartist.Svg('circle', {
                            cx: data.x,
                            cy: data.y,
                            r: circleRadius,
                            class: 'ct-point-circle'
                        });
                        data.element.replace(circle);
                    }
                }
            },
        };
        // Line with Area Chart 2 Ends
        // Line with Area Chart 3 Starts
        this.lineArea3 = {
            type: 'Line',
            data: data['lineArea3'],
            options: {
                low: 0,
                showArea: true,
                fullWidth: true,
                onlyInteger: true,
                axisY: {
                    low: 0,
                    scaleMinSpace: 50,
                }
            },
            events: {
                created: function (data) {
                    var defs = data.svg.elem('defs');
                    defs.elem('linearGradient', {
                        id: 'gradient',
                        x1: 0,
                        y1: 1,
                        x2: 0,
                        y2: 0
                    }).elem('stop', {
                        offset: 0,
                        'stop-color': 'rgba(255, 255, 255, 1)'
                    }).parent().elem('stop', {
                        offset: 1,
                        'stop-color': 'rgba(38, 198, 218, 1)'
                    });
                },
                draw: function (data) {
                    var circleRadius = 6;
                    if (data.type === 'point') {
                        var circle = new Chartist.Svg('circle', {
                            cx: data.x,
                            cy: data.y,
                            r: circleRadius,
                            class: 'ct-point-circle'
                        });
                        data.element.replace(circle);
                    }
                }
            },
        };
        // Line with Area Chart 3 Ends
        // Line with Area Chart 4 Starts
        this.lineArea4 = {
            type: 'Line',
            data: data['lineArea4'],
            options: {
                // low: 650,
                low: 0,
                showArea: true,
                fullWidth: true,
            },
        };
        // Line with Area Chart 4 Ends
        // Line Chart 1 Starts
        this.lineChart1 = {
            type: 'Line', data: data['line1'],
            options: {
                axisX: {
                    showGrid: false,
                },
                axisY: {
                    low: 0,
                    scaleMinSpace: 50,
                },
                fullWidth: true,
                chartPadding: { top: 0, right: 25, bottom: 0, left: 0 }
            },
        };
        // Line Chart 1 Ends
        // Line Chart 2 Starts
        this.lineChart2 = {
            type: 'Line', data: data['line2'],
            options: {
                axisX: {
                    showGrid: false,
                },
                axisY: {
                    low: 0,
                    scaleMinSpace: 50,
                },
                fullWidth: true,
                chartPadding: { top: 0, right: 25, bottom: 0, left: 0 },
            },
            responsiveOptions: [
                ['screen and (max-width: 640px) and (min-width: 381px)', {
                        axisX: {
                            labelInterpolationFnc: function (value, index) {
                                return index % 2 === 0 ? value : null;
                            }
                        }
                    }],
                ['screen and (max-width: 380px)', {
                        axisX: {
                            labelInterpolationFnc: function (value, index) {
                                return index % 3 === 0 ? value : null;
                            }
                        }
                    }]
            ],
            events: {
                draw: function (data) {
                    var circleRadius = 6;
                    if (data.type === 'point') {
                        var circle = new Chartist.Svg('circle', {
                            cx: data.x,
                            cy: data.y,
                            r: circleRadius,
                            class: 'ct-point-circle'
                        });
                        data.element.replace(circle);
                    }
                }
            },
        };
        // Line Chart 2 Ends
        // Line Chart 3 Starts
        this.lineChart3 = {
            type: 'Line', data: data['Line3'], options: {
                axisX: { showGrid: false }, axisY: {
                    scaleMinSpace: 30,
                }, fullWidth: true,
                chartPadding: { top: 0, right: 50, bottom: 0, left: 0 },
            },
            responsiveOptions: [
                ['screen and (max-width: 640px) and (min-width: 381px)', {
                        axisX: {
                            labelInterpolationFnc: function (value, index) {
                                return index % 2 === 0 ? value : null;
                            }
                        }
                    }],
                ['screen and (max-width: 380px)', {
                        axisX: {
                            labelInterpolationFnc: function (value, index) {
                                return index % 3 === 0 ? value : null;
                            }
                        }
                    }]
            ],
        };
        // Line Chart 3 Ends
        // Scatter Line Chart Starts
        this.scatterlineChart = {
            type: 'Line', data: data['ScatterLine'], options: {
                axisX: { showGrid: false }, axisY: {
                    scaleMinSpace: 30,
                }, fullWidth: true,
            },
            responsiveOptions: [
                ['screen and (max-width: 640px) and (min-width: 381px)', {
                        axisX: {
                            labelInterpolationFnc: function (value, index) {
                                return index % 2 === 0 ? value : null;
                            }
                        }
                    }],
                ['screen and (max-width: 380px)', {
                        axisX: {
                            labelInterpolationFnc: function (value, index) {
                                return index % 3 === 0 ? value : null;
                            }
                        }
                    }]
            ],
        };
        // Scatter Line Chart Ends
        // Scatter Chart Starts
        this.scatterChart = {
            type: 'Line',
            data: data['Scatter'],
            options: {
                showLine: false,
                axisX: {
                    labelInterpolationFnc: function (value, index) {
                        return index % 13 === 0 ? "W" + value : null;
                    },
                    showGrid: false
                },
                axisY: {
                    scaleMinSpace: 30,
                }
            },
            responsiveOptions: [
                [
                    'screen and (min-width: 640px)',
                    {
                        axisX: {
                            labelInterpolationFnc: function (value, index) {
                                return index % 4 === 0 ? "W" + value : null;
                            }
                        }
                    }
                ]
            ]
        };
        // Scatter Chart Ends
        // Bi-polar Line Chart Starts
        this.biPolarLineChart = {
            type: 'Line',
            data: data['Bi-PolarLine'],
            options: {
                high: 3,
                low: -3,
                showArea: true,
                showLine: false,
                showPoint: false,
                fullWidth: true,
                axisX: {
                    showGrid: false,
                    offset: 100,
                    labelInterpolationFnc: function (value, index) {
                        return index % 2 === 0 ? value : null;
                    }
                },
                axisY: {
                    scaleMinSpace: 30,
                }
            }
        };
        // Bi-polar Line Chart Ends
        // Bar Chart Starts
        this.barChart = {
            type: 'Bar',
            data: data['Bar'],
            options: {
                seriesBarDistance: 21,
                axisX: {
                    showGrid: false, offset: 100
                },
                axisY: {
                    scaleMinSpace: 30,
                }
            },
        };
        // Bar Chart Ends
        // Distributed Series Bar Chart Starts
        this.distributedSeriesBarChart = {
            type: 'Bar',
            data: data['DistributedSeries'],
            options: {
                showGrid: false,
                distributeSeries: true,
                axisY: {
                    scaleMinSpace: 30,
                }
            },
        };
        // Distributed Series Bar Chart Ends
        // Donut Chart 1 Starts
        this.donutChart1 = {
            type: 'Pie',
            data: data['donut'],
            options: {
                donut: true,
                donutWidth: 60,
                startAngle: 270,
                total: 200,
                showLabel: true,
            },
        };
        // Donut Chart 1 Ends
        // Donut Chart 2 Starts
        this.donutChart2 = {
            type: 'Pie',
            data: data['donut'],
            options: {
                donut: true,
                showLabel: true,
                labelDirection: 'implode',
            },
        };
        // Donut Chart 2 Ends
    }
    ChartistComponent = __decorate([
        core_1.Component({
            selector: 'app-chartist',
            templateUrl: './chartist.component.html',
            styleUrls: ['./chartist.component.scss'],
        })
    ], ChartistComponent);
    return ChartistComponent;
}());
exports.ChartistComponent = ChartistComponent;
//# sourceMappingURL=chartist.component.js.map