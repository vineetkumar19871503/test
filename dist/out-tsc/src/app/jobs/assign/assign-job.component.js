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
var CommonServices_1 = require("../../shared/services/CommonServices");
var core_1 = require("@angular/core");
var environment_1 = require("../../../environments/environment");
var forms_1 = require("@angular/forms");
var HttpServices_1 = require("../../shared/services/HttpServices");
var moment = require("moment");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var router_2 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var AssignJobComponent = (function () {
    // constructor
    function AssignJobComponent(activatedRoute, commonServices, _fb, httpService, modalService, router, titleService, toastr) {
        this.activatedRoute = activatedRoute;
        this.commonServices = commonServices;
        this._fb = _fb;
        this.httpService = httpService;
        this.modalService = modalService;
        this.router = router;
        this.titleService = titleService;
        this.toastr = toastr;
        // @ViewChild('subhaulerTable') subhaulerTable: any;
        // variables definition
        this.actionLoader = false;
        this.defaultTime = { hour: 0, minute: 0, second: 0 };
        this.dispatchDetail = {};
        this.quarries = [];
        this.importedDrivers = [];
        this.modalDriverColumns = [
            {
                name: 'Driver Name',
                prop: 'first_name',
            },
            {
                name: 'Truck Type',
                prop: 'truck_type',
            }
        ];
        this.modalDriverSelected = false;
        this.importedData = [];
        this.isQtyFilled = false;
        this.jobCancelled = false;
        this.loading = false;
        this.modalDrivers = [];
        this.modalSelectedDriver = [];
        this.selectedDriver = [];
        this.totalQty = 0; // total quantity of trucks to be updated when truck qty fields change
        this.truckQty = [];
        this._tempTruckTypes = [];
        this._tempTruckTypesObj = {};
        this._tz = -(new Date().getTimezoneOffset());
        this.totalReqDateFields = 1;
        this.truckTypes = this.commonServices.getTruckDetails();
        this.reqDateModel = Array(this.totalReqDateFields);
        // setting page title
        this.titleService.setTitle(environment_1.environment.siteName + ' - Assign Job');
        this.assignDate = this.commonServices.extractDate(new Date());
    }
    AssignJobComponent.prototype.ngOnInit = function () {
        var self = this;
        self.truckTypes.map(function (tt) {
            self._tempTruckTypes.push(tt.name);
            self._tempTruckTypesObj[tt.value] = tt.name;
        });
        // form fields declaration
        self.assignForm = new forms_1.FormGroup({
            'job_details': new forms_1.FormGroup({
                'customer_id': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required, forms_1.Validators.maxLength(4)]),
                'customer_name': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required]),
                'job_id': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required]),
                'job_name': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required]),
                'origin': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required]),
                'destination': new forms_1.FormControl({ value: null }, [forms_1.Validators.required]),
                'direction': new forms_1.FormControl({ value: null }, [forms_1.Validators.required]),
                'internal_notes': new forms_1.FormControl({ value: null }, [forms_1.Validators.required]),
                'cancelled_by': new forms_1.FormControl({ value: null, disabled: true }),
                'cancel_reason': new forms_1.FormControl({ value: null, disabled: true }),
            }),
            'date': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required]),
            'start_time': new forms_1.FormControl(null, [forms_1.Validators.required]),
            'no_of_trucks': new forms_1.FormControl(null, [forms_1.Validators.required]),
            'truck_qty': self._fb.array([]),
            'tmp_dr_data': self._fb.array([]),
            'interval': new forms_1.FormControl(null, [forms_1.Validators.required])
        });
        // initializing cancel job form
        self.cancelJobForm = new forms_1.FormGroup({
            'cancelled_by': new forms_1.FormControl(null, [forms_1.Validators.required]),
            'cancel_reason': new forms_1.FormControl(null, [forms_1.Validators.required])
        });
        self.jobDetailsGrp = self.assignForm.get('job_details');
        // fetch job details
        self._fillJobDetails();
    };
    // cancel dispatched job for today
    AssignJobComponent.prototype.cancelJob = function () {
        var self = this;
        self.commonServices.validateAllFormFields(self.cancelJobForm);
        if (self.cancelJobForm.valid) {
            self.actionLoader = true;
            var j = self.dispatchDetail.job, cancelFormVal_1 = self.cancelJobForm.value;
            self.httpService.post(environment_1.environment.apiUrl + 'dispatches/cancel', Object.assign({}, { 'job_id': j._id }, cancelFormVal_1))
                .then(function (res) {
                self.actionLoader = false;
                self.modalRef.close();
                self.toastr.success(res.message, 'Success!', { 'toastLife': 5000 });
                // disable form on cancellation
                self.assignForm.patchValue({
                    'job_details': {
                        'cancelled_by': cancelFormVal_1.cancelled_by,
                        'cancel_reason': cancelFormVal_1.cancel_reason
                    }
                });
                self.jobCancelled = true;
                self.commonServices.disableAllFormFields(self.assignForm);
            })
                .catch(function (err) {
                self.actionLoader = false;
                self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
            });
        }
        return false;
    };
    // call drivers api and open driver modal
    AssignJobComponent.prototype.openImportDriversModal = function (modalTpl) {
        var self = this;
        self.modalDriverSelected = false;
        self.modalSelectedDriver = [];
        var _sD = self.selectedDriver;
        if (_sD.length) {
            _sD = _sD[0];
            if (_sD.conf_sent || _sD.confirmed) {
                self.toastr.error('You can\'t import driver for this slot because confirmation has been sent to this driver', 'Error!', { 'toastLife': 5000 });
            }
            else {
                self.loading = true;
                // empty import jobs table data
                var url = environment_1.environment.apiUrl + 'drivers/getDriversByTruckType';
                if (!_sD.newRow) {
                    url += '?type=' + _sD.truck_type;
                }
                this.httpService.get(url)
                    .then(function (res) {
                    self.loading = false;
                    self.modalDrivers = res.data;
                    self.openModal(modalTpl);
                })
                    .catch(function (err) {
                    self.loading = false;
                    self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
                });
            }
        }
        else {
            self.toastr.error('Please select a slot first', 'Error!', { 'toastLife': 2000 });
        }
    };
    AssignJobComponent.prototype.openImportPullersModal = function (modalTpl) {
        var self = this;
        self.modalDriverSelected = false;
        self.modalSelectedDriver = [];
        var _sD = self.selectedDriver;
        if (_sD.length) {
            _sD = _sD[0];
            if (_sD.conf_sent || _sD.confirmed) {
                self.toastr.error('You can\'t import driver for this slot because confirmation has been sent to this driver', 'Error!', { 'toastLife': 2000 });
            }
            else {
                self.loading = true;
                // call api to fill modal pullers
                var url = environment_1.environment.apiUrl + 'pullers/getPullersByTruckType';
                if (!_sD.newRow) {
                    url += '?type=' + _sD.truck_type;
                }
                this.httpService.get(url)
                    .then(function (res) {
                    self.loading = false;
                    self.modalDriverColumns = [
                        {
                            name: 'Puller Name',
                            prop: 'first_name'
                        },
                        {
                            name: 'Truck Type',
                            prop: 'truck_type'
                        }
                    ];
                    self.modalDrivers = res.data;
                    self.openModal(modalTpl);
                })
                    .catch(function (err) {
                    self.loading = false;
                    self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
                });
            }
        }
        else {
            self.toastr.error('Please select a slot first', 'Error!', { 'toastLife': 2000 });
        }
    };
    AssignJobComponent.prototype.openImportSubhaulersModal = function (modalTpl) {
        var self = this;
        self.modalDriverSelected = false;
        self.modalSelectedDriver = [];
        var _sD = self.selectedDriver;
        if (_sD.length) {
            _sD = _sD[0];
            if (_sD.conf_sent || _sD.confirmed) {
                self.toastr.error('You can\'t import driver for this slot because confirmation has been sent to this driver', 'Error!', { 'toastLife': 2000 });
            }
            else {
                self.loading = true;
                // call api to fill modal pullers
                var url = environment_1.environment.apiUrl + 'subhaulers/getSubhaulersByTruckType';
                if (!_sD.newRow) {
                    url += '?type=' + _sD.truck_type;
                }
                this.httpService.get(url)
                    .then(function (res) {
                    self.loading = false;
                    self.modalDrivers = [];
                    if (res.data.length) {
                        res.data.forEach(function (sh) {
                            if (sh.drivers.length) {
                                sh.drivers.forEach(function (dr) {
                                    dr.sh_name = sh.name;
                                    dr.sh_id = sh._id;
                                    self.modalDrivers.push(dr);
                                });
                            }
                        });
                    }
                    self.openModal(modalTpl);
                })
                    .catch(function (err) {
                    self.loading = false;
                    self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
                });
            }
        }
        else {
            self.toastr.error('Please select a slot first', 'Error!', { 'toastLife': 2000 });
        }
    };
    // commong method to open popup
    AssignJobComponent.prototype.openModal = function (modalTemplate) {
        this.modalRef = this.modalService.open(modalTemplate);
        this.modalRef.result.then(function (result) {
            // do something on close
        }, function (reason) {
        });
        return false;
    };
    // add driver detail to slots
    AssignJobComponent.prototype.addDriverDetailToImportedData = function () {
        var self = this, driver = self.modalSelectedDriver;
        setTimeout(function () {
            self.importedData = self.importedData.map(function (d) {
                if (d.i === self.selectedDriver[0].i) {
                    d.phone = driver.phone;
                    d.driver_name = driver.first_name;
                    d.truck_type = driver.truck_type;
                    d.driver_id = driver._id;
                }
                return d;
            });
            self.modalDriverSelected = false;
        }, 10);
        self.modalRef.close();
    };
    AssignJobComponent.prototype.selectModalDriver = function ($e) {
        if ($e.selected.length) {
            this.modalSelectedDriver = $e.selected[0];
            this.modalDriverSelected = true;
        }
    };
    // do the needful on form submit
    AssignJobComponent.prototype.saveAssign = function (cb) {
        var self = this;
        self.commonServices.validateAllFormFields(self.assignForm);
        if (self.assignForm.valid) {
            // combining the address name, lat and lng into source and destination
            var formVal_1 = Object.assign({}, self.assignForm.getRawValue()), _sT = formVal_1.start_time, // start time
            tmpDrControls_1 = self.assignForm.get('tmp_dr_data')['controls'];
            formVal_1.date = self.commonServices.convertObjToDate(self.assignDate);
            // prearing form data
            formVal_1.start_time = self.commonServices.convertToDate(moment(formVal_1.date).format('YYYY-MM-DD') + ' ' + moment(_sT.hour + ':' + _sT.minute + ':' + _sT.second, 'HH:mm:ss').format('HH:mm:ss'));
            formVal_1.dispatch_id = self.dispatchDetail._id;
            formVal_1.truck_qty = self.truckQty;
            formVal_1.drivers = [];
            self.importedData.map(function (d, ind) {
                // if slot has driver imported then only allow it to be saved
                if (d.driver_id) {
                    var tmp = Object.assign({}, d);
                    tmp.comment = tmpDrControls_1[ind].value.comment;
                    // converting driver start time into js date object
                    if (d.newRow) {
                        var _t = tmpDrControls_1[ind].value.time;
                        _t = _t.hour + ':' + _t.minute + ':' + _t.second;
                        tmp.time = self.commonServices.convertToDate(moment(formVal_1.date).format('YYYY-MM-DD') + ' ' + moment(_t, 'HH:mm  A').format('HH:mm:ss'));
                    }
                    else {
                        tmp.time = self.commonServices.convertToDate(moment(formVal_1.date).format('YYYY-MM-DD') + ' ' + moment(d.time, 'HH:mm A').format('HH:mm:ss'));
                    }
                    delete tmp.i;
                    delete tmp.driver_name;
                    delete tmp.newRow;
                    delete tmp.truck_type;
                    formVal_1.drivers.push(tmp);
                }
            });
            delete formVal_1.tmp_dr_data;
            delete formVal_1.job_details;
            // save assign job detail
            self.loading = true;
            self.httpService.post(environment_1.environment.apiUrl + 'assigned_jobs/add', formVal_1)
                .then(function (res) {
                self.toastr.success(res.message, 'Success!', { 'toastLife': 5000 });
                self.loading = false;
                cb();
            })
                .catch(function (err) {
                self.loading = false;
                self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
            });
        }
        else {
            this.toastr.error('There are some invalid fields in the form');
        }
        return false;
    };
    // generate slots based on start time + no. of trucks + interval
    AssignJobComponent.prototype.generateSlots = function () {
        var self = this, formVal = self.assignForm.getRawValue();
        // rendering slots
        if (self.importedData.length) {
            self.saveAndNotifyDrivers();
        }
        else {
            if (formVal.interval && formVal.no_of_trucks) {
                self._renderTruckSlots(formVal.truck_qty);
                self._renderTimeSlots();
            }
            else {
                self.toastr.error('No. of trucks or Interval can\'t be empty', 'Error!', { 'toastLife': 5000 });
            }
            // init tmp_dr_data form control
            self._initTempValues();
        }
    };
    // save selected drivers in slots and send sms for confirmation
    AssignJobComponent.prototype.saveAndNotifyDrivers = function () {
        var self = this;
        self.importedDrivers = [];
        self.importedData.map(function (d) {
            if (d.driver_id) {
                self.importedDrivers.push(d);
            }
        });
        if (self.importedDrivers.length) {
            // making no. of trucks and frequency fields read only
            // if (self.importedDrivers.length) {
            //   const frmCtrls = self.assignForm.controls;
            //   frmCtrls['interval'].disable();
            //   frmCtrls['no_of_trucks'].disable();
            //   frmCtrls['start_time'].disable();
            //   frmCtrls['truck_qty'].disable();
            // }
            self.saveAssign(function () {
                var tmpCtrls = self.assignForm.get('tmp_dr_data')['controls'];
                self.importedDrivers = self.importedDrivers.map(function (driver, ind) {
                    tmpCtrls[ind].get('comment').disable();
                    driver.conf_sent = true;
                    return driver;
                });
            });
        }
        else {
            self.toastr.error('Please add Drivers/Pullers/Subhaulers in the slots', 'Error!', { 'toastLife': 5000 });
        }
    };
    // binding change event to truck qty controls to update total
    AssignJobComponent.prototype._bindQtyFieldChanges = function () {
        var self = this;
        self.assignForm.controls.truck_qty['controls'].forEach(function (i) {
            i.controls.qty.valueChanges.subscribe(function (change) {
                self.totalQty = 0;
                self.assignForm.controls.truck_qty['controls'].forEach(function (tq) {
                    if (tq.getRawValue().qty) {
                        self.totalQty += parseInt(tq.getRawValue().qty, 10);
                    }
                });
            });
        });
    };
    AssignJobComponent.prototype.addRow = function () {
        var self = this;
        self.assignForm.controls.tmp_dr_data.push(new forms_1.FormGroup({
            'comment': new forms_1.FormControl(null),
            'time': new forms_1.FormControl(self.defaultTime, [forms_1.Validators.required])
        }));
        self.importedData.push({
            'i': self.importedData.length,
            'newRow': true,
            'cancelled': false
        });
    };
    // deletes the slot before sms sent to driver for approval or driver confirmed the job
    AssignJobComponent.prototype.deleteSlot = function () {
        var self = this;
        if (self.selectedDriver.length) {
            var d = self.selectedDriver[0];
            if (d.conf_sent) {
                self.toastr.error('You can\'t delete this slot because confirmation has been sent to the driver for approval!', 'Error!', { 'toastLife': 2000 });
            }
            else if (d.confirmed) {
                self.toastr.error('You can\'t delete this slot because driver has confirmed the job!', 'Error!', { 'toastLife': 2000 });
            }
            else {
                if (confirm('Are you sure you want to delete this slot?')) {
                    self.importedData.splice(d.i, 1);
                }
            }
        }
        else {
            self.toastr.error('Please select a slot first', 'Error!', { 'toastLife': 2000 });
        }
    };
    // cancels the driver from job if confirmation is sent to driver or driver confirmed the job
    AssignJobComponent.prototype.cancelDriver = function () {
        var self = this;
        if (self.selectedDriver.length) {
            var d = self.selectedDriver[0], selectedInd_1 = d.i;
            if (d.conf_sent || d.confirmed) {
                if (confirm('Are you sure you want to cancel this driver?')) {
                    self.httpService.post(environment_1.environment.apiUrl + 'assigned_jobs/cancelDriver', Object.assign({ 'job_id': self.dispatchDetail._id, 'driver_id': d.driver_id }))
                        .then(function (res) {
                        self.loading = false;
                        self.toastr.success(res.message, 'Success!', { 'toastLife': 5000 });
                        self.importedData[selectedInd_1].cancelled = true;
                    })
                        .catch(function (err) {
                        self.actionLoader = false;
                        self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
                    });
                }
            }
            else {
                self.toastr.error('You can only cancel a driver if a confirmation is sent to him or he confirmed the job!', 'Error!', { 'toastLife': 4000 });
            }
        }
        else {
            self.toastr.error('Please select a slot first', 'Error!', { 'toastLife': 4000 });
        }
    };
    // fetch job details based on url id and fill details in form
    AssignJobComponent.prototype._fillJobDetails = function () {
        var _this = this;
        this.loading = true;
        this.activatedRoute.params.subscribe(function (params) {
            var dispatchId = params.job_id, self = _this, 
            // url = environment.apiUrl + 'sub_jobs/getJobById?id=' + jobId;
            url = environment_1.environment.apiUrl + 'dispatches/getDispatchDetailById?id=' + dispatchId;
            self.httpService.get(url)
                .then(function (res) {
                self.loading = false;
                if (res.data.length) {
                    self.dispatchDetail = res.data[0];
                    self.quarries = self.dispatchDetail.job.quarries;
                    var job = self.dispatchDetail.job, customer = self.dispatchDetail.customer;
                    console.log(self.dispatchDetail);
                    // filling job details in form
                    self.assignForm.patchValue({
                        'job_details': {
                            'customer_id': job.customer_id,
                            'customer_name': customer.cust_name,
                            'job_id': customer.customer_id + '-' + job.pjob_id + '-' + job.subjob_id,
                            'job_name': job.job_name,
                            'origin': job.origin.address,
                            'destination': job.destination.address,
                            'direction': job.direction,
                            'internal_notes': job.internal_notes
                        }
                    });
                    // disabling form fields
                    var jobDetailCtrls = self.assignForm['controls'].job_details['controls'];
                    jobDetailCtrls['direction'].disable();
                    jobDetailCtrls['internal_notes'].disable();
                    // patching dispatch values in form
                    self._fillDispatchDetails();
                    // patching assign values in form
                    self._fillAssignDetails();
                }
                else {
                    self.toastr.error(res.message, 'Error!', { 'toastLife': 5000 });
                    self.router.navigate(['/jobs/dispatch']);
                }
            })
                .catch(function (err) {
                self.loading = false;
                self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
            });
        });
    };
    AssignJobComponent.prototype._fillDispatchDetails = function () {
        // patching dispatch values in inputs
        var _dd = this.dispatchDetail;
        if (_dd.cancelled) {
            this.assignForm.patchValue({
                'job_details': {
                    'cancelled_by': _dd.cancelled_by,
                    'cancel_reason': _dd.cancel_reason
                }
            });
        }
        // if cancel date matches today's date then make form read only
        // passing one argument will check the given date with today
        var cancelDate = this.dispatchDetail.cancel_date;
        if (this.dispatchDetail.cancelled && this.commonServices.compareDates(cancelDate)) {
            this.jobCancelled = true;
            this.commonServices.disableAllFormFields(this.assignForm);
        }
    };
    AssignJobComponent.prototype._fillAssignDetails = function () {
        var self = this;
        if (Object.keys(self.dispatchDetail.assign).length) {
            var _dT = self.dispatchDetail.assign, 
            // patching values in form
            _sT = moment(_dT.start_time).utcOffset(self._tz);
            self.assignForm.patchValue({
                'no_of_trucks': _dT.no_of_trucks,
                'interval': _dT.interval,
                'start_time': { hour: _sT.format('HH'), minute: _sT.format('mm'), second: _sT.format('ss') }
            });
            // disabling form fields
            var jobDetailCtrls = self.assignForm['controls'];
            jobDetailCtrls['start_time'].disable();
            jobDetailCtrls['no_of_trucks'].disable();
            jobDetailCtrls['interval'].disable();
            var tmpCtrl_1 = self.assignForm.controls.tmp_dr_data;
            self.importedData = _dT.drivers.map(function (dr, ind) {
                tmpCtrl_1.push(new forms_1.FormGroup({
                    'comment': new forms_1.FormControl({ value: dr.comment, disabled: true }),
                    'time': new forms_1.FormControl({
                        value: self.commonServices.extractDate(moment(dr.time, 'HH:mm:ss').toDate()),
                        disabled: true
                    }, [forms_1.Validators.required])
                }));
                return {
                    'i': ind,
                    'time': moment(dr.time).utcOffset(self._tz).format('hh:mm A'),
                    'driver_id': dr.driver_id,
                    'phone': dr.phone,
                    'driver_name': dr.first_name,
                    'driver_type': dr.driver_type,
                    'truck_type': dr.truck_type,
                    'cancelled': dr.cancelled ? dr.cancelled : false,
                    'confirmed': dr.confirmed,
                    'tag_id': dr.tag_id,
                    'conf_sent': true
                };
            });
            if (_dT.truck_qty.length) {
                self._initTruckTypeFields(_dT.truck_qty);
            }
        }
        else {
            self._initTruckTypeFields();
        }
    };
    // initialize tmp_dr_data form control according to slot rows
    AssignJobComponent.prototype._initTempValues = function () {
        var self = this;
        var ctrl = self.assignForm.controls.tmp_dr_data;
        self.importedData.forEach(function (dt) {
            ctrl.push(new forms_1.FormGroup({
                'comment': new forms_1.FormControl(null),
                'time': new forms_1.FormControl(null)
            }));
        });
    };
    // initializes request fields in n number
    AssignJobComponent.prototype._initRequestDateFields = function () {
        for (var i = 0; i < this.totalReqDateFields; i++) {
            this.assignForm.get('request_dates').push(new forms_1.FormControl(null, [forms_1.Validators.required]));
        }
    };
    // init truck type array controls
    AssignJobComponent.prototype._initTruckTypeFields = function (truckData) {
        var self = this;
        self.truckTypes.forEach(function (truckType, i) {
            var qty = null;
            if (truckData) {
                // if truck data exists in db then fill it
                var keys = Object.keys(truckData);
                keys.map(function (k) {
                    if (truckData[k].truck_type === truckType.value) {
                        qty = truckData[k].qty;
                        self.totalQty += qty;
                        return false;
                    }
                });
            }
            self.assignForm.get('truck_qty').push(new forms_1.FormGroup({
                'truck_type': new forms_1.FormControl(truckType.value),
                'qty': new forms_1.FormControl(qty)
            }));
        });
        // update the total qty of trucks when any truck qty field changes
        self._bindQtyFieldChanges();
        // disabling form controls is assign detail found
        // console.log(self.dispatchDetail.assign.length);
        if (self.dispatchDetail.assign.length) {
            self.assignForm.controls['truck_qty'].disable();
        }
    };
    AssignJobComponent.prototype.openCancelModal = function (modalRef) {
        var uncancelledDrivers = false;
        this.importedData.forEach(function (d) {
            if (!d.cancelled) {
                uncancelledDrivers = true;
                return false;
            }
        });
        if (uncancelledDrivers) {
            this.toastr.error('Please cancel all the drivers before cancelling this job!', 'Success!', { 'toastLife': 5000 });
        }
        else {
            this.openModal(modalRef);
        }
        return false;
    };
    // render the slots based on the start time, no. of trucks and frequency entered
    AssignJobComponent.prototype._renderTimeSlots = function () {
        var startTime;
        var formVal = this.assignForm.getRawValue(), self = this;
        if (self.isQtyFilled) {
            var counter_1 = 0;
            var _sT = formVal.start_time, truckFrequency_1 = formVal.no_of_trucks, startDate = moment(formVal.date).format('YYYY-MM-DD');
            startTime = moment(_sT.hour + ':' + _sT.minute + ':' + _sT.second, 'HH:mm:ss');
            self.importedData = self.importedData.map(function (d) {
                if (counter_1 >= truckFrequency_1) {
                    counter_1 = 0;
                    startTime.add(formVal.interval, 'minutes');
                }
                counter_1++;
                d.time = startTime.format('hh:mm A');
                return d;
            });
            var frmCtrls = self.assignForm.controls;
            frmCtrls['interval'].disable();
            frmCtrls['no_of_trucks'].disable();
            frmCtrls['start_time'].disable();
            frmCtrls['truck_qty'].disable();
        }
    };
    // render the slots based on truck quantity entered
    AssignJobComponent.prototype._renderTruckSlots = function (data) {
        var self = this;
        var index = 0;
        data.map(function (d) {
            if (d.qty) {
                self.truckQty.push(d);
                // if any truck type has qty then set isQtyFilled to true to generate the time slots
                self.isQtyFilled = true;
                for (var i = 0; i < d.qty; i++) {
                    self.importedData.push({
                        'i': index,
                        'time': '',
                        'phone': '',
                        'driver_name': '',
                        'truck_type': d.truck_type,
                        'confirmed': false,
                        'comment': '',
                        'tag_id': ''
                    });
                    index++;
                }
            }
        });
    };
    AssignJobComponent.prototype._toggleExpandGroup = function (group, elem) {
        // console.log('Toggled Expand Group!', group);
        // console.log(elem.groupHeader);
        // this.subhaulerTable.groupHeader.toggleExpandGroup(group);
    };
    __decorate([
        core_1.ViewChild('cancelJobModal'),
        __metadata("design:type", core_1.TemplateRef)
    ], AssignJobComponent.prototype, "cancelJobModal", void 0);
    __decorate([
        core_1.ViewChild('importDriversModal'),
        __metadata("design:type", core_1.TemplateRef)
    ], AssignJobComponent.prototype, "importDriversModal", void 0);
    __decorate([
        core_1.ViewChild('importPullersModal'),
        __metadata("design:type", core_1.TemplateRef)
    ], AssignJobComponent.prototype, "importPullersModal", void 0);
    __decorate([
        core_1.ViewChild('importSubhaulersModal'),
        __metadata("design:type", core_1.TemplateRef)
    ], AssignJobComponent.prototype, "importSubhaulersModal", void 0);
    AssignJobComponent = __decorate([
        core_1.Component({
            selector: 'app-assign-job',
            templateUrl: './assign-job.component.html',
            styleUrls: ['./assign-job.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            CommonServices_1.default,
            forms_1.FormBuilder,
            HttpServices_1.default,
            ng_bootstrap_1.NgbModal,
            router_2.Router,
            platform_browser_1.Title,
            ng2_toastr_1.ToastsManager])
    ], AssignJobComponent);
    return AssignJobComponent;
}());
exports.AssignJobComponent = AssignJobComponent;
//# sourceMappingURL=assign-job.component.js.map