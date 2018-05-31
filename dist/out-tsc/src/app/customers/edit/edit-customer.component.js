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
var router_1 = require("@angular/router");
var auth_service_1 = require("./../../shared/auth/auth.service");
var CommonServices_1 = require("../../shared/services/CommonServices");
var core_1 = require("@angular/core");
var environment_1 = require("../../../environments/environment");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var HttpServices_1 = require("../../shared/services/HttpServices");
var core_2 = require("@agm/core");
var platform_browser_1 = require("@angular/platform-browser");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var EditCustomerComponent = (function () {
    // constructor
    function EditCustomerComponent(activeRoute, authService, commonServices, _fb, httpService, mapsAPILoader, ngZone, titleService, toastr, router) {
        this.activeRoute = activeRoute;
        this.authService = authService;
        this.commonServices = commonServices;
        this._fb = _fb;
        this.httpService = httpService;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.titleService = titleService;
        this.toastr = toastr;
        this.router = router;
        this.loading = false;
        this.url = environment_1.environment.apiUrl + 'customers/edit';
        this._addType = null;
        this.logdata = null;
        this.titleService.setTitle(environment_1.environment.siteName + ' - Add customer');
    }
    EditCustomerComponent.prototype.ngOnInit = function () {
        var _this = this;
        var self = this, userDetails = self.authService.getUserData('user');
        this.addcustomerForm = new forms_1.FormGroup({
            'org_name': new forms_1.FormControl('', [forms_1.Validators.required, , self.commonServices.noWhitespaceValidator]),
            'c_id': new forms_1.FormControl('', [forms_1.Validators.required, , self.commonServices.noWhitespaceValidator]),
            'customer_id': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required, , self.commonServices.noWhitespaceValidator, forms_1.Validators.maxLength(4)]),
            'contact_details': this._fb.array([]),
            'cust_logs': new forms_1.FormGroup({
                'uid': new forms_1.FormControl(userDetails._id, [forms_1.Validators.required, self.commonServices.noWhitespaceValidator]),
                'name': new forms_1.FormControl(userDetails.fname + ' ' + userDetails.lname, [forms_1.Validators.required, self.commonServices.noWhitespaceValidator]),
                'notes': new forms_1.FormControl('', [forms_1.Validators.required, self.commonServices.noWhitespaceValidator])
            }),
            'org_address': new forms_1.FormControl('', [forms_1.Validators.required, self.commonServices.noWhitespaceValidator])
        });
        this.activeRoute.params.subscribe(function (params) {
            if (params.id !== undefined) {
                _this._addType = 'customer';
                var idArr = params.id.split('__');
                _this._id = idArr[0];
            }
            else {
                self.toastr.error('Please provide customer id!', 'Error!', { 'toastLife': 5000 });
                _this.router.navigate(['/quotes/list']);
            }
        });
        this.getCustomerDetails();
    };
    // calls the api to add customer
    EditCustomerComponent.prototype.addcustomer = function (data) {
        var self = this;
        if (self.addcustomerForm.valid) {
            self.loading = true;
            this.httpService.post(this.url, data)
                .then(function (res) {
                self.loading = false;
                self.toastr.success(res.message, 'Success!', { 'toastLife': 5000 });
                self.router.navigate(['/quotes/list']);
            })
                .catch(function (err) {
                self.loading = false;
                self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
            });
        }
        else {
            self.toastr.error('There are some invalid fields in the form', 'Error!', { 'toastLife': 5000 });
        }
    };
    EditCustomerComponent.prototype.addCusomersLogs = function (data) {
        var self = this;
        self.loading = true;
        this.httpService.post(environment_1.environment.apiUrl + 'addCustomer_logs', data)
            .then(function (res) {
            self.loading = false;
            self.toastr.success(res.message, 'Success!', { 'toastLife': 5000 });
            self.addcustomerForm.reset();
        })
            .catch(function (err) {
            self.loading = false;
            self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
        });
    };
    // do the needful on form submit
    EditCustomerComponent.prototype.oncustomerFormSubmit = function (e) {
        var self = this;
        var formVal = Object.assign({}, this.addcustomerForm.value);
        self.commonServices.validateAllFormFields(this.addcustomerForm);
        this.addcustomer(formVal);
        // this.addCusomersLogs(formVal);
    };
    EditCustomerComponent.prototype.initLineItem = function (options) {
        return this._fb.group({
            name: ['', []],
            phone: ['', []],
            email: ['', []],
            description: ['', []]
        });
    };
    EditCustomerComponent.prototype.getCustomerDetails = function () {
        var self = this;
        self.loading = true;
        var httpParams = new http_1.HttpParams();
        var params = httpParams.set('id', this._id);
        var url = environment_1.environment.apiUrl + 'customers';
        /**
       *  Init the line item for the form builder
       */
        var custDetailsArr = self.addcustomerForm.get('contact_details');
        this.httpService.get(url, params)
            .then(function (customer) {
            self.loading = false;
            if (customer.data.length) {
                customer = customer.data[0];
                self.custLogData = customer.cust_logs;
                self.addcustomerForm.patchValue({
                    org_name: customer.org_name,
                    org_address: customer.org_address,
                    c_id: customer._id,
                    customer_id: customer.customer_id
                });
                self._initCustomerDetailsArr(customer.contact_details);
            }
            else {
                self.toastr.error('Customer not found!', 'Error!', { 'toastLife': 5000 });
                this.router.navigate(['/quotes/list']);
            }
        })
            .catch(function (err) {
            self.loading = false;
            self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
        });
    };
    EditCustomerComponent.prototype.cancel = function () {
        if (confirm('All the changes you made will be discarded. Are you sure you want to cancel?')) {
            this.router.navigate(['/quotes/list']);
        }
        return false;
    };
    EditCustomerComponent.prototype._initCustomerDetailsArr = function (data) {
        var self = this;
        var custDetailsArr = self.addcustomerForm.get('contact_details');
        if (data && data.length) {
            data.forEach(function (lineItem, index) {
                custDetailsArr.push(new forms_1.FormGroup({
                    'name': new forms_1.FormControl(lineItem.name, [forms_1.Validators.required, self.commonServices.noWhitespaceValidator]),
                    'phone': new forms_1.FormControl(lineItem.phone, [forms_1.Validators.required, , self.commonServices.noWhitespaceValidator]),
                    'email': new forms_1.FormControl(lineItem.email, [forms_1.Validators.required, , self.commonServices.noWhitespaceValidator]),
                    'description': new forms_1.FormControl(lineItem.description, [forms_1.Validators.required, , self.commonServices.noWhitespaceValidator])
                }));
            });
        }
        else {
            self._addQuaryContactRow();
        }
    };
    EditCustomerComponent.prototype._addQuaryContactRow = function () {
        var self = this;
        this.addcustomerForm.get('contact_details').push(new forms_1.FormGroup({
            'name': new forms_1.FormControl('', [forms_1.Validators.required, self.commonServices.noWhitespaceValidator]),
            'phone': new forms_1.FormControl('', [forms_1.Validators.required, self.commonServices.noWhitespaceValidator]),
            'email': new forms_1.FormControl('', [forms_1.Validators.required, self.commonServices.noWhitespaceValidator]),
            'description': new forms_1.FormControl('', [forms_1.Validators.required, self.commonServices.noWhitespaceValidator])
        }));
        return false;
    };
    __decorate([
        core_1.ViewChild('search'),
        __metadata("design:type", String)
    ], EditCustomerComponent.prototype, "_id", void 0);
    EditCustomerComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-customer',
            templateUrl: './edit-customer.component.html',
            styleUrls: ['./edit-customer.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            auth_service_1.AuthService,
            CommonServices_1.default,
            forms_1.FormBuilder,
            HttpServices_1.default,
            core_2.MapsAPILoader,
            core_1.NgZone,
            platform_browser_1.Title,
            ng2_toastr_1.ToastsManager,
            router_1.Router])
    ], EditCustomerComponent);
    return EditCustomerComponent;
}());
exports.EditCustomerComponent = EditCustomerComponent;
//# sourceMappingURL=edit-customer.component.js.map