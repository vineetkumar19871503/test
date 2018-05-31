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
var inbox_routing_module_1 = require("./inbox-routing.module");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ngx_quill_1 = require("ngx-quill");
var inbox_component_1 = require("./inbox.component");
var InboxModule = (function () {
    function InboxModule() {
    }
    InboxModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                inbox_routing_module_1.InboxRoutingModule,
                ng_bootstrap_1.NgbModule,
                ngx_quill_1.QuillModule
            ],
            declarations: [
                inbox_component_1.InboxComponent
            ]
        })
    ], InboxModule);
    return InboxModule;
}());
exports.InboxModule = InboxModule;
//# sourceMappingURL=inbox.module.js.map