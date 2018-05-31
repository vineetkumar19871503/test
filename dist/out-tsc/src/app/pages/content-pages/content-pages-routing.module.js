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
var coming_soon_page_component_1 = require("./coming-soon/coming-soon-page.component");
var error_page_component_1 = require("./error/error-page.component");
var forgot_password_page_component_1 = require("./forgot-password/forgot-password-page.component");
var lock_screen_page_component_1 = require("./lock-screen/lock-screen-page.component");
var login_page_component_1 = require("./login/login-page.component");
var maintenance_page_component_1 = require("./maintenance/maintenance-page.component");
var register_page_component_1 = require("./register/register-page.component");
var routes = [
    {
        path: '',
        children: [
            {
                path: 'comingsoon',
                component: coming_soon_page_component_1.ComingSoonPageComponent,
                data: {
                    title: 'Coming Soon page'
                }
            },
            {
                path: 'error',
                component: error_page_component_1.ErrorPageComponent,
                data: {
                    title: 'Error Page'
                }
            },
            {
                path: 'forgotpassword',
                component: forgot_password_page_component_1.ForgotPasswordPageComponent,
                data: {
                    title: 'Forgot Password Page'
                }
            },
            {
                path: 'lockscreen',
                component: lock_screen_page_component_1.LockScreenPageComponent,
                data: {
                    title: 'Lock Screen page'
                }
            },
            {
                path: 'login',
                component: login_page_component_1.LoginPageComponent,
                data: {
                    title: 'Login Page'
                }
            },
            {
                path: 'maintenance',
                component: maintenance_page_component_1.MaintenancePageComponent,
                data: {
                    title: 'Maintenance Page'
                }
            },
            {
                path: 'register',
                component: register_page_component_1.RegisterPageComponent,
                data: {
                    title: 'Register Page'
                }
            }
        ]
    }
];
var ContentPagesRoutingModule = (function () {
    function ContentPagesRoutingModule() {
    }
    ContentPagesRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule],
        })
    ], ContentPagesRoutingModule);
    return ContentPagesRoutingModule;
}());
exports.ContentPagesRoutingModule = ContentPagesRoutingModule;
//# sourceMappingURL=content-pages-routing.module.js.map