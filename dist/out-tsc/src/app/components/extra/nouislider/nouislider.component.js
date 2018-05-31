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
var forms_1 = require("@angular/forms");
var TimeFormatter = (function () {
    function TimeFormatter() {
    }
    TimeFormatter.prototype.to = function (value) {
        var h = Math.floor(value / 3600);
        var m = Math.floor(value % 3600 / 60);
        var s = value - 60 * m - 3600 * h;
        var values = [h, m, s];
        var timeString = '';
        var i = 0;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var v = values_1[_i];
            if (values[i] < 10)
                timeString += '0';
            timeString += values[i].toFixed(0);
            if (i < 2) {
                timeString += ':';
            }
            i++;
        }
        return timeString;
    };
    ;
    TimeFormatter.prototype.from = function (value) {
        var v = value.split(':').map(parseInt);
        var time = 0;
        time += v[0] * 3600;
        time += v[1] * 60;
        time += v[2];
        return time;
    };
    return TimeFormatter;
}());
exports.TimeFormatter = TimeFormatter;
var NouiSliderComponent = (function () {
    function NouiSliderComponent(formBuilder) {
        var _this = this;
        this.formBuilder = formBuilder;
        // Variable Declaration
        this.disabled = false;
        this.keyupLabelOn = false;
        this.keydownLabelOn = false;
        this.someValue = 5;
        this.someMin = -10;
        this.someMax = 10;
        this.someRange = [3, 7];
        this.someRange2 = [10, 15];
        this.someRange3 = [2, 8];
        this.someTime = 0;
        this.someRange2config = {
            behaviour: 'drag',
            connect: true,
            margin: 1,
            limit: 5,
            range: {
                min: 0,
                max: 20
            },
            pips: {
                mode: 'steps',
                density: 5
            }
        };
        // Keyboard Support
        this.someKeyboard = [1, 3];
        // Keyboard Support Configuration
        this.someKeyboardConfig = {
            behaviour: 'drag',
            connect: true,
            start: [0, 5],
            keyboard: true,
            step: 0.1,
            pageSteps: 10,
            range: {
                min: 0,
                max: 5
            },
            pips: {
                mode: 'count',
                density: 2,
                values: 6,
                stepped: true
            }
        };
        // With Custom Key Handler
        this.someKeyboard2 = [1, 3];
        // With Custom Key Handler Support
        this.someTimeConfig = {
            start: 86400 / 2,
            range: {
                min: 0,
                max: 86399
            },
            tooltips: new TimeFormatter(),
            step: 1
        };
        // EventHandler
        this.someKeyboard2EventHandler = function (e) {
            //your code here
            // determine which handle triggered the event
            var index = parseInt(e.target.getAttribute('data-handle'));
            var multiplier = 0;
            var stepSize = 0.1;
            switch (e.which) {
                case 40: // ArrowDown
                case 37:// ArrowLeft
                    multiplier = -2;
                    e.preventDefault();
                    break;
                case 38: // ArrowUp
                case 39:// ArrowRight
                    multiplier = 3;
                    e.preventDefault();
                    break;
                default:
                    break;
            }
            var delta = multiplier * stepSize;
            var newValue = [].concat(_this.someKeyboard2);
            newValue[index] += delta;
            _this.someKeyboard2 = newValue;
        };
        this.someKeyboardConfig2 = {
            behaviour: 'drag',
            connect: true,
            start: [0, 5],
            step: 0.1,
            range: {
                min: 0,
                max: 5
            },
            pips: {
                mode: 'count',
                density: 2,
                values: 6,
                stepped: true
            },
            keyboard: true,
            onKeydown: this.someKeyboard2EventHandler,
        };
    }
    NouiSliderComponent.prototype.ngOnInit = function () {
        this.form1 = this.formBuilder.group({ 'single': [10] });
        this.form2 = this.formBuilder.group({ 'range': [[2, 8]] });
    };
    NouiSliderComponent = __decorate([
        core_1.Component({
            selector: 'app-nouislider',
            templateUrl: './nouislider.component.html',
            styleUrls: ['./nouislider.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder])
    ], NouiSliderComponent);
    return NouiSliderComponent;
}());
exports.NouiSliderComponent = NouiSliderComponent;
//# sourceMappingURL=nouislider.component.js.map