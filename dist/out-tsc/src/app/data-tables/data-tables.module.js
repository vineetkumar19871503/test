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
var ngx_datatable_1 = require("@swimlane/ngx-datatable");
var data_tables_routing_module_1 = require("./data-tables-routing.module");
var dt_fullscreen_component_1 = require("./fullscreen/dt-fullscreen.component");
var dt_editing_component_1 = require("./editing/dt-editing.component");
var dt_filter_component_1 = require("./filter/dt-filter.component");
var dt_paging_component_1 = require("./paging/dt-paging.component");
var dt_pinning_component_1 = require("./pinning/dt-pinning.component");
var dt_selection_component_1 = require("./selection/dt-selection.component");
var dt_sorting_component_1 = require("./sorting/dt-sorting.component");
var dt_basic_component_1 = require("./basic/dt-basic.component");
var DataTablesModule = (function () {
    function DataTablesModule() {
    }
    DataTablesModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                data_tables_routing_module_1.DataTablesRoutingModule,
                ngx_datatable_1.NgxDatatableModule
            ],
            declarations: [
                dt_fullscreen_component_1.DTFullScreenComponent,
                dt_editing_component_1.DTEditingComponent,
                dt_filter_component_1.DTFilterComponent,
                dt_paging_component_1.DTPagingComponent,
                dt_pinning_component_1.DTPinningComponent,
                dt_selection_component_1.DTSelectionComponent,
                dt_sorting_component_1.DTSortingComponent,
                dt_basic_component_1.DTBasicComponent,
            ]
        })
    ], DataTablesModule);
    return DataTablesModule;
}());
exports.DataTablesModule = DataTablesModule;
//# sourceMappingURL=data-tables.module.js.map