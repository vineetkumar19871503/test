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
var EditSubjobComponent = (function () {
    // constructor
    function EditSubjobComponent(activeRoute, commonServices, _fb, httpService, mapsAPILoader, ngZone, router, titleService, toastr, authService) {
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
        this.newFilesUploaded = false;
        this.quarries = [
            { 'name': 'Quarry1', 'value': 'quarry1' },
            { 'name': 'Quarry2', 'value': 'quarry2' },
            { 'name': 'Quarry3', 'value': 'quarry3' },
            { 'name': 'Quarry4', 'value': 'quarry4' }
        ];
        this._tempTruckTypes = [];
        this.truckTypes = this.commonServices.getTruckDetails();
        this.quarriesite = [
            { 'name': 'Quarry1', 'value': 'quarry1' },
            { 'name': 'Quarry2', 'value': 'quarry2' },
            { 'name': 'Quarry3', 'value': 'quarry3' },
            { 'name': 'Quarry4', 'value': 'quarry4' }
        ];
        this.totalReqDateFields = 3;
        this.reqDateModel = Array(this.totalReqDateFields);
        this.url = environment_1.environment.apiUrl + 'sub_jobs/edit';
        this.pdvalue = 0;
        this.rd1value = 0;
        this.rd2value = 0;
        this.rd3value = 0;
        this.purchaseorderValue = 0;
        // google map variables
        this.destinationLat = 26.9601;
        this.destinationLng = 75.7758;
        this._addType = null;
        this.originName = null;
        this.destinationName = null;
        this.destinationAddress = null;
        this.originLat = 26.8070;
        this.destinationLatvalue = 26.9601;
        this.originLng = 75.8098;
        this.zoom = 15;
        this.fileUploader = new ng2_file_upload_1.FileUploader({ url: URL });
        this.fileArray = [];
        this.titleService.setTitle(environment_1.environment.siteName + ' - edit Sub Job');
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
    EditSubjobComponent.prototype.ngOnInit = function () {
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
        self.editJobForm = new forms_1.FormGroup({
            'customer_name': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required]),
            'c_id': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required]),
            'customer_id': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required, forms_1.Validators.maxLength(4)]),
            'j_id': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required]),
            'job_id': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required, forms_1.Validators.maxLength(4)]),
            'quote_id': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required]),
            'customer_job': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required]),
            'job_name': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required]),
            'purchase_order': new forms_1.FormControl({ value: null }),
            'bill_type': new forms_1.FormControl('', [forms_1.Validators.required]),
            'pay_type': new forms_1.FormControl('', [forms_1.Validators.required]),
            'origin': new forms_1.FormControl('', [forms_1.Validators.required]),
            'destination': new forms_1.FormControl('', [forms_1.Validators.required]),
            'bill_from': new forms_1.FormControl('', [forms_1.Validators.required]),
            'bill_minimum': new forms_1.FormControl('', [forms_1.Validators.required]),
            'certified_payroll': new forms_1.FormControl('', [forms_1.Validators.required]),
            'prelim_date': new forms_1.FormControl(null, [forms_1.Validators.required]),
            'request_dates1': new forms_1.FormControl({ value: null }),
            'request_dates2': new forms_1.FormControl({ value: null }),
            'request_dates3': new forms_1.FormControl({ value: null }),
            'request_dates': this._fb.array([]),
            'quarries': this._fb.array([]),
            'truck_details': this._fb.array([]),
            'direction': new forms_1.FormControl('', [forms_1.Validators.required]),
            // 'internal_notes': new FormControl('', [Validators.required]),
            '_id': new forms_1.FormControl('', [forms_1.Validators.required]),
            'document': new forms_1.FormControl(),
            'subjob_logs': new forms_1.FormGroup({
                'uid': new forms_1.FormControl(userDetails._id, [forms_1.Validators.required]),
                'name': new forms_1.FormControl(userDetails.fname + ' ' + userDetails.lname, [forms_1.Validators.required]),
                'internal_notes': new forms_1.FormControl('', [forms_1.Validators.required])
            })
        });
        // initializing the truck type fields with array
        self._initTruckTypeFields();
        // getting job details and patching values in form
        self.getJobDetails();
        // File uploader handlers
        self.fileUploader.onAfterAddingFile = function (fileItem) {
            self.newFilesUploaded = true;
            fileItem.withCredentials = false;
        };
        self.fileUploader.onCompleteItem = function (item, response, status, headers) {
            self.fileArray.push(response);
        };
        self.fileUploader.onCompleteAll = function () {
            self.saveSubjob();
        };
    };
    // calls the api to update job
    EditSubjobComponent.prototype.updateJob = function (data) {
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
    // calls the api to edit job
    EditSubjobComponent.prototype.saveSubjob = function () {
        var self = this;
        self.dataObj.document = self.fileArray;
        self.httpService.post(self.url, self.dataObj)
            .then(function (res) {
            self.loading = false;
            self.toastr.success(res.message, 'Success!', { 'toastLife': 5000 });
            self.editJobForm.reset();
            self.router.navigate(['jobs/SubjobsListByJobId', self.jobDetail.j_id]);
        })
            .catch(function (err) {
            self.loading = false;
            self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
        });
    };
    // do the needful on form submit
    EditSubjobComponent.prototype.onFormSubmit = function () {
        var self = this;
        self.commonServices.validateAllFormFields(self.editJobForm);
        if (this.editJobForm.valid) {
            // combining the address name, lat and lng into source and destination
            var formVal = Object.assign({}, this.editJobForm.getRawValue());
            formVal.prelim_date = formVal.prelim_date ? this.commonServices.convertObjToDate(formVal.prelim_date) : null;
            formVal.request_dates1 = formVal.request_dates1 ? this.commonServices.convertObjToDate(formVal.request_dates1) : null;
            formVal.request_dates2 = formVal.request_dates2 ? this.commonServices.convertObjToDate(formVal.request_dates2) : null;
            formVal.request_dates3 = formVal.request_dates3 ? this.commonServices.convertObjToDate(formVal.request_dates3) : null;
            formVal.origin = {
                'address': formVal.origin,
                'lat': self.originLat,
                'lng': self.originLng
            };
            if (self.originName) {
                formVal.origin.address = self.originName;
            }
            formVal.destination = {
                'address': this.destinationAddress,
                'lat': this.destinationLatvalue,
                'lng': this.destinationLng
            };
            // if (self.destinationName) {
            //   formVal.destination.address = self.destinationName;
            // }
            // formVal.request_dates = formVal.request_dates.map(function (date) {
            //   return self.commonServices.convertObjToDate(date);
            // });
            self.dataObj = formVal;
            self.loading = true;
            if (self.newFilesUploaded) {
                self.fileUploader.uploadAll();
            }
            else {
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
                if (updateFlag) {
                    // alert(prelimDatevalue);
                    this.updateJob(updateJobFields);
                }
                self.saveSubjob();
            }
        }
        else {
            self.toastr.error('There are some invalid fields in the form');
        }
        return false;
    };
    EditSubjobComponent.prototype.getJobDetails = function () {
        var self = this;
        var httpParams = new http_1.HttpParams();
        var params = httpParams.set('id', self.jobId);
        var url = environment_1.environment.apiUrl + 'sub_jobs/getSubJobById';
        var materialDetailsArr = self.editJobForm.get('quarries');
        self.loading = true;
        self.httpService.get(url, params)
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
                    self.editJobForm.get('prelim_date').disable();
                    self.pdvalue = 1;
                }
                if (_j.request_dates1) {
                    requestdates1 = self.commonServices.extractDate(_j.request_dates1);
                    self.editJobForm.get('request_dates1').disable();
                    self.rd1value = 1;
                }
                if (_j.request_dates2) {
                    requestdates2 = self.commonServices.extractDate(_j.request_dates2);
                    self.editJobForm.get('request_dates2').disable();
                    self.rd2value = 1;
                }
                if (_j.request_dates3) {
                    requestdates3 = self.commonServices.extractDate(_j.request_dates3);
                    self.editJobForm.get('request_dates3').disable();
                    self.rd3value = 1;
                }
                if (_j.purchase_order) {
                    purchaseOrder = _j.purchase_order;
                    self.editJobForm.get('purchase_order').disable();
                    self.purchaseorderValue = 1;
                }
                self.parentJobId = _j._id;
                self.subJobLogData = _j.subjob_logs;
                self.editJobForm.patchValue({
                    'j_id': _j.j_id,
                    'job_id': _j.pjob_id,
                    'c_id': _j.customer._id,
                    'customer_id': _j.customer.customer_id,
                    'job_name': _j.job_name,
                    'customer_name': _j['customer'].cust_name,
                    'customer_job': _j['customer'].cust_role,
                    'quote_id': _j.customer.customer_id + '-' + _j.pjob_id,
                    'bill_type': _j.bill_type,
                    'purchase_order': purchaseOrder ? purchaseOrder : null,
                    'prelim_date': prelimDate ? prelimDate : null,
                    'request_dates1': requestdates1 ? requestdates1 : null,
                    'request_dates2': requestdates2 ? requestdates2 : null,
                    'request_dates3': requestdates3 ? requestdates3 : null,
                    'pay_type': _j.pay_type,
                    'bill_from': _j.bill_from,
                    'bill_minimum': _j.bill_minimum,
                    'certified_payroll': _j.certified_payroll,
                    'origin': _j.origin.address,
                    'destination': _j.destination.address,
                    'direction': _j.direction,
                    'internal_notes': _j.internal_notes,
                    '_id': _j._id,
                });
                self._initTruckDetailsArr(_j.truck_details);
                self._initMaterialDetailsArr(_j.quarries);
                self._initRequestDateFields(_j.request_dates);
                self.originLat = _j.origin.lat;
                self.originLng = _j.origin.lng;
                self.destinationLat = _j.destination.lat;
                self.destinationLng = _j.destination.lng;
                self._initDocumentsArr(_j.document);
            }
            else {
                self._initRequestDateFields([]);
            }
        })
            .catch(function (err) {
            self.loading = false;
            self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
        });
    };
    // removes the material row
    EditSubjobComponent.prototype.removeMaterial = function (i) {
        this.editJobForm.get('quarries')['controls'].splice(i, 1);
    };
    EditSubjobComponent.prototype._initMaterialDetailsArr = function (data) {
        var self = this;
        var materialDetailsArr = self.editJobForm.get('quarries');
        if (data && data.length) {
            data.forEach(function (lineItem, index) {
                materialDetailsArr.push(new forms_1.FormGroup({
                    'quarry': new forms_1.FormControl(lineItem.quarry, [forms_1.Validators.required]),
                    'material': new forms_1.FormControl(lineItem.material, [forms_1.Validators.required]),
                    'we_buy': new forms_1.FormControl(lineItem.we_buy, [forms_1.Validators.required]),
                    'we_sell': new forms_1.FormControl(lineItem.we_sell, [forms_1.Validators.required])
                }));
            });
        }
        else {
        }
    };
    EditSubjobComponent.prototype._initTruckDetailsArr = function (data) {
        var self = this;
        var custDetailsArr = self.editJobForm.get('truck_details');
        if (data && data.length) {
            for (var custDetails = 0; custDetails < custDetailsArr.controls.length; custDetails++) {
                custDetailsArr.controls[custDetails].patchValue({
                    bill_rate: data[custDetails].bill_rate,
                    pay_rate: data[custDetails].pay_rate,
                    dump: data[custDetails].dump
                });
            }
        }
    };
    // initializes request fields in n number
    EditSubjobComponent.prototype._initRequestDateFields = function (dt) {
        for (var i = 0; i < this.totalReqDateFields; i++) {
            var convertedD = null;
            if (dt.length) {
                convertedD = this.commonServices.extractDate(dt[i]);
            }
            this.editJobForm.get('request_dates').push(new forms_1.FormControl(convertedD, []));
        }
    };
    EditSubjobComponent.prototype._initTruckTypeFields = function () {
        var self = this;
        self.truckTypes.forEach(function (truckType, i) {
            self.editJobForm.get('truck_details').push(new forms_1.FormGroup({
                'truck_type': new forms_1.FormControl(truckType.value, [forms_1.Validators.required]),
                'bill_rate': new forms_1.FormControl(null, [forms_1.Validators.required]),
                'pay_rate': new forms_1.FormControl(null, [forms_1.Validators.required]),
                'dump': new forms_1.FormControl(null, [forms_1.Validators.required])
            }));
        });
    };
    // initalizes doucment type
    EditSubjobComponent.prototype._initDocumentsArr = function (data) {
        var self = this;
        var documentDetailsarr = [];
        self.documentData = data.map(function (a) {
            a = JSON.parse(a);
            var nameArr = a.file_path.split('/');
            a.name = nameArr[nameArr.length - 1];
            return a;
        });
        for (var i = 0; i < self.documentData.length; i++) {
            self.fileArray.push(JSON.stringify(self.documentData[i]));
        }
    };
    // request fields will be dynamic so this function adds a dummy request field in form
    EditSubjobComponent.prototype._addDummyReqDateField = function (e) {
        if (e) {
            e.preventDefault();
        }
        this.editJobForm.get('request_dates').push(new forms_1.FormControl(null, [forms_1.Validators.required]));
    };
    // request fields will be dynamic so this function adds a dummy request field in form
    EditSubjobComponent.prototype._addQuaryMaterialRow = function (e) {
        if (e) {
            e.preventDefault();
        }
        this.editJobForm.get('quarries').push(new forms_1.FormGroup({
            'quarry': new forms_1.FormControl('', [forms_1.Validators.required]),
            'material': new forms_1.FormControl('', [forms_1.Validators.required]),
            'we_buy': new forms_1.FormControl(null, [forms_1.Validators.required]),
            'we_sell': new forms_1.FormControl(null, [forms_1.Validators.required])
        }));
    };
    // initialize google map autocomplete for source/destination fields
    EditSubjobComponent.prototype._initAutocomplete = function (ele) {
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
                else if (ele.id === 'destination') {
                    self.destinationName = addr;
                    self.destinationLat = lat;
                    self.destinationLng = lng;
                }
            });
        });
    };
    // gets the user location from browser and sets current location in google map
    EditSubjobComponent.prototype._setCurrentPosition = function () {
        var _this = this;
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.originLat = _this.destinationLat = position.coords.latitude;
                _this.originLng = _this.destinationLng = position.coords.longitude;
            });
        }
    };
    EditSubjobComponent.prototype.showImageIcon = function (image) {
        return /(?:\.([^.]+))?$/.exec(image)[1];
    };
    EditSubjobComponent.prototype.cancel = function () {
        if (confirm('All the changes you made will be discarded. Are you sure you want to cancel?')) {
            this.router.navigate(['/jobs/SubjobsListByJobId', this.jobDetail.j_id]);
        }
        return false;
    };
    EditSubjobComponent.prototype.onChange = function (event) {
        console.log(event);
        if (event) {
            this.destinationAddress = event;
        }
    };
    __decorate([
        core_1.ViewChild('search'),
        __metadata("design:type", Number)
    ], EditSubjobComponent.prototype, "destinationLat", void 0);
    EditSubjobComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-job',
            templateUrl: './edit-subjob.component.html',
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
    ], EditSubjobComponent);
    return EditSubjobComponent;
}());
exports.EditSubjobComponent = EditSubjobComponent;
//# sourceMappingURL=edit-subjob.component.js.map