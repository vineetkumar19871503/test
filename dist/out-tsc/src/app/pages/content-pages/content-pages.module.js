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
var forms_1 = require("@angular/forms");
var content_pages_routing_module_1 = require("./content-pages-routing.module");
var coming_soon_page_component_1 = require("./coming-soon/coming-soon-page.component");
var error_page_component_1 = require("./error/error-page.component");
var forgot_password_page_component_1 = require("./forgot-password/forgot-password-page.component");
var lock_screen_page_component_1 = require("./lock-screen/lock-screen-page.component");
var login_page_component_1 = require("./login/login-page.component");
var maintenance_page_component_1 = require("./maintenance/maintenance-page.component");
var register_page_component_1 = require("./register/register-page.component");
var ContentPagesModule = (function () {
    function ContentPagesModule() {
    }
    ContentPagesModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                content_pages_routing_module_1.ContentPagesRoutingModule,
                forms_1.FormsModule
            ],
            declarations: [
                coming_soon_page_component_1.ComingSoonPageComponent,
                error_page_component_1.ErrorPageComponent,
                forgot_password_page_component_1.ForgotPasswordPageComponent,
                lock_screen_page_component_1.LockScreenPageComponent,
                login_page_component_1.LoginPageComponent,
                maintenance_page_component_1.MaintenancePageComponent,
                register_page_component_1.RegisterPageComponent
            ]
        })
    ], ContentPagesModule);
    return ContentPagesModule;
}());
exports.ContentPagesModule = ContentPagesModule;
//# sourceMappingURL=content-pages.module.js.map