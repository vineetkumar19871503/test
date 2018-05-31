"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@agm/core");
var app_component_1 = require("./app.component");
var app_routing_module_1 = require("./app-routing.module");
var auth_service_1 = require("./shared/auth/auth.service");
var auth_guard_service_1 = require("./shared/auth/auth-guard.service");
var auth_redirect_service_1 = require("./shared/auth/auth-redirect.service");
var animations_1 = require("@angular/platform-browser/animations");
var CommonServices_1 = require("./shared/services/CommonServices");
var content_layout_component_1 = require("./layouts/content/content-layout.component");
var custom_option_1 = require("./shared/toastr/custom-option");
var full_layout_component_1 = require("./layouts/full/full-layout.component");
var http_1 = require("@angular/common/http");
var HttpServices_1 = require("./shared/services/HttpServices");
var core_2 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var shared_module_1 = require("./shared/shared.module");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var core_3 = require("@ngx-translate/core");
var http_loader_1 = require("@ngx-translate/http-loader");
function createTranslateLoader(http) {
    return new http_loader_1.TranslateHttpLoader(http, './assets/i18n/', '.json');
}
exports.createTranslateLoader = createTranslateLoader;
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_2.NgModule({
            declarations: [
                app_component_1.AppComponent,
                content_layout_component_1.ContentLayoutComponent,
                full_layout_component_1.FullLayoutComponent
            ],
            imports: [
                // google map config
                core_1.AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyBr5_picK8YJK7fFR2CPzTVMj6GG1TtRGo'
                }),
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
                http_1.HttpClientModule,
                ng_bootstrap_1.NgbModule.forRoot(),
                shared_module_1.SharedModule,
                ng2_toastr_1.ToastModule.forRoot(),
                core_3.TranslateModule.forRoot({
                    loader: {
                        provide: core_3.TranslateLoader,
                        useFactory: (createTranslateLoader),
                        deps: [http_1.HttpClient]
                    }
                })
            ],
            providers: [
                // Toastr and auth providers
                { provide: ng2_toastr_1.ToastOptions, useClass: custom_option_1.CustomOption },
                auth_service_1.AuthService,
                auth_guard_service_1.AuthGuard,
                auth_redirect_service_1.AuthRedirect,
                CommonServices_1.default,
                HttpServices_1.default
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map