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
var dt_fullscreen_component_1 = require("./fullscreen/dt-fullscreen.component");
var dt_editing_component_1 = require("./editing/dt-editing.component");
var dt_filter_component_1 = require("./filter/dt-filter.component");
var dt_paging_component_1 = require("./paging/dt-paging.component");
var dt_pinning_component_1 = require("./pinning/dt-pinning.component");
var dt_selection_component_1 = require("./selection/dt-selection.component");
var dt_sorting_component_1 = require("./sorting/dt-sorting.component");
var dt_basic_component_1 = require("./basic/dt-basic.component");
var routes = [
    {
        path: '',
        children: [
            {
                path: 'fullscreen',
                component: dt_fullscreen_component_1.DTFullScreenComponent,
                data: {
                    title: 'Full Screen Data Table'
                }
            },
            {
                path: 'editing',
                component: dt_editing_component_1.DTEditingComponent,
                data: {
                    title: 'Editing Data Table'
                }
            },
            {
                path: 'filter',
                component: dt_filter_component_1.DTFilterComponent,
                data: {
                    title: 'Filter Data Table'
                }
            },
            {
                path: 'paging',
                component: dt_paging_component_1.DTPagingComponent,
                data: {
                    title: 'Paging Data Table'
                }
            },
            {
                path: 'pinning',
                component: dt_pinning_component_1.DTPinningComponent,
                data: {
                    title: 'Pinning Data Table'
                }
            },
            {
                path: 'selection',
                component: dt_selection_component_1.DTSelectionComponent,
                data: {
                    title: 'Selection Data Table'
                }
            },
            {
                path: 'sorting',
                component: dt_sorting_component_1.DTSortingComponent,
                data: {
                    title: 'Sorting Data Table'
                }
            },
            {
                path: 'basic',
                component: dt_basic_component_1.DTBasicComponent,
                data: {
                    title: 'Basic Data Table'
                }
            },
        ]
    }
];
var DataTablesRoutingModule = (function () {
    function DataTablesRoutingModule() {
    }
    DataTablesRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule],
        })
    ], DataTablesRoutingModule);
    return DataTablesRoutingModule;
}());
exports.DataTablesRoutingModule = DataTablesRoutingModule;
//# sourceMappingURL=data-tables-routing.module.js.map