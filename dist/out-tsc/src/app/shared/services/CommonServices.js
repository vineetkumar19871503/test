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
var moment = require("moment");
var CommonServices = (function () {
    function CommonServices() {
        this._tz = -(new Date().getTimezoneOffset());
    }
    // validates all fields at a time
    CommonServices.prototype.validateAllFormFields = function (formGroup) {
        var self = this;
        Object.keys(formGroup.controls).forEach(function (field) {
            var control = formGroup.get(field);
            if (control instanceof forms_1.FormControl) {
                control.markAsTouched({ onlySelf: true });
            }
            else if (control instanceof forms_1.FormGroup || control instanceof forms_1.FormArray) {
                self.validateAllFormFields(control);
            }
        });
    };
    CommonServices.prototype.noWhitespaceValidator = function (control) {
        var isWhitespace = (control.value || '').trim().length === 0, isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    };
    CommonServices.prototype.disableAllFormFields = function (formGroup) {
        var self = this;
        Object.keys(formGroup.controls).forEach(function (field) {
            var control = formGroup.get(field);
            if (control instanceof forms_1.FormControl) {
                control.disable();
            }
            else if (control instanceof forms_1.FormGroup || control instanceof forms_1.FormArray) {
                self.disableAllFormFields(control);
            }
        });
    };
    CommonServices.prototype.compareDates = function (date1, operator, date2) {
        if (operator === void 0) { operator = 'eq'; }
        if (date2 === void 0) { date2 = new Date(); }
        var dt1 = moment(date1).format('DD/MM/YYYY'), dt2 = moment(date2).format('DD/MM/YYYY');
        var res = false;
        switch (operator) {
            case 'eq':
                res = dt1 === dt2;
                break;
            case 'gt':
                res = dt1 > dt2;
                break;
            case 'lt':
                res = dt1 < dt2;
                break;
            case 'gte':
                res = dt1 >= dt2;
                break;
            case 'lte':
                res = dt1 <= dt2;
                break;
        }
        return res;
    };
    CommonServices.prototype.convertToDate = function (date) {
        return new Date(date);
    };
    // takes y m d h m s in object and convert into date object
    CommonServices.prototype.convertObjToDate = function (date, defaultDate, tz) {
        if (defaultDate === void 0) { defaultDate = { year: 2000, month: 1, day: 1, h: 0, m: 0, s: 0 }; }
        date = Object.assign({}, defaultDate, date);
        date = new Date(date.year, date.month - 1, date.day, date.h, date.m, date.s);
        if (tz) {
            date.setMinutes(date.getMinutes() + this._tz);
        }
        return date;
    };
    CommonServices.prototype.extractDate = function (date) {
        var dt = moment(new Date(date), 'YYYY/MM/DD');
        return {
            'day': parseInt(dt.format('D'), 10),
            'month': parseInt(dt.format('M'), 10),
            'year': parseInt(dt.format('YYYY'), 10)
        };
    };
    CommonServices.prototype.convertMinToHours = function (min) {
        return {
            h: Math.floor(min / 60),
            m: parseInt(min, 10) % 60
        };
    };
    CommonServices.prototype.getToday = function (extract) {
        if (extract === void 0) { extract = false; }
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        if (extract) {
            return {
                'year': today.getFullYear(),
                'month': today.getMonth() + 1,
                'day': today.getDate()
            };
        }
        return today;
    };
    CommonServices.prototype.getTruckDetails = function () {
        var truckTypes = [
            { 'name': 'Ten-Wheeler', 'value': 'TW' },
            { 'name': 'Super Dumps', 'value': 'SD' },
            { 'name': 'End Dumps', 'value': 'ED' },
            { 'name': 'Doubles Bottoms', 'value': 'DB' },
            { 'name': 'Transfers', 'value': 'TS' },
            { 'name': 'Highsides', 'value': 'HS' },
        ];
        return truckTypes;
    };
    CommonServices = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], CommonServices);
    return CommonServices;
}());
exports.default = CommonServices;
//# sourceMappingURL=CommonServices.js.map