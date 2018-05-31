"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var extended_table_component_1 = require("./extended/extended-table.component");
var regular_table_component_1 = require("./regular/regular-table.component");
var smart_data_table_component_1 = require("./smart-data-table/smart-data-table.component");
var routes = [
    {
        path: '',
        children: [
            {
                path: 'smart',
                component: smart_data_table_component_1.SmartTableComponent,
                data: {
                    title: 'Smart Table'
                }
            },
            {
                path: 'extended',
                component: extended_table_component_1.ExtendedTableComponent,
                data: {
                    title: 'Extended Table'
                }
            },
            {
                path: 'regular',
                component: regular_table_component_1.RegularTableComponent,
                data: {
                    title: 'Regular Table'
                }
            },
        ]
    }
];
var TablesRoutingModule = (function () {
    function TablesRoutingModule() {
    }
    TablesRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule],
        })
    ], TablesRoutingModule);
    return TablesRoutingModule;
}());
exports.TablesRoutingModule = TablesRoutingModule;
//# sourceMappingURL=tables-routing.module.js.map