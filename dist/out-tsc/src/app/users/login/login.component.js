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
var auth_service_1 = require("./../../shared/auth/auth.service");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var environment_1 = require("../../../environments/environment");
var forms_1 = require("@angular/forms");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var platform_browser_1 = require("@angular/platform-browser");
var LoginComponent = (function () {
    // constructor
    function LoginComponent(_authService, _fb, http, router, titleService, toastr) {
        this._authService = _authService;
        this._fb = _fb;
        this.http = http;
        this.router = router;
        this.titleService = titleService;
        this.toastr = toastr;
        // variables definition
        this.loading = false;
        this.url = environment_1.environment.apiUrl + 'users/login';
        this.titleService.setTitle(environment_1.environment.siteName + ' - Login');
    }
    LoginComponent.prototype.ngOnInit = function () {
        var self = this;
        this.loginForm = new forms_1.FormGroup({
            'email': new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.email]),
            'password': new forms_1.FormControl('', [forms_1.Validators.required])
        });
    };
    // do the needful on form submit
    LoginComponent.prototype.login = function (e) {
        var self = this;
        self.loading = true;
        self.validateAllFormFields(this.loginForm);
        var headers = new http_1.HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        if (this.loginForm.valid) {
            // call login api
            this.http.post(this.url, self.loginForm.value, { headers: headers })
                .subscribe(function (res) {
                self.loading = false;
                var userData = res.data, token = res.token;
                if (Object.keys(userData).length) {
                    self._authService.login({
                        'user': userData,
                        'token': token
                    });
                    self.router.navigate(['/dashboard']);
                }
                else {
                    self.toastr.error('Email or Password is incorrect!', 'Login unsuccessful!', { 'toastLife': 5000 });
                    self.loginForm.reset();
                }
            }, function (err) {
                self.loading = false;
                self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
            });
        }
    };
    // on form submit, it checks validation rules for all fields
    LoginComponent.prototype.validateAllFormFields = function (formGroup) {
        var _this = this;
        Object.keys(formGroup.controls).forEach(function (field) {
            var control = formGroup.get(field);
            if (control instanceof forms_1.FormControl) {
                control.markAsTouched({ onlySelf: true });
            }
            else if (control instanceof forms_1.FormGroup || control instanceof forms_1.FormArray) {
                _this.validateAllFormFields(control);
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService,
            forms_1.FormBuilder,
            http_1.HttpClient,
            router_1.Router,
            platform_browser_1.Title,
            ng2_toastr_1.ToastsManager])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map