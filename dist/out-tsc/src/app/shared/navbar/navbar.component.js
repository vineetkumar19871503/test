"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_service_1 = require("../auth/auth.service");
var core_1 = require("@angular/core");
var environment_1 = require("environments/environment");
var http_1 = require("@angular/common/http");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var core_2 = require("@ngx-translate/core");
var NavbarComponent = (function () {
    function NavbarComponent(_authService, http, toastr, translate) {
        this._authService = _authService;
        this.http = http;
        this.toastr = toastr;
        this.translate = translate;
        this.currentLang = 'en';
        this.toggleClass = 'ft-maximize';
        this.loading = false;
        this.url = environment_1.environment.apiUrl + 'users/logout';
        var browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : 'en');
    }
    NavbarComponent.prototype.ChangeLanguage = function (language) {
        this.translate.use(language);
    };
    NavbarComponent.prototype.ToggleClass = function () {
        this.toggleClass = this.toggleClass === 'ft-maximize' ? 'ft-minimize' : 'ft-maximize';
    };
    NavbarComponent.prototype.logout = function () {
        var self = this;
        var headers = new http_1.HttpHeaders();
        this.loading = true;
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', 'Bearer ' + this._authService.getUserData('token'));
        this.http.get(this.url, { headers: headers })
            .subscribe(function (res) {
            this._authService.logout();
            self.loading = false;
        }, function (err) {
            self.loading = false;
            self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
        });
    };
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'app-navbar',
            templateUrl: './navbar.component.html',
            styleUrls: ['./navbar.component.scss']
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService,
            http_1.HttpClient,
            ng2_toastr_1.ToastsManager,
            core_2.TranslateService])
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map