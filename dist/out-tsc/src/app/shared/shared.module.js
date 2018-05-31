"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var customizer_component_1 = require("./customizer/customizer.component");
var footer_component_1 = require("./footer/footer.component");
var navbar_component_1 = require("./navbar/navbar.component");
var ngx_loading_1 = require("ngx-loading");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var sidebar_component_1 = require("./sidebar/sidebar.component");
var toggle_fullscreen_directive_1 = require("./directives/toggle-fullscreen.directive");
var core_2 = require("@ngx-translate/core");
var ng2_file_upload_1 = require("ng2-file-upload");
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            exports: [
                common_1.CommonModule,
                customizer_component_1.CustomizerComponent,
                footer_component_1.FooterComponent,
                navbar_component_1.NavbarComponent,
                ng_bootstrap_1.NgbModule,
                sidebar_component_1.SidebarComponent,
                toggle_fullscreen_directive_1.ToggleFullscreenDirective,
                core_2.TranslateModule,
                ng2_file_upload_1.FileSelectDirective
            ],
            imports: [
                common_1.CommonModule,
                ngx_loading_1.LoadingModule,
                ng_bootstrap_1.NgbModule,
                router_1.RouterModule,
                core_2.TranslateModule
            ],
            declarations: [
                customizer_component_1.CustomizerComponent,
                footer_component_1.FooterComponent,
                navbar_component_1.NavbarComponent,
                sidebar_component_1.SidebarComponent,
                toggle_fullscreen_directive_1.ToggleFullscreenDirective,
                ng2_file_upload_1.FileSelectDirective
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map