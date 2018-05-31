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
var ng2_dragula_1 = require("ng2-dragula");
var taskboard_routing_module_1 = require("./taskboard-routing.module");
var taskboard_component_1 = require("./taskboard.component");
var TaskboardModule = (function () {
    function TaskboardModule() {
    }
    TaskboardModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                taskboard_routing_module_1.TaskboardRoutingModule,
                ng2_dragula_1.DragulaModule
            ],
            declarations: [
                taskboard_component_1.TaskboardComponent
            ]
        })
    ], TaskboardModule);
    return TaskboardModule;
}());
exports.TaskboardModule = TaskboardModule;
//# sourceMappingURL=taskboard.module.js.map