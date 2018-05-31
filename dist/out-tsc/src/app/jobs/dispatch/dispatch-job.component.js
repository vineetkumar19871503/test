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
var CommonServices_1 = require("../../shared/services/CommonServices");
var environment_1 = require("../../../environments/environment");
var forms_1 = require("@angular/forms");
var HttpServices_1 = require("../../shared/services/HttpServices");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var platform_browser_1 = require("@angular/platform-browser");
var DispatchJobComponent = (function () {
    // constructor
    function DispatchJobComponent(commonServices, _fb, httpService, modalService, toastr, titleService) {
        this.commonServices = commonServices;
        this._fb = _fb;
        this.httpService = httpService;
        this.modalService = modalService;
        this.toastr = toastr;
        this.titleService = titleService;
        this.currentSelectedJob = null;
        this.dispatchJobs = [];
        this.isPastDate = false;
        this.jobs = [];
        this.importedJobs = [];
        this.actionLoader = false;
        this.loading = false;
        this.selectedJobsToImport = [];
        this.titleService.setTitle(environment_1.environment.siteName + ' - Dispatch Job');
        this.fdtVal = this.selectedDate = this.commonServices.getToday(true);
        this._manageActionsByDate(this.fdtVal);
    }
    DispatchJobComponent.prototype.ngOnInit = function () {
        // instantiate copy job form
        this.copyJobForm = this._fb.group({
            'job_id': new forms_1.FormControl(null, [forms_1.Validators.required]),
            'job_name': new forms_1.FormControl(null, [forms_1.Validators.required]),
            'copy_date': new forms_1.FormControl(null, [forms_1.Validators.required])
        });
        // instantiate move job form
        this.moveJobForm = this._fb.group({
            'job_id': new forms_1.FormControl(null, [forms_1.Validators.required]),
            'job_name': new forms_1.FormControl(null, [forms_1.Validators.required]),
            'move_date': new forms_1.FormControl(null, [forms_1.Validators.required])
        });
        // to disable past dates in datepicker
        this.setMinDate();
        // get dispatch data
        this.getDispatches();
    };
    // open modal to import jobs
    DispatchJobComponent.prototype.openImportJobModal = function (modalTpl) {
        var self = this, _dT = this.selectedDate, date = _dT.year + '-' + _dT.month + '-' + _dT.day;
        self.loading = true;
        // empty import jobs table data
        this.httpService.get(environment_1.environment.apiUrl + 'dispatches/getJobs', { date: date })
            .then(function (res) {
            self.loading = false;
            self.jobs = res.data;
            self.openModal(modalTpl);
        })
            .catch(function (err) {
            self.loading = false;
            self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
        });
    };
    // open modal to copy job
    DispatchJobComponent.prototype.openCopyJobModal = function (modalTpl) {
        if (this.currentSelectedJob) {
            var _j = this.currentSelectedJob;
            this.copyJobForm.get('job_id').patchValue(_j.customer.customer_id + '-' + _j.pjob_id + '-' + _j.subjob_id);
            this.copyJobForm.get('job_name').patchValue(_j.job_name);
            this.openModal(modalTpl);
        }
        else {
            this.toastr.error('Please import & select a job first', 'Error!', { 'toastLife': 5000 });
        }
    };
    // open modal to move job
    DispatchJobComponent.prototype.openMoveJobModal = function (modalTpl) {
        // if there are assigned drivers then you can't move the job
        if (this.currentSelectedJob) {
            if (this.currentSelectedJob.total_trucks) {
                this.toastr.error('Please cancel all the assigned drivers first to remove the job.', 'Error!', { 'toastLife': 5000 });
            }
            else {
                var _j = this.currentSelectedJob;
                this.moveJobForm.get('job_id').patchValue(_j.customer.customer_id + '-' + _j.pjob_id + '-' + _j.subjob_id);
                this.moveJobForm.get('job_name').patchValue(_j.job_name);
                this.openModal(modalTpl);
            }
        }
        else {
            this.toastr.error('Please import & select a job first', 'Error!', { 'toastLife': 5000 });
        }
    };
    // open modal to remove job
    DispatchJobComponent.prototype.openRemoveJobModal = function (modalTpl) {
        if (this.currentSelectedJob) {
            if (this.currentSelectedJob.total_trucks) {
                this.toastr.error('Please cancel all the assigned drivers first to remove the job.', 'Error!', { 'toastLife': 5000 });
            }
            else {
                this.openModal(modalTpl);
            }
        }
        else {
            this.toastr.error('Please import & select a job first', 'Error!', { 'toastLife': 5000 });
        }
    };
    // commong method to open popup
    DispatchJobComponent.prototype.openModal = function (modalTpl) {
        this.modalRef = this.modalService.open(modalTpl, { 'backdrop': 'static' });
        this.modalRef.result.then(function (result) {
            // do something on close
        }, function (reason) {
        });
    };
    DispatchJobComponent.prototype.getDispatches = function (date) {
        var self = this;
        self.loading = true;
        if (!date) {
            date = self.commonServices.getToday(true);
        }
        date = date.year + '-' + date.month + '-' + date.day;
        // empty import jobs table data
        self.httpService.get(environment_1.environment.apiUrl + 'dispatches', { date: date })
            .then(function (res) {
            self.loading = false;
            self.importedJobs = res.data.map(function (d, i) {
                d.job.rowIndex = i;
                d.job.status = null;
                d.job.canAssign = false;
                d.job.dispatch_id = d._id;
                d.job.total_trucks = 0;
                d.job.customer = d.customer;
                if (Object.keys(d.assign).length && d.assign.drivers.length) {
                    // counting the total drivers assigned (uncancelled)
                    d.assign.drivers.forEach(function (_dr) {
                        if (!_dr.cancelled) {
                            d.job.total_trucks += 1;
                        }
                    });
                }
                if (self.commonServices.compareDates(d.date)) {
                    if (d.cancelled && self.commonServices.compareDates(d.cancel_date)) {
                        d.job.status = 'Cancelled';
                    }
                    else {
                        d.job.canAssign = true;
                    }
                }
                return d.job;
            });
        })
            .catch(function (err) {
            self.loading = false;
            self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
        });
    };
    // assign selected jobs to imported jobs varibale
    DispatchJobComponent.prototype.importJob = function () {
        var self = this;
        if (self.selectedJobsToImport.length) {
            self.actionLoader = true;
            setTimeout(function () {
                var _dT = self.selectedDate, date = _dT.year + '-' + _dT.month + '-' + _dT.day, importUrl = environment_1.environment.apiUrl + 'dispatches/add', dispatchData = self.selectedJobsToImport.map(function (d) {
                    return {
                        'job_id': d._id,
                        'date': date
                    };
                });
                // saving imported job into dispatch collection
                self.httpService.post(importUrl, dispatchData)
                    .then(function (res) {
                    self.selectedJobsToImport = self.selectedJobsToImport.map(function (d, i) {
                        if (res.data) {
                            var addedData = Object.assign({}, res.data[i]);
                            addedData.total_trucks = 0;
                            addedData.dispatch_id = addedData._id;
                            delete addedData.job_id;
                            delete addedData._id;
                            d = Object.assign({}, d, addedData);
                        }
                        d.canAssign = true;
                        return d;
                    });
                    self.importedJobs = self.importedJobs.concat(self.selectedJobsToImport);
                    self.actionLoader = false;
                    self.modalRef.close();
                    self.selectedJobsToImport = [];
                })
                    .catch(function (err) {
                    self.actionLoader = false;
                    self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
                });
            }, 10);
        }
        else {
            self.toastr.error('Please select atleast one job from grid to import!', 'Error!', { 'toastLife': 5000 });
        }
    };
    // call api to copy selected job
    DispatchJobComponent.prototype.copyJob = function () {
        var self = this;
        this.commonServices.validateAllFormFields(this.copyJobForm);
        if (this.copyJobForm.valid) {
            self.actionLoader = true;
            var copyFormValues = Object.assign({}, this.copyJobForm.value);
            copyFormValues.copy_date = this.commonServices.convertObjToDate(copyFormValues.copy_date);
            copyFormValues.j_id = this.currentSelectedJob._id;
            var copyUrl = environment_1.environment.apiUrl + 'sub_jobs/copy';
            this.httpService.post(copyUrl, copyFormValues)
                .then(function (res) {
                self.actionLoader = false;
                self.toastr.success(res.message, 'Success!', { 'toastLife': 5000 });
                self.copyJobForm.reset();
                self.modalRef.close();
                self.currentSelectedJob = null;
            })
                .catch(function (err) {
                self.actionLoader = false;
                self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
            });
        }
    };
    // call api to move selected job
    DispatchJobComponent.prototype.moveJob = function () {
        var self = this;
        this.commonServices.validateAllFormFields(this.moveJobForm);
        if (this.moveJobForm.valid) {
            self.actionLoader = true;
            var moveFormValues = Object.assign({}, this.moveJobForm.value);
            moveFormValues.move_date = this.commonServices.convertObjToDate(moveFormValues.move_date);
            moveFormValues._id = this.currentSelectedJob.dispatch_id;
            var moveUrl = environment_1.environment.apiUrl + 'dispatches/move';
            this.httpService.post(moveUrl, moveFormValues)
                .then(function (res) {
                self.importedJobs.splice(self.currentSelectedJob.index, 1);
                self.actionLoader = false;
                self.toastr.success(res.message, 'Success!', { 'toastLife': 5000 });
                self.copyJobForm.reset();
                self.modalRef.close();
                self.currentSelectedJob = null;
            })
                .catch(function (err) {
                self.actionLoader = false;
                self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
            });
        }
    };
    // when date filter changes
    DispatchJobComponent.prototype.onfdtChange = function (date) {
        this.selectedDate = date;
        this.getDispatches(date);
        this._manageActionsByDate(date);
        this.setMinDate();
    };
    // call api to remove selected job
    DispatchJobComponent.prototype.removeJob = function () {
        var self = this, removeUrl = environment_1.environment.apiUrl + 'dispatches/delete';
        self.actionLoader = true;
        this.httpService.post(removeUrl, { _id: this.currentSelectedJob.dispatch_id })
            .then(function (res) {
            // trim remove job from array
            self.importedJobs = self.importedJobs.filter(function (job) {
                if (job._id !== self.currentSelectedJob._id) {
                    return job;
                }
            });
            self.actionLoader = false;
            self.toastr.success(res.message, 'Success!', { 'toastLife': 5000 });
            self.modalRef.close();
            self.currentSelectedJob = null;
        })
            .catch(function (err) {
            self.actionLoader = false;
            self.toastr.error(err.error.message, 'Couldn\'t remove job!', { 'toastLife': 5000 });
            self.modalRef.close();
        });
    };
    // to disable the past dates in datepicker module
    DispatchJobComponent.prototype.setMinDate = function () {
        var _d = this.selectedDate, today = new Date(), todayObj = this.commonServices.extractDate(today);
        if (_d.year === todayObj.year && _d.month === todayObj.month && _d.day === todayObj.day) {
            today.setDate(today.getDate() + 1);
        }
        this.minDate = {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            day: today.getDate()
        };
    };
    // enable disable action buttons based on date
    // only copy will be enabled for past dates
    DispatchJobComponent.prototype._manageActionsByDate = function (date) {
        if (date) {
            this.isPastDate = this.commonServices.compareDates(this.commonServices.convertObjToDate(date), 'lt');
        }
    };
    __decorate([
        core_1.ViewChild('importJobModal'),
        __metadata("design:type", core_1.TemplateRef)
    ], DispatchJobComponent.prototype, "importJobModal", void 0);
    __decorate([
        core_1.ViewChild('copyJobModal'),
        __metadata("design:type", core_1.TemplateRef)
    ], DispatchJobComponent.prototype, "copyJobModal", void 0);
    __decorate([
        core_1.ViewChild('moveJobModal'),
        __metadata("design:type", core_1.TemplateRef)
    ], DispatchJobComponent.prototype, "moveJobModal", void 0);
    __decorate([
        core_1.ViewChild('removeJobModal'),
        __metadata("design:type", core_1.TemplateRef)
    ], DispatchJobComponent.prototype, "removeJobModal", void 0);
    DispatchJobComponent = __decorate([
        core_1.Component({
            selector: 'app-dispatch-job',
            templateUrl: './dispatch-job.component.html',
            styleUrls: ['./dispatch-job.component.scss']
        }),
        __metadata("design:paramtypes", [CommonServices_1.default,
            forms_1.FormBuilder,
            HttpServices_1.default,
            ng_bootstrap_1.NgbModal,
            ng2_toastr_1.ToastsManager,
            platform_browser_1.Title])
    ], DispatchJobComponent);
    return DispatchJobComponent;
}());
exports.DispatchJobComponent = DispatchJobComponent;
//# sourceMappingURL=dispatch-job.component.js.map