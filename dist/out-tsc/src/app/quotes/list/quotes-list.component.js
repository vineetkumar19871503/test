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
var core_1 = require("@angular/core");
var environment_1 = require("environments/environment");
var HttpServices_1 = require("../../shared/services/HttpServices");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var QuotesListComponent = (function () {
    // constructor
    function QuotesListComponent(httpService, modalService, router, titleService, toastr) {
        this.httpService = httpService;
        this.modalService = modalService;
        this.router = router;
        this.titleService = titleService;
        this.toastr = toastr;
        // variables definition
        this.apiMsg = 'Loading...';
        this.error = '';
        this.quotes = [];
        this.quotesWithStatus = [];
        this.loading = false;
        this.pageTitle = 'Quotes';
        this.temp = [];
        this.url = environment_1.environment.apiUrl + 'quotes';
        // setting page title
        this.titleService.setTitle(this.pageTitle);
    }
    QuotesListComponent.prototype.ngOnInit = function () {
        this._getQuotesCountByCustomer();
    };
    QuotesListComponent.prototype._getQuotesCountByCustomer = function () {
        var self = this;
        self.loading = true;
        this.httpService.get(this.url + '/getQuotesCountByCustomer')
            .then(function (res) {
            self.loading = false;
            self.quotes = res.data;
        })
            .catch(function (err) {
            self.loading = false;
            self.apiMsg = '';
            self.error = 'Error occurred!';
        });
    };
    // quotesWithStatus
    // commong method to open popup
    QuotesListComponent.prototype.openModal = function (modalTpl) {
        this.modalRef = this.modalService.open(modalTpl);
        this.modalRef.result.then(function (result) {
            // do something on close
        }, function (reason) {
        });
    };
    // open modal to show quotes with status
    QuotesListComponent.prototype.openQuoteStatusModal = function (modalTpl, cId) {
        var self = this;
        self.loading = true;
        this.httpService.get(this.url + '/getAllQuotesByCustomerId?c_id=' + cId)
            .then(function (res) {
            self.loading = false;
            self.quotesWithStatus = res.data;
            self.openModal(modalTpl);
        })
            .catch(function (err) {
            self.loading = false;
            self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
        });
    };
    QuotesListComponent.prototype._openModal = function (content) {
        this.modalService.open(content).result.then(function (result) {
            // do something on close
        }, function (reason) {
        });
    };
    QuotesListComponent.prototype.updateFilter = function (event) {
        var val = event.target.value.toLowerCase();
        // filter our data
        var temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.quotes = temp;
        // Whenever the filter changes, always go back to the first page
        // this.table.offset = 0;
    };
    __decorate([
        core_1.ViewChild('jobDetailView'),
        __metadata("design:type", core_1.TemplateRef)
    ], QuotesListComponent.prototype, "jobDetailView", void 0);
    QuotesListComponent = __decorate([
        core_1.Component({
            selector: 'app-all-quote',
            templateUrl: './quotes-list.component.html',
            styleUrls: ['./quotes-list.component.scss']
        }),
        __metadata("design:paramtypes", [HttpServices_1.default,
            ng_bootstrap_1.NgbModal,
            router_1.Router,
            platform_browser_1.Title,
            ng2_toastr_1.ToastsManager])
    ], QuotesListComponent);
    return QuotesListComponent;
}());
exports.QuotesListComponent = QuotesListComponent;
//# sourceMappingURL=quotes-list.component.js.map