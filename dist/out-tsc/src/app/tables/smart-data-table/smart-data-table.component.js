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
var tableData = require("../../shared/data/smart-data-table");
var ng2_smart_table_1 = require("ng2-smart-table");
var SmartTableComponent = (function () {
    function SmartTableComponent() {
        this.settings = tableData.settings;
        this.filtersettings = tableData.filtersettings;
        this.alertsettings = tableData.alertsettings;
        this.source = new ng2_smart_table_1.LocalDataSource(tableData.data); // create the source
        this.filterSource = new ng2_smart_table_1.LocalDataSource(tableData.filerdata); // create the source
        this.alertSource = new ng2_smart_table_1.LocalDataSource(tableData.alertdata); // create the source
    }
    // And the listener code which asks the DataSource to filter the data:
    SmartTableComponent.prototype.onSearch = function (query) {
        if (query === void 0) { query = ''; }
        this.source.setFilter([
            // fields we want to inclue in the search
            {
                field: 'id',
                search: query,
            },
            {
                field: 'name',
                search: query,
            },
            {
                field: 'username',
                search: query,
            },
            {
                field: 'email',
                search: query,
            },
        ], false);
        // second parameter specifying whether to perform 'AND' or 'OR' search 
        // (meaning all columns should contain search query or at least one)
        // 'AND' by default, so changing to 'OR' by setting false here
    };
    //  For confirm action On Delete
    SmartTableComponent.prototype.onDeleteConfirm = function (event) {
        if (window.confirm('Are you sure you want to delete?')) {
            event.confirm.resolve();
        }
        else {
            event.confirm.reject();
        }
    };
    //  For confirm action On Save
    SmartTableComponent.prototype.onSaveConfirm = function (event) {
        if (window.confirm('Are you sure you want to save?')) {
            event.newData['name'] += ' + added in code';
            event.confirm.resolve(event.newData);
        }
        else {
            event.confirm.reject();
        }
    };
    //  For confirm action On Create
    SmartTableComponent.prototype.onCreateConfirm = function (event) {
        if (window.confirm('Are you sure you want to create?')) {
            event.newData['name'] += ' + added in code';
            event.confirm.resolve(event.newData);
        }
        else {
            event.confirm.reject();
        }
    };
    SmartTableComponent = __decorate([
        core_1.Component({
            selector: 'app-smart-data-table',
            templateUrl: './smart-data-table.component.html',
            styleUrls: ['./smart-data-table.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [])
    ], SmartTableComponent);
    return SmartTableComponent;
}());
exports.SmartTableComponent = SmartTableComponent;
//# sourceMappingURL=smart-data-table.component.js.map