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
var AddJobComponent = (function () {
    // constructor
    function AddJobComponent(activeRoute, commonServices, _fb, httpService, mapsAPILoader, ngZone, router, titleService, toastr, authService) {
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
        this.url = environment_1.environment.apiUrl + 'jobs/convertToJob';
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
        this.fileUploader = new ng2_file_upload_1.FileUploader({ url: environment_1.environment.apiUrl + 'upload', queueLimit: 10, allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf', 'application/msword', 'application/vnd.ms-excel', 'text/plain'] });
        this.fileArray = [];
        this.titleService.setTitle(environment_1.environment.siteName + ' - Add Job');
        this.originLat = 26.8070;
        this.originLng = 75.8098;
        this.activeRoute.params.subscribe(function (params) {
            if (params.id !== undefined) {
                _this._addType = 'job';
                var idArr = params.id.split('__');
                _this.qid = idArr[0];
                if (idArr[0] === 'sj') {
                    _this.qid = idArr[1];
                    _this._addType = 'subjob';
                }
            }
        });
    }
    AddJobComponent.prototype.ngOnInit = function () {
        var _this = this;
        var self = this;
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
        // form fields declaration
        this.addJobForm = this._fb.group({
            'customer_name': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required]),
            'c_id': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required]),
            'customer_id': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required, forms_1.Validators.maxLength(4)]),
            'job_id': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required]),
            'qt_id': new forms_1.FormControl(null, [forms_1.Validators.required]),
            'quote_id': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required]),
            'quote_number': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required]),
            'customer_job': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required]),
            'job_name': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required]),
            'purchase_order': new forms_1.FormControl(null),
            'bill_type': new forms_1.FormControl({ value: '' }, [forms_1.Validators.required]),
            'pay_type': new forms_1.FormControl('', [forms_1.Validators.required]),
            'origin': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required]),
            'destination': new forms_1.FormControl(null, [forms_1.Validators.required]),
            'bill_from': new forms_1.FormControl('', [forms_1.Validators.required]),
            'bill_minimum': new forms_1.FormControl(null, [forms_1.Validators.required]),
            'certified_payroll': new forms_1.FormControl('n', [forms_1.Validators.required]),
            'prelim_date': new forms_1.FormControl(null),
            'request_dates1': new forms_1.FormControl(null),
            'request_dates2': new forms_1.FormControl(null),
            'request_dates3': new forms_1.FormControl(null),
            'request_dates': this._fb.array([]),
            'quarries': this._fb.array([]),
            'truck_details': this._fb.array([]),
            'direction': new forms_1.FormControl('', [forms_1.Validators.required]),
            'internal_notes': new forms_1.FormControl('', [forms_1.Validators.required]),
            'document': new forms_1.FormControl(),
            'document_value': new forms_1.FormControl(null, [forms_1.Validators.required])
        });
        // this._initRequestDateFields();
        // initializing the truck type fields with array
        this._initTruckTypeFields();
        this.getQuoteDetails();
        // File uploader handlers
        // On fiels adding file
        this.fileUploader.onWhenAddingFileFailed = function (item, filter) {
            switch (filter.name) {
                case 'mimeType':
                    document.getElementById('document').classList.add('ng-invalid');
                    _this.toastr.error('Invalid File Upload', 'Error!', { 'toastLife': 5000 });
                    break;
                case 'queueLimit':
                    document.getElementById('document').classList.add('ng-invalid');
                    _this.toastr.error('Maxmimam 10 files upload at a time', 'Error!', { 'toastLife': 5000 });
                    break;
                default:
                    break;
            }
        };
        self.fileUploader.onAfterAddingFile = function (fileItem) {
            fileItem.withCredentials = false;
            var url = (window.URL) ? window.URL.createObjectURL(fileItem._file) : window.webkitURL.createObjectURL(fileItem._file);
            document.getElementById('document').classList.remove('ng-invalid');
            self.addJobForm.patchValue({
                document_value: url
            });
        };
        // push file data to filearray once fileuploader item is completed
        self.fileUploader.onCompleteItem = function (item, response, status, headers) {
            self.fileArray.push(response);
        };
        // add quote when file uploading is completed
        self.fileUploader.onCompleteAll = function () {
            self.dataObj.document = self.fileArray;
            self.addJob(self.dataObj);
        };
    };
    // calls the api to add job
    AddJobComponent.prototype.addJob = function (data) {
        var self = this;
        self.loading = true;
        this.httpService.post(this.url, data)
            .then(function (res) {
            self.loading = false;
            self.toastr.success(res.message, 'Success!', { 'toastLife': 5000 });
            self.addJobForm.reset();
            self.router.navigate(['/jobs/jobsListByCustomerId', self.quoteDetails.c_id]);
        })
            .catch(function (err) {
            self.loading = false;
            self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
        });
    };
    // do the needful on form submit
    AddJobComponent.prototype.onJobFormSubmit = function (e) {
        var self = this;
        var userDetails = self.authService.getUserData('user');
        self.commonServices.validateAllFormFields(this.addJobForm);
        if (this.addJobForm.valid) {
            // combining the address name, lat and lng into source and destination
            var formVal = Object.assign({}, this.addJobForm.getRawValue());
            formVal.prelim_date = formVal.prelim_date ? this.commonServices.convertObjToDate(formVal.prelim_date) : null;
            formVal.request_dates1 = formVal.request_dates1 ? this.commonServices.convertObjToDate(formVal.request_dates1) : null;
            formVal.request_dates2 = formVal.request_dates2 ? this.commonServices.convertObjToDate(formVal.request_dates2) : null;
            formVal.request_dates3 = formVal.request_dates3 ? this.commonServices.convertObjToDate(formVal.request_dates3) : null;
            formVal.origin = {
                'address': this.originName,
                'lat': this.originLat,
                'lng': this.originLng
            };
            if (this.originName) {
                formVal.origin.address = this.originName;
            }
            if (formVal.internal_notes) {
                formVal.subjob_logs = [{
                        'uid': userDetails._id,
                        'name': userDetails.fname + ' ' + userDetails.lname,
                        'internal_notes': formVal.internal_notes
                    }];
            }
            formVal.destination = {
                'address': this.destinationAddress,
                'lat': this.destinationLatvalue,
                'lng': this.destinationLng
            };
            // if (this.destinationName) {
            //   formVal.destination.address = this.destinationName;
            // }
            formVal.request_dates = formVal.request_dates.map(function (date) {
                return self.commonServices.convertObjToDate(date);
            });
            this.dataObj = formVal;
            this.fileUploader.uploadAll();
        }
        else {
            this.toastr.error('There are some invalid fields in the form');
        }
    };
    AddJobComponent.prototype.getNextJobId = function (data) {
        var self = this, url = environment_1.environment.apiUrl + 'jobs/getNextId';
        self.loading = true;
        self.httpService.get(url)
            .then(function (res) {
            self.loading = false;
            var cust = data.customer;
            self.addJobForm.patchValue({ 'qt_id': self.qid });
            self.addJobForm.patchValue({ 'bill_type': data.bill_type });
            self.addJobForm.patchValue({ 'c_id': cust._id });
            self.addJobForm.patchValue({ 'origin': data.origin.address });
            self.addJobForm.patchValue({ 'job_id': res.data });
            self.addJobForm.patchValue({ 'quote_id': cust.customer_id + '-' + res.data });
            self.addJobForm.patchValue({ 'job_name': data.quote_name });
            self.addJobForm.patchValue({ 'customer_name': cust.cust_name });
            self.addJobForm.patchValue({ 'customer_job': cust.cust_role });
            self.addJobForm.patchValue({ 'customer_id': cust.customer_id });
            self.originName = data.origin.address;
            self.originLat = data.origin.lat;
            self.originLng = data.origin.lng;
        })
            .catch(function (err) {
            self.loading = false;
            self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
        });
    };
    AddJobComponent.prototype.getQuoteDetails = function () {
        var self = this, httpParams = new http_1.HttpParams(), params = httpParams.set('id', self.qid), url = environment_1.environment.apiUrl + 'quotes/getQuoteById';
        self.loading = true;
        self.httpService.get(url, params)
            .then(function (res) {
            if (res.data.length) {
                self.quoteDetails = res.data[0];
                if (self.quoteDetails.converted) {
                    self.toastr.error('The quote has already been converted to job', 'Error!', { 'toastLife': 5000 });
                    self.router.navigate(['/quotes/list']);
                }
                else {
                    self.getNextJobId(self.quoteDetails);
                }
                self._addQuaryMaterialRow(self.quoteDetails);
            }
            else {
                self.toastr.error('Quote not found', 'Error!', { 'toastLife': 5000 });
                self.router.navigate(['/quotes/list']);
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
    //     (<FormArray>this.addJobForm.get('request_dates')).push(new FormControl(null, []));
    //   }
    // }
    AddJobComponent.prototype._initTruckTypeFields = function () {
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
    AddJobComponent.prototype._addDummyReqDateField = function (e) {
        if (e) {
            e.preventDefault();
        }
        this.addJobForm.get('request_dates').push(new forms_1.FormControl(null, []));
    };
    // request fields will be dynamic so this function adds a dummy request field in form
    AddJobComponent.prototype._addQuaryMaterialRow = function (data) {
        this.addJobForm.get('quarries').push(new forms_1.FormGroup({
            'quarry': new forms_1.FormControl('', [forms_1.Validators.required]),
            'material': new forms_1.FormControl(data ? data.material : '', [forms_1.Validators.required]),
            'we_buy': new forms_1.FormControl(null, [forms_1.Validators.required]),
            'we_sell': new forms_1.FormControl(null, [forms_1.Validators.required])
        }));
        return false;
    };
    // initialize google map autocomplete for source/destination fields
    AddJobComponent.prototype._initAutocomplete = function (ele) {
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
    AddJobComponent.prototype._setCurrentPosition = function () {
        var _this = this;
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.originLat = _this.destinationLat = position.coords.latitude;
                _this.originLng = _this.destinationLng = position.coords.longitude;
            });
        }
    };
    AddJobComponent.prototype.showImageIcon = function (image) {
        return /(?:\.([^.]+))?$/.exec(image)[1];
    };
    AddJobComponent.prototype.cancel = function () {
        if (confirm('All the changes you made will be discarded. Are you sure you want to cancel?')) {
            this.router.navigate(['/jobs/list']);
        }
        return false;
    };
    AddJobComponent.prototype.onChange = function (event) {
        console.log(event);
        if (event) {
            this.destinationAddress = event;
        }
    };
    __decorate([
        core_1.ViewChild('search'),
        __metadata("design:type", Number)
    ], AddJobComponent.prototype, "destinationLat", void 0);
    AddJobComponent = __decorate([
        core_1.Component({
            selector: 'app-add-job',
            templateUrl: './add-job.component.html',
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
    ], AddJobComponent);
    return AddJobComponent;
}());
exports.AddJobComponent = AddJobComponent;
//# sourceMappingURL=add-job.component.js.map