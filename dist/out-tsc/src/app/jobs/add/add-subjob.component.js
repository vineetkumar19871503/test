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
var http_1 = require("@angular/common/http");
var HttpServices_1 = require("../../shared/services/HttpServices");
var core_2 = require("@agm/core");
var platform_browser_1 = require("@angular/platform-browser");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var ng2_file_upload_1 = require("ng2-file-upload/ng2-file-upload");
var auth_service_1 = require("./../../shared/auth/auth.service");
var URL = environment_1.environment.apiUrl + 'upload';
var AddSubjobComponent = (function () {
    // private updateJobFields: any;
    // constructor
    function AddSubjobComponent(activeRoute, commonServices, _fb, httpService, mapsAPILoader, ngZone, router, titleService, toastr, authService) {
        var _this = this;
        this.activeRoute = activeRoute;
        this.commonServices = commonServices;
        this._fb = _fb;
        this.httpService = httpService;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.router = router;
        this.titleService = titleService;
        this.toastr = toastr;
        this.authService = authService;
        this.billAndPayTypes = [
            { 'name': 'Hourly', 'value': 'H' },
            { 'name': 'Load', 'value': 'L' },
            { 'name': 'Tonnage', 'value': 'T' },
        ];
        this.loading = false;
        this.materials = [
            { 'name': 'Rock', 'value': 'rock' },
            { 'name': 'Base Rock', 'value': 'baserock' },
            { 'name': 'Drain Rock', 'value': 'drainrock' },
            { 'name': 'Dirt', 'value': 'dirt' },
            { 'name': 'Sand', 'value': 'sand' },
            { 'name': 'AC', 'value': 'aC' },
            { 'name': 'Concrete', 'value': 'concrete' },
            { 'name': 'Ashpalt', 'value': 'ashpalt' }
        ];
        this.quarries = [
            { 'name': 'Quarry1', 'value': 'quarry1' },
            { 'name': 'Quarry2', 'value': 'quarry2' },
            { 'name': 'Quarry3', 'value': 'quarry3' },
            { 'name': 'Quarry4', 'value': 'quarry4' }
        ];
        this.quarriesite = [
            { 'name': 'Quarry1', 'value': 'quarry1' },
            { 'name': 'Quarry2', 'value': 'quarry2' },
            { 'name': 'Quarry3', 'value': 'quarry3' },
            { 'name': 'Quarry4', 'value': 'quarry4' }
        ];
        this._tempTruckTypes = [];
        this.truckTypes = this.commonServices.getTruckDetails();
        this.totalReqDateFields = 3;
        this.reqDateModel = Array(this.totalReqDateFields);
        this.url = environment_1.environment.apiUrl + 'sub_jobs/add';
        this.pdvalue = 0;
        this.rd1value = 0;
        this.rd2value = 0;
        this.rd3value = 0;
        this.purchaseorderValue = 0;
        // google map variables
        this.destinationLat = 26.9601;
        this.destinationLatvalue = 26.9601;
        this.destinationLng = 75.7758;
        this._addType = null;
        this.originName = null;
        this.destinationName = null;
        this.destinationAddress = null;
        this.originLat = 26.8070;
        this.originLng = 75.8098;
        this.zoom = 15;
        this.fileUploader = new ng2_file_upload_1.FileUploader({ url: URL });
        this.fileArray = [];
        this.titleService.setTitle(environment_1.environment.siteName + ' - Add Sub Job');
        this.originLat = 26.8070;
        this.originLng = 75.8098;
        this.activeRoute.params.subscribe(function (params) {
            if (params.job_id !== undefined) {
                _this.jobId = params.job_id;
            }
            else {
                _this.toastr.error('Please provide Job ID in parameter.', 'Error!', { 'toastLife': 5000 });
            }
        });
    }
    AddSubjobComponent.prototype.ngOnInit = function () {
        var _this = this;
        var self = this, userDetails = self.authService.getUserData('user');
        this.truckTypes.map(function (tt) {
            self._tempTruckTypes.push(tt.name);
        });
        // setting current position in map
        self._setCurrentPosition();
        // map api on load
        self.mapsAPILoader.load().then(function () {
            self._initAutocomplete(document.getElementById('origin'));
            // self._initAutocomplete(document.getElementById('destination'));
        });
        this.addJobForm = new forms_1.FormGroup({
            'customer_name': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required]),
            'c_id': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required]),
            'customer_id': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required, forms_1.Validators.maxLength(4)]),
            'j_id': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required]),
            'pjob_id': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required, forms_1.Validators.maxLength(4)]),
            'quote_id': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required]),
            'customer_job': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required]),
            'job_name': new forms_1.FormControl({ value: null }, [forms_1.Validators.required]),
            'purchase_order': new forms_1.FormControl(null),
            'bill_type': new forms_1.FormControl('B', [forms_1.Validators.required]),
            'pay_type': new forms_1.FormControl('B', [forms_1.Validators.required]),
            'origin': new forms_1.FormControl(null, [forms_1.Validators.required]),
            'destination': new forms_1.FormControl(null, [forms_1.Validators.required]),
            'bill_from': new forms_1.FormControl('amijot', [forms_1.Validators.required]),
            'bill_minimum': new forms_1.FormControl(null),
            'certified_payroll': new forms_1.FormControl('n', [forms_1.Validators.required]),
            'prelim_date': new forms_1.FormControl(null),
            'request_dates1': new forms_1.FormControl({ value: null }),
            'request_dates2': new forms_1.FormControl({ value: null }),
            'request_dates3': new forms_1.FormControl({ value: null }),
            'request_dates': this._fb.array([]),
            'quarries': this._fb.array([
                new forms_1.FormGroup({
                    'quarry': new forms_1.FormControl('', [forms_1.Validators.required]),
                    'material': new forms_1.FormControl('', [forms_1.Validators.required]),
                    'we_buy': new forms_1.FormControl(null, [forms_1.Validators.required]),
                    'we_sell': new forms_1.FormControl(null, [forms_1.Validators.required]),
                })
            ]),
            'truck_details': this._fb.array([]),
            'direction': new forms_1.FormControl(null, [forms_1.Validators.required]),
            // 'internal_notes': new FormControl(null, [Validators.required]),
            'document': new forms_1.FormControl(),
            'document_value': new forms_1.FormControl(null, [forms_1.Validators.required]),
            'subjob_logs': new forms_1.FormGroup({
                'uid': new forms_1.FormControl(userDetails._id, [forms_1.Validators.required]),
                'name': new forms_1.FormControl(userDetails.fname + ' ' + userDetails.lname, [forms_1.Validators.required]),
                'internal_notes': new forms_1.FormControl('', [forms_1.Validators.required])
            })
        });
        // this._initRequestDateFields();
        // initializing the truck type fields with array
        this._initTruckTypeFields();
        this.getJobDetails();
        // File uploader handlers
        this.fileUploader.onAfterAddingFile = function (fileItem) {
            console.log(fileItem);
            fileItem.withCredentials = false;
            var url = (window.URL) ? window.URL.createObjectURL(fileItem._file) : window.webkitURL.createObjectURL(fileItem._file);
            document.getElementById('document').classList.remove('ng-invalid');
            _this.addJobForm.patchValue({
                document_value: url,
            });
        };
        this.fileUploader.onCompleteItem = function (item, response, status, headers) {
            _this.fileArray.push(response);
        };
        this.fileUploader.onCompleteAll = function () {
            _this.dataObj.document = _this.fileArray;
            _this.httpService.post(_this.url, _this.dataObj)
                .then(function (res) {
                self.loading = false;
                self.toastr.success(res.message, 'Success!', { 'toastLife': 5000 });
                self.fileUploader.clearQueue();
                self.addJobForm.reset();
            })
                .catch(function (err) {
                self.loading = false;
                self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
            });
        };
    };
    // calls the api to add job
    AddSubjobComponent.prototype.addJob = function (data) {
        var self = this;
        this.dataObj = data;
        self.loading = true;
        if (this.fileUploader.queue.length === 0) {
            this.httpService.post(this.url, data)
                .then(function (res) {
                self.loading = false;
                self.toastr.success(res.message, 'Success!', { 'toastLife': 5000 });
                self.addJobForm.reset();
                self.router.navigate(['jobs/SubjobsListByJobId', self.jobId]);
            })
                .catch(function (err) {
                self.loading = false;
                self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
            });
        }
        else {
            this.fileUploader.uploadAll();
        }
    };
    // calls the api to update job
    AddSubjobComponent.prototype.updateJob = function (data) {
        var self = this;
        var updateFormValues = Object.assign({});
        var obj = {};
        data.forEach(function (arrayItem) {
            var field_name = arrayItem.field;
            var field_value = arrayItem.value;
            // obj.push({ field_name: field_value });
            obj[field_name] = field_value;
        });
        obj['_id'] = this.parentJobId;
        updateFormValues = JSON.stringify(obj);
        // console.log(updateFormValues);
        //   updateFormValues._id = this.parentJobId;
        console.log(updateFormValues);
        var updateUrl = environment_1.environment.apiUrl + 'jobs/updateFields';
        this.httpService.post(updateUrl, updateFormValues)
            .then(function (res) {
            self.loading = false;
        })
            .catch(function (err) {
            self.loading = false;
            self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
        });
    };
    // do the needful on form submit
    AddSubjobComponent.prototype.saveSubJob = function (e) {
        var self = this;
        self.commonServices.validateAllFormFields(this.addJobForm);
        // console.log(self.commonServices.validateAllFormFields(this.addJobForm));
        // add invalid to doc
        if (this.addJobForm.controls.document_value.value === '') {
            document.getElementById('document').classList.add('ng-invalid');
        }
        if (this.addJobForm.valid) {
            // combining the address name, lat and lng into source and destination
            var formVal = Object.assign({}, this.addJobForm.getRawValue());
            formVal.prelim_date = formVal.prelim_date ? this.commonServices.convertObjToDate(formVal.prelim_date) : null;
            formVal.request_dates1 = formVal.request_dates1 ? this.commonServices.convertObjToDate(formVal.request_dates1) : null;
            formVal.request_dates2 = formVal.request_dates2 ? this.commonServices.convertObjToDate(formVal.request_dates2) : null;
            formVal.request_dates3 = formVal.request_dates3 ? this.commonServices.convertObjToDate(formVal.request_dates3) : null;
            formVal.origin = {
                'address': formVal.origin,
                'lat': this.originLat,
                'lng': this.originLng
            };
            if (this.originName) {
                formVal.origin.address = this.originName;
            }
            formVal.destination = {
                'address': this.destinationAddress,
                'lat': this.destinationLatvalue,
                'lng': this.destinationLng
            };
            var updateJobFields = [];
            var prelimDatevalue = null;
            var updateFlag = 0;
            if (self.pdvalue === 0) {
                prelimDatevalue = formVal.prelim_date ? formVal.prelim_date : null;
                updateJobFields.push({ 'field': 'prelim_date', 'value': prelimDatevalue });
                updateFlag = 1;
            }
            var rd1Datevalue = null;
            if (self.rd1value === 0) {
                rd1Datevalue = formVal.request_dates1 ? formVal.request_dates1 : null;
                updateJobFields.push({ 'field': 'request_dates1', 'value': rd1Datevalue });
                updateFlag = 1;
            }
            var rd2Datevalue = null;
            if (self.rd2value === 0) {
                rd2Datevalue = formVal.request_dates2 ? formVal.request_dates2 : null;
                updateJobFields.push({ 'field': 'request_dates2', 'value': rd2Datevalue });
                updateFlag = 1;
            }
            var localPurchaseorderValue = null;
            if (self.purchaseorderValue === 0) {
                localPurchaseorderValue = formVal.purchase_order ? formVal.purchase_order : null;
                updateJobFields.push({ 'field': 'purchase_order', 'value': localPurchaseorderValue });
                updateFlag = 1;
            }
            console.log(formVal);
            if (updateFlag) {
                // alert(prelimDatevalue);
                this.updateJob(updateJobFields);
            }
            this.addJob(formVal);
        }
        else {
            this.toastr.error('There are some invalid fields in the form');
        }
    };
    AddSubjobComponent.prototype.getCustomerDetails = function () {
        var self = this;
        self.loading = true;
        var httpParams = new http_1.HttpParams();
        var params = httpParams.set('id', this.jobId);
        var url = environment_1.environment.apiUrl + 'customers';
        this.httpService.get(url, params)
            .then(function (customer) {
            self.loading = false;
            if (customer.data.length) {
                customer = customer.data[0];
                self.addJobForm.patchValue({
                    customer_name: customer.cust_name,
                    customer_job: customer.cust_role,
                    customer_id: '0001'
                });
            }
        })
            .catch(function (err) {
            self.loading = false;
            self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
        });
    };
    AddSubjobComponent.prototype.getJobDetails = function () {
        var self = this;
        var httpParams = new http_1.HttpParams();
        var params = httpParams.set('id', this.jobId);
        var url = environment_1.environment.apiUrl + 'jobs/getJobById';
        self.loading = true;
        this.httpService.get(url, params)
            .then(function (job) {
            self.loading = false;
            if (job.data.length) {
                var _j = self.jobDetail = job.data[0];
                console.log(_j);
                var prelimDate = void 0;
                var requestdates1 = void 0;
                var requestdates2 = void 0;
                var requestdates3 = void 0;
                var purchaseOrder = void 0;
                if (_j.prelim_date) {
                    prelimDate = self.commonServices.extractDate(_j.prelim_date);
                    self.addJobForm.get('prelim_date').disable();
                    self.pdvalue = 1;
                }
                if (_j.request_dates1) {
                    requestdates1 = self.commonServices.extractDate(_j.request_dates1);
                    self.addJobForm.get('request_dates1').disable();
                    self.rd1value = 1;
                }
                if (_j.request_dates2) {
                    requestdates2 = self.commonServices.extractDate(_j.request_dates2);
                    self.addJobForm.get('request_dates2').disable();
                    self.rd2value = 1;
                }
                if (_j.request_dates3) {
                    requestdates3 = self.commonServices.extractDate(_j.request_dates3);
                    self.addJobForm.get('request_dates3').disable();
                    self.rd3value = 1;
                }
                if (_j.purchase_order) {
                    purchaseOrder = _j.purchase_order;
                    self.addJobForm.get('purchase_order').disable();
                    self.purchaseorderValue = 1;
                }
                self.parentJobId = _j._id;
                self.subJobLogData = _j.subjob_logs;
                self.addJobForm.patchValue({
                    'j_id': _j._id,
                    'pjob_id': _j.job_id,
                    'bill_type': _j.bill_type,
                    'pay_type': _j.pay_type,
                    'c_id': _j.customer._id,
                    'customer_id': _j.customer.customer_id,
                    'job_name': _j.job_name,
                    'customer_name': _j['customer'].cust_name,
                    'customer_job': _j['customer'].cust_role,
                    'quote_id': _j.customer.customer_id + '-' + _j.job_id,
                    'origin': _j.origin.address,
                    // 'purchase_order': _j.purchase_order,
                    // 'prelim_date': prelimDate ,
                    'purchase_order': purchaseOrder ? purchaseOrder : null,
                    'prelim_date': prelimDate ? prelimDate : null,
                    'request_dates1': requestdates1 ? requestdates1 : null,
                    'request_dates2': requestdates2 ? requestdates2 : null,
                    'request_dates3': requestdates3 ? requestdates3 : null,
                });
                self.originLat = _j.origin.lat;
                self.originLng = _j.origin.lng;
            }
        })
            .catch(function (err) {
            self.loading = false;
            self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
        });
    };
    // initializes request fields in n number
    // _initRequestDateFields() {
    //   for (let i = 0; i < this.totalReqDateFields; i++) {
    //     (<FormArray>this.addJobForm.get('request_dates')).push(new FormControl(null));
    //   }
    // }
    AddSubjobComponent.prototype._initTruckTypeFields = function () {
        var self = this;
        self.truckTypes.forEach(function (truckType, i) {
            self.addJobForm.get('truck_details').push(new forms_1.FormGroup({
                'truck_type': new forms_1.FormControl(truckType.value, [forms_1.Validators.required]),
                'bill_rate': new forms_1.FormControl(null, [forms_1.Validators.required]),
                'pay_rate': new forms_1.FormControl(null, [forms_1.Validators.required]),
                'dump': new forms_1.FormControl(null, [forms_1.Validators.required])
            }));
        });
    };
    // request fields will be dynamic so this function adds a dummy request field in form
    // _addDummyReqDateField(e) {
    //   if (e) {
    //     e.preventDefault();
    //   }
    //   (<FormArray>this.addJobForm.get('request_dates')).push(new FormControl(null, [Validators.required]));
    // }
    // request fields will be dynamic so this function adds a dummy request field in form
    AddSubjobComponent.prototype._addQuaryMaterialRow = function (e) {
        if (e) {
            e.preventDefault();
        }
        this.addJobForm.get('quarries').push(new forms_1.FormGroup({
            'quarry': new forms_1.FormControl('', [forms_1.Validators.required]),
            'material': new forms_1.FormControl('', [forms_1.Validators.required]),
            'we_buy': new forms_1.FormControl(null, [forms_1.Validators.required]),
            'we_sell': new forms_1.FormControl(null, [forms_1.Validators.required])
        }));
    };
    // removes the material row
    AddSubjobComponent.prototype.removeMaterial = function (i) {
        this.addJobForm.get('quarries')['controls'].splice(i, 1);
    };
    // initialize google map autocomplete for source/destination fields
    AddSubjobComponent.prototype._initAutocomplete = function (ele) {
        var self = this, autocomplete = new google.maps.places.Autocomplete(ele, {
            types: ['address']
        });
        autocomplete.addListener('place_changed', function () {
            self.ngZone.run(function () {
                // get the place result
                var place = autocomplete.getPlace();
                // verify result
                if (place.geometry === undefined || place.geometry === null) {
                    return;
                }
                var lat = place.geometry.location.lat(), lng = place.geometry.location.lng(), addr = place.formatted_address;
                if (ele.id === 'origin') {
                    self.originName = addr;
                    self.originLat = lat;
                    self.originLng = lng;
                }
                // else if (ele.id === 'destination') {
                //   self.destinationName = addr;
                //   self.destinationLat = lat;
                //   self.destinationLng = lng;
                // }
            });
        });
    };
    // gets the user location from browser and sets current location in google map
    AddSubjobComponent.prototype._setCurrentPosition = function () {
        var _this = this;
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.originLat = position.coords.latitude;
                _this.originLng = position.coords.longitude;
            });
        }
    };
    AddSubjobComponent.prototype.showImageIcon = function (image) {
        return /(?:\.([^.]+))?$/.exec(image)[1];
    };
    AddSubjobComponent.prototype.cancel = function () {
        if (confirm('All the changes you made will be discarded. Are you sure you want to cancel?')) {
            this.router.navigate(['/jobs/SubjobsListByJobId', this.jobDetail._id]);
        }
        return false;
    };
    AddSubjobComponent.prototype.onChange = function (event) {
        console.log(event);
        if (event) {
            this.destinationAddress = event;
        }
    };
    __decorate([
        core_1.ViewChild('search'),
        __metadata("design:type", Number)
    ], AddSubjobComponent.prototype, "destinationLat", void 0);
    AddSubjobComponent = __decorate([
        core_1.Component({
            selector: 'app-add-job',
            templateUrl: './add-subjob.component.html',
            styleUrls: ['./add-job.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            CommonServices_1.default,
            forms_1.FormBuilder,
            HttpServices_1.default,
            core_2.MapsAPILoader,
            core_1.NgZone,
            router_1.Router,
            platform_browser_1.Title,
            ng2_toastr_1.ToastsManager,
            auth_service_1.AuthService])
    ], AddSubjobComponent);
    return AddSubjobComponent;
}());
exports.AddSubjobComponent = AddSubjobComponent;
//# sourceMappingURL=add-subjob.component.js.map