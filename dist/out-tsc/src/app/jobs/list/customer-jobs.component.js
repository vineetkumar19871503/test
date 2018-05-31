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
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/common/http");
var common_1 = require("@angular/common");
var CustomerJobsComponent = (function () {
    // constructor
    function CustomerJobsComponent(activeRoute, httpService, modalService, router, titleService, _location) {
        this.activeRoute = activeRoute;
        this.httpService = httpService;
        this.modalService = modalService;
        this.router = router;
        this.titleService = titleService;
        this._location = _location;
        // variables definition
        this.apiMsg = 'Loading...';
        this.error = '';
        this.jobs = [];
        this.loading = false;
        this.pageTitle = 'All Jobs';
        this.temp = [];
        this.url = environment_1.environment.apiUrl + 'jobs/jobListByCustomerid';
        // setting page title
        this.titleService.setTitle(this.pageTitle);
    }
    CustomerJobsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeRoute.params.subscribe(function (params) {
            if (params.id !== undefined) {
                var idArr = params.id.split('__');
                _this._id = idArr[0];
            }
            else {
                // this.router.navigate(['/quotes/all']);
            }
        });
        this._getJobs();
    };
    CustomerJobsComponent.prototype.onActionClick = function (e, type, params) {
        e.stopPropagation();
        switch (type) {
            case 'add':
                {
                    this.router.navigate(['/customers/add/' + params]);
                    break;
                }
                ;
            case 'joblist':
                {
                    this.router.navigate(['/jobs/jobListByCustomerid/' + params]);
                    break;
                }
                ;
            default: return false;
        }
        return false;
    };
    CustomerJobsComponent.prototype._getJobs = function () {
        var self = this;
        self.loading = true;
        var httpParams = new http_1.HttpParams();
        var params = httpParams.set('id', this._id);
        this.httpService.get(this.url, params)
            .then(function (res) {
            self.loading = false;
            self.jobs = res.data;
            self.apiMsg = self.jobs.length > 0 ? '' : 'No jobs found!';
        })
            .catch(function (err) {
            self.loading = false;
            self.apiMsg = '';
            self.error = 'Error occurred!';
        });
    };
    // private onActionClick(e, type, params) {
    //   e.stopPropagation();
    //   switch (type) {
    //     case 'detail': {
    //       this.jobDetail = params;
    //       this._openModal(this.jobDetailView);
    //       break;
    //     };
    //     case 'add': {
    //       this.router.navigate(['/jobs/add/' + params]);
    //       break;
    //     };
    //     case 'edit': {
    //       this.router.navigate(['/jobs/add/' + params]);
    //       break;
    //     };
    //     case 'delete': {
    //       break;
    //     };
    //     default: return false;
    //   }
    //   return false;
    // }
    CustomerJobsComponent.prototype._openModal = function (content) {
        this.modalService.open(content).result.then(function (result) {
            // do something on close
        }, function (reason) {
        });
    };
    CustomerJobsComponent.prototype.updateFilter = function (event) {
        var val = event.target.value.toLowerCase();
        // filter our data
        var temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.jobs = temp;
        // Whenever the filter changes, always go back to the first page
        // this.table.offset = 0;
    };
    CustomerJobsComponent.prototype.backClicked = function () {
        this._location.back();
    };
    __decorate([
        core_1.ViewChild('jobDetailView'),
        __metadata("design:type", core_1.TemplateRef)
    ], CustomerJobsComponent.prototype, "jobDetailView", void 0);
    CustomerJobsComponent = __decorate([
        core_1.Component({
            selector: 'app-all-jobs',
            templateUrl: './customer-jobs-list.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            HttpServices_1.default,
            ng_bootstrap_1.NgbModal,
            router_1.Router,
            platform_browser_1.Title,
            common_1.Location])
    ], CustomerJobsComponent);
    return CustomerJobsComponent;
}());
exports.CustomerJobsComponent = CustomerJobsComponent;
//# sourceMappingURL=customer-jobs.component.js.map