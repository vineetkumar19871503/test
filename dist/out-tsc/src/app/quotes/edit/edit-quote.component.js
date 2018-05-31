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
var HttpServices_1 = require("../../shared/services/HttpServices");
var core_2 = require("@agm/core");
var platform_browser_1 = require("@angular/platform-browser");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var ng2_file_upload_1 = require("ng2-file-upload/ng2-file-upload");
var URL = environment_1.environment.apiUrl + 'upload';
var EditQuoteComponent = (function () {
    // constructor
    function EditQuoteComponent(activeRoute, commonServices, completerService, _fb, httpService, mapsAPILoader, ngZone, router, titleService, toastr) {
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
        this.isDataLoaded = false;
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
        this.totalReqDateFields = 3;
        this.reqDateModel = Array(this.totalReqDateFields);
        this.url = environment_1.environment.apiUrl + 'quotes/edit';
        this._addType = null;
        this.convertToJob = false;
        this.zoom = 15;
        this.customersList = [];
        this.quoteDocs = [];
        this.newFileUploaded = false;
        this.fileUploader = new ng2_file_upload_1.FileUploader({ url: URL, queueLimit: 10, allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf', 'application/msword', 'application/vnd.ms-excel', 'text/plain'] });
        this.fileArray = [];
        this.titleService.setTitle(environment_1.environment.siteName + ' - Edit quote');
        // getting quote id from param
        this.activeRoute.params.subscribe(function (params) {
            if (params.id !== undefined) {
                _this._id = params.id;
            }
            else {
                _this.toastr.error('Please provide quote id!', 'Error!', { 'toastLife': 5000 });
                _this.router.navigate(['/quotes/list']);
            }
        });
    }
    EditQuoteComponent.prototype.ngOnInit = function () {
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
        // initializing form
        self.editQuoteForm = new forms_1.FormGroup({
            'id': new forms_1.FormControl(null, [forms_1.Validators.required]),
            'customer_name': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required]),
            'c_id': new forms_1.FormControl(null, [forms_1.Validators.required]),
            'customer_id': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required, forms_1.Validators.maxLength(4)]),
            'customer_job': new forms_1.FormControl({ value: null, disabled: true }, [forms_1.Validators.required]),
            'quote_name': new forms_1.FormControl('', [forms_1.Validators.required]),
            'origin': new forms_1.FormControl('', [forms_1.Validators.required]),
            'quantity': new forms_1.FormControl('', [forms_1.Validators.required]),
            'material': new forms_1.FormControl('', [forms_1.Validators.required]),
            'bill_type': new forms_1.FormControl('', [forms_1.Validators.required]),
            'truck_details': self._fb.array([]),
            'status': new forms_1.FormControl('', [forms_1.Validators.required]),
            'documents': new forms_1.FormControl(),
            'document_value': new forms_1.FormControl('', [forms_1.Validators.required])
        });
        // getting customers list for autocomplete
        self._getCustomersList();
        // File uploader handlers
        // On fiels adding file
        this.fileUploader.onWhenAddingFileFailed = function (item, filter) {
            console.log(filter.name);
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
            self.newFileUploaded = true;
            self.quoteDocs.push({ 'name': fileItem._file.name });
            self.editQuoteForm.patchValue({
                document_value: url
            });
        };
        // push file data to filearray once fileuploader item is completed
        self.fileUploader.onCompleteItem = function (item, response, status, headers) {
            self.fileArray.push(response);
        };
        // edit quote when file uploading is completed
        self.fileUploader.onCompleteAll = function () {
            self.dataObj.documents = self.quoteDetail.documents ? self.fileArray.concat(self.quoteDetail.documents) : self.fileArray;
            self.editQuote(self.dataObj);
        };
        // get quote details and fill the form
        self._getQuoteDetails();
    };
    // calls the api to edit quote
    EditQuoteComponent.prototype.editQuote = function (data) {
        var self = this;
        this.httpService.post(this.url, data)
            .then(function (res) {
            self.loading = false;
            self.editQuoteForm.reset();
            if (self.convertToJob) {
                // get quote id from response
                self.router.navigate(['/jobs/add', self.quoteDetail._id]);
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
    // get the quote detail and fill them in form
    EditQuoteComponent.prototype._getQuoteDetails = function () {
        var self = this, url = environment_1.environment.apiUrl + 'quotes/getQuoteById?id=' + this._id;
        self.loading = true;
        self.httpService.get(url)
            .then(function (res) {
            if (res.data.length) {
                self.quoteDetail = res.data[0];
                var docs = self.quoteDetail.documents;
                self.quoteDocs = [];
                if (docs !== null && docs.length) {
                    self.quoteDocs = self.quoteDetail.documents.map(function (dc) {
                        dc = JSON.parse(dc);
                        var nameArr = dc.file_path.split('/');
                        dc.name = nameArr[nameArr.length - 1];
                        return dc;
                    });
                }
                var _q = res.data[0], _c = _q.customer, _formVal = {
                    'id': _q._id,
                    'customer_name': _c.cust_name,
                    'c_id': _c._id,
                    'customer_id': _c.customer_id,
                    'customer_job': _c.cust_role,
                    'quote_name': _q.quote_name,
                    'origin': _q.origin.address,
                    'quantity': _q.quantity,
                    'material': _q.material,
                    'bill_type': _q.bill_type,
                    'status': _q.status,
                };
                self.originName = _q.origin.address;
                self.originLat = _q.origin.lat;
                self.originLng = _q.origin.lng;
                if (self.quoteDocs.length) {
                    _formVal.document_value = 'xyz';
                }
                // filling quote details in form
                self.editQuoteForm.patchValue(_formVal);
                self._initTruckTypeFields(_q.truck_details);
            }
            else {
                // initializing the truck type fields with array
                self._initTruckTypeFields([]);
            }
            self.loading = false;
        })
            .catch(function (err) {
            self.loading = false;
            self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
        });
    };
    // do the needful on form submit
    EditQuoteComponent.prototype.onQuoteFormSubmit = function (convertToJob) {
        if (convertToJob === void 0) { convertToJob = false; }
        this.commonServices.validateAllFormFields(this.editQuoteForm);
        // add invalid to doc
        if (this.editQuoteForm.controls.document_value.value === '') {
            document.getElementById('documents').classList.add('ng-invalid');
        }
        if (this.editQuoteForm.valid) {
            this.loading = true;
            // combining the address name, lat and lng into source and destination
            var formVal = Object.assign({}, this.editQuoteForm.value);
            formVal.origin = {
                'address': this.originName,
                'lat': this.originLat,
                'lng': this.originLng
            };
            this.dataObj = formVal;
            // if files are added then call uploadall method
            if (this.newFileUploaded) {
                this.fileUploader.uploadAll();
            }
            else {
                this.dataObj.documents = this.quoteDetail.documents;
                this.editQuote(this.dataObj);
            }
        }
        else {
            this.toastr.error('There are some invalid fields in the form');
        }
        return false;
    };
    // fill customer id and role when customer is selected from dropdown
    EditQuoteComponent.prototype.selectCustomer = function (selected) {
        var self = this;
        self.loading = false;
        if (selected && selected.originalObject) {
            var _dt = selected.originalObject;
            self.editQuoteForm.patchValue({
                'c_id': _dt._id,
                'customer_id': _dt.customer_id,
                'customer_job': _dt.cust_role
            });
        }
    };
    // get customers for auto complete
    EditQuoteComponent.prototype._getCustomersList = function () {
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
    // initialize truck type form array
    EditQuoteComponent.prototype._initTruckTypeFields = function (data) {
        var self = this;
        self.truckTypes.forEach(function (truckType, i) {
            var _tt = truckType.value;
            var wd = null, st = null, sd = null;
            data.forEach(function (_d) {
                if (_d.truck_type === _tt) {
                    wd = _d.weekdays;
                    st = _d.saturday;
                    sd = _d.sunday;
                    return false;
                }
            });
            self.editQuoteForm.get('truck_details').push(new forms_1.FormGroup({
                'truck_type': new forms_1.FormControl(_tt, [forms_1.Validators.required]),
                'weekdays': new forms_1.FormControl(wd, [forms_1.Validators.required]),
                'saturday': new forms_1.FormControl(st, [forms_1.Validators.required]),
                'sunday': new forms_1.FormControl(sd, [forms_1.Validators.required])
            }));
        });
    };
    // initialize google map autocomplete for source/destination fields
    EditQuoteComponent.prototype._initAutocomplete = function (ele) {
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
                self.originName = addr;
                self.originLat = lat;
                self.originLng = lng;
            });
        });
    };
    // gets the user location from browser and sets current location in google map
    EditQuoteComponent.prototype._setCurrentPosition = function () {
        var _this = this;
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.originLat = position.coords.latitude;
                _this.originLng = position.coords.longitude;
            });
        }
    };
    EditQuoteComponent.prototype.showImageIcon = function (image) {
        return /(?:\.([^.]+))?$/.exec(image)[1];
    };
    EditQuoteComponent.prototype.cancel = function () {
        if (confirm('All the changes you made will be discarded. Are you sure you want to cancel?')) {
            this.router.navigate(['/quotes/list']);
        }
        return false;
    };
    __decorate([
        core_1.ViewChild('search'),
        __metadata("design:type", Object)
    ], EditQuoteComponent.prototype, "originLat", void 0);
    EditQuoteComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-quote',
            templateUrl: './edit-quote.component.html',
            styleUrls: ['../add/add-quote.component.scss']
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
    ], EditQuoteComponent);
    return EditQuoteComponent;
}());
exports.EditQuoteComponent = EditQuoteComponent;
//# sourceMappingURL=edit-quote.component.js.map