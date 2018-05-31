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
var auth_service_1 = require("../../shared/auth/auth.service");
var core_1 = require("@angular/core");
var environment_1 = require("environments/environment");
var HttpServices_1 = require("../../shared/services/HttpServices");
var platform_browser_1 = require("@angular/platform-browser");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var CustomerListComponent = (function () {
    // constructor
    function CustomerListComponent(_authService, httpService, titleService, toastr) {
        this._authService = _authService;
        this.httpService = httpService;
        this.titleService = titleService;
        this.toastr = toastr;
        // variables definition
        this.url = environment_1.environment.apiUrl + 'customers';
        this.columns = [];
        this.customers = [];
        this.loading = false;
        // setting page title
        this.titleService.setTitle('Customers');
    }
    CustomerListComponent.prototype.ngOnInit = function () {
        this.columns = [
            {
                prop: 'cust_name',
                name: 'Customer Name',
                cellTemplate: this.nameTpl
            },
            {
                prop: 'cust_email',
                name: 'Email'
            },
            {
                prop: 'cust_contact',
                name: 'Contact'
            },
            {
                prop: 'cust_country',
                name: 'Country'
            }
        ];
        this._getCustomers();
    };
    CustomerListComponent.prototype._getCustomers = function () {
        var self = this;
        this.httpService.get(this.url)
            .then(function (res) {
            self.loading = false;
            self.customers = res.data;
        })
            .catch(function (err) {
            self.loading = false;
            self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
        });
    };
    __decorate([
        core_1.ViewChild('nameTpl'),
        __metadata("design:type", core_1.TemplateRef)
    ], CustomerListComponent.prototype, "nameTpl", void 0);
    CustomerListComponent = __decorate([
        core_1.Component({
            selector: 'app-customer-list',
            templateUrl: './customer-list.component.html',
            styleUrls: ['./customer-list.component.scss']
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService,
            HttpServices_1.default,
            platform_browser_1.Title,
            ng2_toastr_1.ToastsManager])
    ], CustomerListComponent);
    return CustomerListComponent;
}());
exports.CustomerListComponent = CustomerListComponent;
//# sourceMappingURL=customer-list.component.js.map