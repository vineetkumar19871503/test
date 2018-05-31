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
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.scss']
})

export class AddQuoteComponent implements OnInit {
  // variables definition
  private addQuoteForm: FormGroup;
  private billAndPayTypes: Object[] = [
    { 'name': 'Hourly', 'value': 'H' },
    { 'name': 'Load', 'value': 'L' },
    { 'name': 'Tonnage', 'value': 'T' },
  ];
  private dataService: CompleterData;
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
  private statusdata: Object[] = [
    { 'name': 'Bidding', 'value': 'Bidding' },
    { 'name': 'In Progress', 'value': 'in_progress' },
    { 'name': 'Awarded', 'value': 'awarded' },
    { 'name': 'Missed', 'value': 'missed' }
  ];
  private rd: any;
  private _tempTruckTypes = [];
  private truckTypes = this.commonServices.getTruckDetails();
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
  private totalReqDateFields: Number = 3;
  private reqDateModel: Object = Array(this.totalReqDateFields)
  private url: string = environment.apiUrl + 'quotes/add';

  // google map variables
  @ViewChild('search')
  private destinationLat: Number = 26.9601;
  private destinationLng: Number = 75.7758;
  private _id: string;
  private _addType: String = null;
  private convertToJob: Boolean = false;
  private customersList: any = [];
  private originName: String = null;
  private destinationName: String = null;
  private originLat: Number = 26.8070;
  private originLng: Number = 75.8098;
  // private tmpOrigin: String = null;
  private zoom: Number = 15;

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
    this.titleService.setTitle(environment.siteName + ' - Add quote');
    this.originLat = 26.8070;
    this.originLng = 75.8098;
    this.activeRoute.params.subscribe(params => {
      if (params.id !== undefined) {
        this._addType = 'quote';
        const idArr = params.id.split('__');
        this._id = idArr[0];
        if (idArr[0] === 'sj') {
          this._id = idArr[1];
          this._addType = 'subquote';
        }
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

    self.addQuoteForm = new FormGroup({
      'customer_name': new FormControl(null, [Validators.required]),
      'c_id': new FormControl(null, [Validators.required]),
      'customer_id': new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(4)]),
      'customer_job': new FormControl({ value: null, disabled: true }, [Validators.required]),
      'quote_name': new FormControl('', [Validators.required]),
      'origin': new FormControl('', [Validators.required]),
      //  'tmp_origin': new FormControl(null, [Validators.required]),
      'quantity': new FormControl('', [Validators.required]),
      'material': new FormControl('', [Validators.required]),
      'bill_type': new FormControl('', [Validators.required]),
      'truck_details': self._fb.array([]),
      'status': new FormControl('', [Validators.required]),
      'documents': new FormControl(),
      'document_value': new FormControl('', [Validators.required])
    });
    // initializing the truck type fields with array
    self._initTruckTypeFields();
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
      self.addQuoteForm.patchValue({
        document_value: url
      });
    };

    // push file data to filearray once fileuploader item is completed
    self.fileUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      self.fileArray.push(response);
    };

    // add quote when file uploading is completed
    self.fileUploader.onCompleteAll = () => {
      self.dataObj.documents = self.fileArray;
      self.addquote(self.dataObj);
    };
  }

  // calls the api to add quote
  addquote(data) {
    const self = this;
    this.httpService.post(this.url, data)
      .then(function (res: any) {
        self.loading = false;
        self.addQuoteForm.reset();
        if (self.convertToJob) {
          // get quote id from response
          if (res.data.length) {
            self.router.navigate(['/jobs/add', res.data[0]._id]);
          } else {
            self.router.navigate(['/quotes/list']);
          }
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

  // do the needful on form submit
  onQuoteFormSubmit(convertToJob = false) {
    console.log(this.addQuoteForm.controls.customer_name.status =='INVALID');
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
    if (this.addQuoteForm.controls.customer_name.status =='INVALID') {
      this.toastr.error('Please Select customer name', 'Error!', { 'toastLife': 5000 });
     
    }
    if (this.addQuoteForm.valid) {
      this.loading = true;
      // combining the address name, lat and lng into source and destination
      const formVal = Object.assign({}, this.addQuoteForm.getRawValue());
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
    } else {
      this.toastr.error('There are some invalid fields in the form');
    }
    return false;
  }

  getquoteDetails() {
    const self = this;
    const httpParams = new HttpParams();
    const params = httpParams.set('id', this._id);
    const url = environment.apiUrl + 'quotes';
    self.loading = true;
    this.httpService.get(url, params)
      .then(function (data: any) {
        self.loading = false;
      })
      .catch(function (err) {
        self.loading = false;
        self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
      });
  }
  selectCustomer(selected: CompleterItem) {
    const self = this;
    self.loading = false;
    if (selected && selected.originalObject) {
      const _dt = selected.originalObject;
      self.addQuoteForm.patchValue({
        'c_id': _dt._id,
        'customer_id': _dt.customer_id,
        'customer_job': _dt.cust_role
      });
    }
  }
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
  private _initTruckTypeFields() {
    const self = this;
    self.truckTypes.forEach(function (truckType: { name: null, value: null }, i) {
      (<FormArray>self.addQuoteForm.get('truck_details')).push(
        new FormGroup({
          'truck_type': new FormControl(truckType.value, [Validators.required]),
          'weekdays': new FormControl(null, [Validators.required]),
          'saturday': new FormControl(null, [Validators.required]),
          'sunday': new FormControl(null, [Validators.required])
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
        if (ele.id === 'origin') {
          // self.originName = self.tmpOrigin = addr;
          self.originLat = lat;
          self.originLng = lng;
        }
      });
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
        if (ele.id === 'origin') {
          self.originName = addr;
          self.originLat = lat;
          self.originLng = lng;
        }
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
