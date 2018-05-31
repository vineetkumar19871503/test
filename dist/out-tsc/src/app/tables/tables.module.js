"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ng2_smart_table_1 = require("ng2-smart-table");
var tables_routing_module_1 = require("./tables-routing.module");
var extended_table_component_1 = require("./extended/extended-table.component");
var regular_table_component_1 = require("./regular/regular-table.component");
var smart_data_table_component_1 = require("./smart-data-table/smart-data-table.component");
var TablesModule = (function () {
    function TablesModule() {
    }
    TablesModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                tables_routing_module_1.TablesRoutingModule,
                ng2_smart_table_1.Ng2SmartTableModule
            ],
            declarations: [
                extended_table_component_1.ExtendedTableComponent,
                regular_table_component_1.RegularTableComponent,
                smart_data_table_component_1.SmartTableComponent
            ]
        })
    ], TablesModule);
    return TablesModule;
}());
exports.TablesModule = TablesModule;
//# sourceMappingURL=tables.module.js.map