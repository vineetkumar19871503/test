import { } from 'googlemaps';
import { ActivatedRoute, Router } from '@angular/router';
import CommonServices from '../../shared/services/CommonServices';
import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import { environment } from '../../../environments/environment';
import { FormControl, FormBuilder, FormArray, FormGroup, Validators, NgForm } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import HttpServices from '../../shared/services/HttpServices';
import { MapsAPILoader } from '@agm/core';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { take } from 'rxjs/operator/take';

const URL = environment.apiUrl + 'upload';

@Component({
  selector: 'app-edit-quote',
  templateUrl: './edit-quote.component.html',
  styleUrls: ['../add/add-quote.component.scss']
})

export class EditQuoteComponent implements OnInit {
  // variables definition
  private editQuoteForm: FormGroup;
  private billAndPayTypes: Object[] = [
    { 'name': 'Hourly', 'value': 'H' },
    { 'name': 'Load', 'value': 'L' },
    { 'name': 'Tonnage', 'value': 'T' },
  ];
  private dataService: CompleterData;
  private isDataLoaded: Boolean = false;
  private loading: boolean = false;
  private materials: Object[] = [
    { 'name': 'Rock', 'value': 'rock' },
    { 'name': 'Base Rock', 'value': 'baserock' },
    { 'name': 'Drain Rock', 'value': 'drainrock' },
    { 'name': 'Dirt', 'value': 'dirt' },
    { 'name': 'Sand', 'value': 'sand' },
    { 'name': 'AC', 'value': 'aC' },
    { 'name': 'Concrete', 'value': 'concrete' },
    { 'name': 'Ashpalt', 'value': 'ashpalt' }
  ];
  private pd: any;
  private pdModel: any;
  private prelimDateModel: any;
  private quoteDetail;
  private statusdata: Object[] = [
    { 'name': 'Bidding', 'value': 'Bidding' },
    { 'name': 'In Progress', 'value': 'in_progress' },
    { 'name': 'Awarded', 'value': 'awarded' },
    { 'name': 'Missed', 'value': 'missed' }
  ];
  private rd: any;
  private _tempTruckTypes = [];
  private truckTypes = this.commonServices.getTruckDetails();
  private totalReqDateFields: Number = 3;
  private reqDateModel: Object = Array(this.totalReqDateFields)
  private url: string = environment.apiUrl + 'quotes/edit';

  // google map variables
  @ViewChild('search')
  private originLat;
  private originLng;
  private originName: String;
  private _id: string;
  private _addType: String = null;
  private convertToJob: Boolean = false;
  private zoom: Number = 15;
  private customersList: any = [];
  private quoteDocs = [];
  private newFileUploaded = false;
  public fileUploader: FileUploader = new FileUploader({ url: URL, queueLimit: 10, allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf', 'application/msword', 'application/vnd.ms-excel', 'text/plain'] });
  private fileArray = [];
  private dataObj: any;

  // constructor
  constructor(
    private activeRoute: ActivatedRoute,
    private commonServices: CommonServices,
    private completerService: CompleterService,
    private _fb: FormBuilder,
    private httpService: HttpServices,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private titleService: Title,
    private toastr: ToastsManager,
  ) {
    this.titleService.setTitle(environment.siteName + ' - Edit quote');
    // getting quote id from param
    this.activeRoute.params.subscribe(params => {
      if (params.id !== undefined) {
        this._id = params.id;
      } else {
        this.toastr.error('Please provide quote id!', 'Error!', { 'toastLife': 5000 });
        this.router.navigate(['/quotes/list']);
      }
    });
  }

  ngOnInit() {
    const self = this;
    self.truckTypes.map(function (tt: { name: '', value: '' }) {
      self._tempTruckTypes.push(tt.name);
    });

    // map api on load
    self.mapsAPILoader.load().then(() => {
      self._initAutocomplete(document.getElementById('origin'));
    });

    // setting current position in map
    self._setCurrentPosition();

    // initializing form
    self.editQuoteForm = new FormGroup({
      'id': new FormControl(null, [Validators.required]),
      'customer_name': new FormControl({ value: null, disabled: true }, [Validators.required]),
      'c_id': new FormControl(null, [Validators.required]),
      'customer_id': new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(4)]),
      'customer_job': new FormControl({ value: null, disabled: true }, [Validators.required]),
      'quote_name': new FormControl('', [Validators.required]),
      'origin': new FormControl('', [Validators.required]),
      'quantity': new FormControl('', [Validators.required]),
      'material': new FormControl('', [Validators.required]),
      'bill_type': new FormControl('', [Validators.required]),
      'truck_details': self._fb.array([]),
      'status': new FormControl('', [Validators.required]),
      'documents': new FormControl(),
      'document_value': new FormControl('', [Validators.required])
    });

    // getting customers list for autocomplete
    self._getCustomersList();

    // File uploader handlers
    // On fiels adding file
    this.fileUploader.onWhenAddingFileFailed = (item, filter) => {
      switch (filter.name) {
        case 'mimeType':
          document.getElementById('documents').classList.add('ng-invalid');
          this.toastr.error('Invalid File Upload', 'Error!', { 'toastLife': 5000 });
          break;
        case 'queueLimit':
          document.getElementById('documents').classList.add('ng-invalid');
          this.toastr.error('Maxmimam 10 files upload at a time', 'Error!', { 'toastLife': 5000 });
          break;
        default:
          break;
      }
    };

    self.fileUploader.onAfterAddingFile = (fileItem) => {
      fileItem.withCredentials = false;
      const url = (window.URL) ? window.URL.createObjectURL(fileItem._file) : (window as any).webkitURL.createObjectURL(fileItem._file);
      document.getElementById('documents').classList.remove('ng-invalid');
      self.newFileUploaded = true;
      self.quoteDocs.push({ 'name': fileItem._file.name });
      self.editQuoteForm.patchValue({
        document_value: url
      });
    };

    // push file data to filearray once fileuploader item is completed
    self.fileUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      self.fileArray.push(response);
    };

    // edit quote when file uploading is completed
    self.fileUploader.onCompleteAll = () => {
      self.dataObj.documents = self.quoteDetail.documents ? self.fileArray.concat(self.quoteDetail.documents) : self.fileArray;
      self.editQuote(self.dataObj);
    };

    // get quote details and fill the form
    self._getQuoteDetails();
  }

  // calls the api to edit quote
  editQuote(data) {
    const self = this;
    this.httpService.post(this.url, data)
      .then(function (res: any) {
        self.loading = false;
        self.editQuoteForm.reset();
        if (self.convertToJob) {
          // get quote id from response
          self.router.navigate(['/jobs/add', self.quoteDetail._id]);
        } else {
          self.toastr.success(res.message, 'Success!', { 'toastLife': 5000 });
          self.router.navigate(['/quotes/list']);
        }
      })
      .catch(function (err) {
        self.loading = false;
        self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
      });
  }

  // get the quote detail and fill them in form
  private _getQuoteDetails() {
    const self = this,
      url = environment.apiUrl + 'quotes/getQuoteById?id=' + this._id;
    self.loading = true;
    self.httpService.get(url)
      .then(function (res: any) {
        if (res.data.length) {
          self.quoteDetail = res.data[0];
          const docs = self.quoteDetail.documents;
          self.quoteDocs = [];
          if (docs !== null && docs.length) {
            self.quoteDocs = self.quoteDetail.documents.map(function (dc) {
              dc = JSON.parse(dc);
              const nameArr = dc.file_path.split('/');
              dc.name = nameArr[nameArr.length - 1];
              return dc;
            });
          }
          const _q = res.data[0],
            _c = _q.customer,
            _formVal: any = {
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
        } else {
          // initializing the truck type fields with array
          self._initTruckTypeFields([]);
        }
        self.loading = false;
      })
      .catch(function (err) {
        self.loading = false;
        self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
      });
  }

  // do the needful on form submit
  onQuoteFormSubmit(convertToJob = false) {
    this.commonServices.validateAllFormFields(this.editQuoteForm);
    // add invalid to doc
    if (this.editQuoteForm.controls.document_value.value === '') {
      document.getElementById('documents').classList.add('ng-invalid');
    }

    if (this.editQuoteForm.valid) {
      this.loading = true;
      // combining the address name, lat and lng into source and destination
      const formVal = Object.assign({}, this.editQuoteForm.value);
      formVal.origin = {
        'address': this.originName,
        'lat': this.originLat,
        'lng': this.originLng
      };
      this.dataObj = formVal;
      // if files are added then call uploadall method
      if (this.newFileUploaded) {
        this.fileUploader.uploadAll();
      } else {
        this.dataObj.documents = this.quoteDetail.documents;
        this.editQuote(this.dataObj);
      }
    } else {
      this.toastr.error('There are some invalid fields in the form');
    }
    return false;
  }

  // fill customer id and role when customer is selected from dropdown
  selectCustomer(selected: CompleterItem) {
    const self = this;
    self.loading = false;
    if (selected && selected.originalObject) {
      const _dt = selected.originalObject;
      self.editQuoteForm.patchValue({
        'c_id': _dt._id,
        'customer_id': _dt.customer_id,
        'customer_job': _dt.cust_role
      });
    }
  }

  // get customers for auto complete
  private _getCustomersList() {
    const self = this,
      url = environment.apiUrl + 'customers';
    self.loading = true;
    this.httpService.get(url)
      .then(function (res: any) {
        self.loading = false;
        if (res.data.length) {
          self.customersList = self.completerService.local(res.data, 'cust_name', 'cust_name');
        }
      })
      .catch(function (err) {
        self.loading = false;
        self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
      });
  }

  // initialize truck type form array
  private _initTruckTypeFields(data?) {
    const self = this;
    self.truckTypes.forEach(function (truckType: any, i) {
      const _tt = truckType.value;
      let wd = null,
        st = null,
        sd = null;
      data.forEach(function (_d) {
        if (_d.truck_type === _tt) {
          wd = _d.weekdays;
          st = _d.saturday;
          sd = _d.sunday;
          return false;
        }
      });
      (<FormArray>self.editQuoteForm.get('truck_details')).push(
        new FormGroup({
          'truck_type': new FormControl(_tt, [Validators.required]),
          'weekdays': new FormControl(wd, [Validators.required]),
          'saturday': new FormControl(st, [Validators.required]),
          'sunday': new FormControl(sd, [Validators.required])
        })
      );
    });
  }

  // initialize google map autocomplete for source/destination fields
  private _initAutocomplete(ele) {
    const self = this,
      autocomplete = new google.maps.places.Autocomplete(ele, {
        types: ['address']
      });
    autocomplete.addListener('place_changed', () => {
      self.ngZone.run(() => {
        // get the place result
        const place: google.maps.places.PlaceResult = autocomplete.getPlace();
        // verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
        const lat = place.geometry.location.lat(),
          lng = place.geometry.location.lng(),
          addr = place.formatted_address;

        self.originName = addr;
        self.originLat = lat;
        self.originLng = lng;
      });
    });
  }

  // gets the user location from browser and sets current location in google map
  _setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.originLat = position.coords.latitude;
        this.originLng = position.coords.longitude;
      });
    }
  }

  showImageIcon(image) {
    return /(?:\.([^.]+))?$/.exec(image)[1];
  }

  cancel() {
    if (confirm('All the changes you made will be discarded. Are you sure you want to cancel?')) {
      this.router.navigate(['/quotes/list']);
    }
    return false;
  }
}
