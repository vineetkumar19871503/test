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
var ng2_completer_1 = require("ng2-completer");
var environment_1 = require("../../../environments/environment");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var HttpServices_1 = require("../../shared/services/HttpServices");
var core_2 = require("@agm/core");
var platform_browser_1 = require("@angular/platform-browser");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var ng2_file_upload_1 = require("ng2-file-upload/ng2-file-upload");
var URL = environment_1.environment.apiUrl + 'upload';
var AddQuoteComponent = (function () {
    // constructor
    function AddQuoteComponent(activeRoute, commonServices, completerService, _fb, httpService, mapsAPILoader, ngZone, router, titleService, toastr) {
        var _this = this;
        this.activeRoute = activeRoute;
        this.commonServices = commonServices;
        this.completerService = completerService;
        this._fb = _fb;
        this.httpService = httpService;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.router = router;
        this.titleService = titleService;
        this.toastr = toastr;
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
        this.statusdata = [
            { 'name': 'Bidding', 'value': 'Bidding' },
            { 'name': 'In Progress', 'value': 'in_progress' },
            { 'name': 'Awarded', 'value': 'awarded' },
            { 'name': 'Missed', 'value': 'missed' }
        ];
        this._tempTruckTypes = [];
        this.truckTypes = this.commonServices.getTruckDetails();
        // private truckTypes: Object[] = [
        //   { 'name': 'Super Dumps', 'value': 'super_dumps' },
        //   { 'name': 'Transfers', 'value': 'transfers' },
        //   { 'name': 'Ten-Wheeler', 'value': 'ten-wheeler' },
        //   { 'name': 'Highsides', 'value': 'highsides' },
        //   { 'name': 'Semi Bottoms & Doubles Bottoms', 'value': 'semi_bottoms_doubles_bottoms' },
        //   { 'name': 'End Dumps', 'value': 'end_dumps' },
        //   { 'name': 'Flatbeds', 'value': 'flatbeds' },
        //   { 'name': 'Sweeper', 'value': 'sweeper' },
        //   { 'name': 'Water tanker', 'value': 'watertanker' },
        // ];
        this.totalReqDateFields = 3;
        this.reqDateModel = Array(this.totalReqDateFields);
        this.url = environment_1.environment.apiUrl + 'quotes/add';
        // google map variables
        this.destinationLat = 26.9601;
        this.destinationLng = 75.7758;
        this._addType = null;
        this.convertToJob = false;
        this.customersList = [];
        this.originName = null;
        this.destinationName = null;
        this.originLat = 26.8070;
        this.originLng = 75.8098;
        // private tmpOrigin: String = null;
        this.zoom = 15;
        this.fileUploader = new ng2_file_upload_1.FileUploader({ url: URL, queueLimit: 10, allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf', 'application/msword', 'application/vnd.ms-excel', 'text/plain'] });
        this.fileArray = [];
        this.titleService.setTitle(environment_1.environment.siteName + ' - Add quote');
        this.originLat = 26.8070;
        this.originLng = 75.8098;
        this.activeRoute.params.subscribe(function (params) {
            if (params.id !== undefined) {
                _this._addType = 'quote';
                var idArr = params.id.split('__');
                _this._id = idArr[0];
                if (idArr[0] === 'sj') {
                    _this._id = idArr[1];
                    _this._addType = 'subquote';
                }
            }
        });
    }
    AddQuoteComponent.prototype.ngOnInit = function () {
        var _this = this;
        var self = this;
        self.truckTypes.map(function (tt) {
            self._tempTruckTypes.push(tt.name);
        });
        // map api on load
        self.mapsAPILoader.load().then(function () {
            self._initAutocomplete(document.getElementById('origin'));
        });
        // setting current position in map
        self._setCurrentPosition();
        self.addQuoteForm = new forms_1.FormGroup({
            'customer_name': new forms_1.FormControl(null, [forms_1.Validators.required]),
            'c_id': new forms_1.FormControl(null, [forms_1.Validators.required]),
            'customer_id': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required, forms_1.Validators.maxLength(4)]),
            'customer_job': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required]),
            'quote_name': new forms_1.FormControl('', [forms_1.Validators.required]),
            'origin': new forms_1.FormControl('', [forms_1.Validators.required]),
            //  'tmp_origin': new FormControl(null, [Validators.required]),
            'quantity': new forms_1.FormControl('', [forms_1.Validators.required]),
            'material': new forms_1.FormControl('', [forms_1.Validators.required]),
            'bill_type': new forms_1.FormControl('', [forms_1.Validators.required]),
            'truck_details': self._fb.array([]),
            'status': new forms_1.FormControl('', [forms_1.Validators.required]),
            'documents': new forms_1.FormControl(),
            'document_value': new forms_1.FormControl('', [forms_1.Validators.required])
        });
        // initializing the truck type fields with array
        self._initTruckTypeFields();
        // getting customers list for autocomplete
        self._getCustomersList();
        // File uploader handlers
        // On fiels adding file
        this.fileUploader.onWhenAddingFileFailed = function (item, filter) {
            switch (filter.name) {
                case 'mimeType':
                    document.getElementById('documents').classList.add('ng-invalid');
                    _this.toastr.error('Invalid File Upload', 'Error!', { 'toastLife': 5000 });
                    break;
                case 'queueLimit':
                    document.getElementById('documents').classList.add('ng-invalid');
                    _this.toastr.error('Maxmimam 10 files upload at a time', 'Error!', { 'toastLife': 5000 });
                    break;
                default:
                    break;
            }
        };
        self.fileUploader.onAfterAddingFile = function (fileItem) {
            fileItem.withCredentials = false;
            var url = (window.URL) ? window.URL.createObjectURL(fileItem._file) : window.webkitURL.createObjectURL(fileItem._file);
            document.getElementById('documents').classList.remove('ng-invalid');
            self.addQuoteForm.patchValue({
                document_value: url
            });
        };
        // push file data to filearray once fileuploader item is completed
        self.fileUploader.onCompleteItem = function (item, response, status, headers) {
            self.fileArray.push(response);
        };
        // add quote when file uploading is completed
        self.fileUploader.onCompleteAll = function () {
            self.dataObj.documents = self.fileArray;
            self.addquote(self.dataObj);
        };
    };
    // calls the api to add quote
    AddQuoteComponent.prototype.addquote = function (data) {
        var self = this;
        this.httpService.post(this.url, data)
            .then(function (res) {
            self.loading = false;
            self.addQuoteForm.reset();
            if (self.convertToJob) {
                // get quote id from response
                if (res.data.length) {
                    self.router.navigate(['/jobs/add', res.data[0]._id]);
                }
                else {
                    self.router.navigate(['/quotes/list']);
                }
            }
            else {
                self.toastr.success(res.message, 'Success!', { 'toastLife': 5000 });
                self.router.navigate(['/quotes/list']);
            }
        })
            .catch(function (err) {
            self.loading = false;
            self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
        });
    };
    // do the needful on form submit
    AddQuoteComponent.prototype.onQuoteFormSubmit = function (convertToJob) {
        if (convertToJob === void 0) { convertToJob = false; }
        console.log(this.addQuoteForm.controls.customer_name.status == 'INVALID');
        // let validationMsg = 'There are some invalid fields in the form.';
        // if (this.originName !== this.tmpOrigin) {
        //   validationMsg += ' You must select the job location from suggestions list';
        //   this.tmpOrigin = null
        //   this.addQuoteForm.patchValue({ 'origin': null });
        // }
        this.commonServices.validateAllFormFields(this.addQuoteForm);
        // add invalid to doc 
        if (this.addQuoteForm.controls.document_value.value === '') {
            document.getElementById('documents').classList.add('ng-invalid');
        }
        if (this.addQuoteForm.controls.customer_name.status == 'INVALID') {
            this.toastr.error('Please Select customer name', 'Error!', { 'toastLife': 5000 });
        }
        if (this.addQuoteForm.valid) {
            this.loading = true;
            // combining the address name, lat and lng into source and destination
            var formVal = Object.assign({}, this.addQuoteForm.getRawValue());
            formVal.origin = {
                'address': this.originName,
                'lat': this.originLat,
                'lng': this.originLng
            };
            if (this.originName) {
                formVal.origin.address = this.originName;
            }
            this.dataObj = formVal;
            this.fileUploader.uploadAll();
        }
        else {
            this.toastr.error('There are some invalid fields in the form');
        }
        return false;
    };
    AddQuoteComponent.prototype.getquoteDetails = function () {
        var self = this;
        var httpParams = new http_1.HttpParams();
        var params = httpParams.set('id', this._id);
        var url = environment_1.environment.apiUrl + 'quotes';
        self.loading = true;
        this.httpService.get(url, params)
            .then(function (data) {
            self.loading = false;
        })
            .catch(function (err) {
            self.loading = false;
            self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
        });
    };
    AddQuoteComponent.prototype.selectCustomer = function (selected) {
        var self = this;
        self.loading = false;
        if (selected && selected.originalObject) {
            var _dt = selected.originalObject;
            self.addQuoteForm.patchValue({
                'c_id': _dt._id,
                'customer_id': _dt.customer_id,
                'customer_job': _dt.cust_role
            });
        }
    };
    AddQuoteComponent.prototype._getCustomersList = function () {
        var self = this, url = environment_1.environment.apiUrl + 'customers';
        self.loading = true;
        this.httpService.get(url)
            .then(function (res) {
            self.loading = false;
            if (res.data.length) {
                self.customersList = self.completerService.local(res.data, 'cust_name', 'cust_name');
            }
        })
            .catch(function (err) {
            self.loading = false;
            self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
        });
    };
    AddQuoteComponent.prototype._initTruckTypeFields = function () {
        var self = this;
        self.truckTypes.forEach(function (truckType, i) {
            self.addQuoteForm.get('truck_details').push(new forms_1.FormGroup({
                'truck_type': new forms_1.FormControl(truckType.value, [forms_1.Validators.required]),
                'weekdays': new forms_1.FormControl(null, [forms_1.Validators.required]),
                'saturday': new forms_1.FormControl(null, [forms_1.Validators.required]),
                'sunday': new forms_1.FormControl(null, [forms_1.Validators.required])
            }));
        });
    };
    // initialize google map autocomplete for source/destination fields
    AddQuoteComponent.prototype._initAutocomplete = function (ele) {
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
                    // self.originName = self.tmpOrigin = addr;
                    self.originLat = lat;
                    self.originLng = lng;
                }
            });
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
            });
        });
    };
    // gets the user location from browser and sets current location in google map
    AddQuoteComponent.prototype._setCurrentPosition = function () {
        var _this = this;
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.originLat = position.coords.latitude;
                _this.originLng = position.coords.longitude;
            });
        }
    };
    AddQuoteComponent.prototype.showImageIcon = function (image) {
        return /(?:\.([^.]+))?$/.exec(image)[1];
    };
    AddQuoteComponent.prototype.cancel = function () {
        if (confirm('All the changes you made will be discarded. Are you sure you want to cancel?')) {
            this.router.navigate(['/quotes/list']);
        }
        return false;
    };
    __decorate([
        core_1.ViewChild('search'),
        __metadata("design:type", Number)
    ], AddQuoteComponent.prototype, "destinationLat", void 0);
    AddQuoteComponent = __decorate([
        core_1.Component({
            selector: 'app-add-quote',
            templateUrl: './add-quote.component.html',
            styleUrls: ['./add-quote.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            CommonServices_1.default,
            ng2_completer_1.CompleterService,
            forms_1.FormBuilder,
            HttpServices_1.default,
            core_2.MapsAPILoader,
            core_1.NgZone,
            router_1.Router,
            platform_browser_1.Title,
            ng2_toastr_1.ToastsManager])
    ], AddQuoteComponent);
    return AddQuoteComponent;
}());
exports.AddQuoteComponent = AddQuoteComponent;
//# sourceMappingURL=add-quote.component.js.map