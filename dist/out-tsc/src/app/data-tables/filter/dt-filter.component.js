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
var release_1 = require("@swimlane/ngx-datatable/release");
var data = require('../../shared/data/company.json');
var DTFilterComponent = (function () {
    function DTFilterComponent() {
        this.rows = [];
        this.temp = [];
        // Table Column Titles
        this.columns = [
            { prop: 'name' },
            { name: 'Company' },
            { name: 'Gender' }
        ];
        this.temp = data.slice();
        this.rows = data;
    }
    DTFilterComponent.prototype.updateFilter = function (event) {
        var val = event.target.value.toLowerCase();
        // filter our data
        var temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    };
    __decorate([
        core_1.ViewChild(release_1.DatatableComponent),
        __metadata("design:type", release_1.DatatableComponent)
    ], DTFilterComponent.prototype, "table", void 0);
    DTFilterComponent = __decorate([
        core_1.Component({
            selector: 'app-dt-filter',
            templateUrl: './dt-filter.component.html',
            styleUrls: ['./dt-filter.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], DTFilterComponent);
    return DTFilterComponent;
}());
exports.DTFilterComponent = DTFilterComponent;
//# sourceMappingURL=dt-filter.component.js.map