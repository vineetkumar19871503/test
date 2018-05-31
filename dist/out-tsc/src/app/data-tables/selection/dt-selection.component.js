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
var data = require('../../shared/data/company.json');
var DTSelectionComponent = (function () {
    function DTSelectionComponent() {
        this.rows = [];
        this.selected = [];
        this.columns = [
            { prop: 'name' },
            { name: 'Company' },
            { name: 'Gender' }
        ];
        this.rows = data;
    }
    //  On select of dataTable's data row
    DTSelectionComponent.prototype.onSelect = function (event) {
        //your code here
    };
    //  On Activation of dataTable's data row
    DTSelectionComponent.prototype.onActivate = function (event) {
        //your code here
    };
    DTSelectionComponent = __decorate([
        core_1.Component({
            selector: 'app-dt-selection',
            templateUrl: './dt-selection.component.html',
            styleUrls: ['./dt-selection.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], DTSelectionComponent);
    return DTSelectionComponent;
}());
exports.DTSelectionComponent = DTSelectionComponent;
//# sourceMappingURL=dt-selection.component.js.map