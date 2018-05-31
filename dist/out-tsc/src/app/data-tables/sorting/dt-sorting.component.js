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
var DTSortingComponent = (function () {
    function DTSortingComponent() {
        this.rows = [];
        this.columns = [
            { name: 'Company' },
            { name: 'Name' },
            { name: 'Gender' }
        ];
        this.rows = data;
    }
    DTSortingComponent = __decorate([
        core_1.Component({
            selector: 'app-dt-sorting',
            templateUrl: './dt-sorting.component.html',
            styleUrls: ['./dt-sorting.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], DTSortingComponent);
    return DTSortingComponent;
}());
exports.DTSortingComponent = DTSortingComponent;
//# sourceMappingURL=dt-sorting.component.js.map