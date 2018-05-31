import { } from 'googlemaps';
import { ActivatedRoute, Router } from '@angular/router';
import CommonServices from '../../shared/services/CommonServices';
import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormControl, FormBuilder, FormArray, FormGroup, Validators, NgForm, AbstractControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import HttpServices from '../../shared/services/HttpServices';
import { MapsAPILoader } from '@agm/core';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { AuthService } from './../../shared/auth/auth.service';
const URL = environment.apiUrl + 'upload';
@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})

export class AddJobComponent implements OnInit {
  // variables definition
  private addJobForm: FormGroup;
  private billAndPayTypes: Object[] = [
    { 'name': 'Hourly', 'value': 'H' },
    { 'name': 'Load', 'value': 'L' },
    { 'name': 'Tonnage', 'value': 'T' },
  ];

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
  private rd1: any;
  private rd1Model: any;
  private rd2: any;
  private rd2Model: any;
  private rd3: any;
  private rd3Model: any;

  private bill_rateValue: any = 0;
  private bill_bridge_toll_inputValue: any;
  private bill_dump_fee_inputValue: any;
  private bill_environmental_fee_inputValue: any;
  private bill_others_inputValue: any;

  private pay_rateValue: any = 0;
  private pay_bridge_toll_inputValue: any;
  private pay_dump_fee_inputValue: any;
  private pay_environmental_fee_inputValue: any;
  private pay_others_inputValue: any;

  private payTotalValue: any;
  private billTotalValue: any;
  private netTotalValue: any;

  private quarries: Object[] = [
    { 'name': 'Quarry1', 'value': 'quarry1' },
    { 'name': 'Quarry2', 'value': 'quarry2' },
    { 'name': 'Quarry3', 'value': 'quarry3' },
    { 'name': 'Quarry4', 'value': 'quarry4' }
  ];

  private selectedBillTypevalues;
  private selectedPayTypevalues;
  private bill_notApplicableCheck: any = false;
  private bridge_toll_values = [15, 20, 25, 25, 25, 25];
  private net_color = [];

  private rd: any;
  private _tempTruckTypes = [];
  private truckTypes = this.commonServices.getTruckDetails();
  private totalReqDateFields: Number = 3;
  private reqDateModel: Object = Array(this.totalReqDateFields)
  private url: string = environment.apiUrl + 'jobs/convertToJob';

  // google map variables
  @ViewChild('search')
  private originLat: Number = 26.8070;
  private originLng: Number = 75.8098;
  private originName: String = null;
  private destinationLat: Number = 26.9601;
  private destinationName: String = null;
  private destinationLng: Number = 75.7758;
  private qid: string;
  private _addType: String = null;
  private quoteDetails;
  private zoom: Number = 15;
  public fileUploader: FileUploader = new FileUploader({ url: environment.apiUrl + 'upload', queueLimit: 10, allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf', 'application/msword', 'application/vnd.ms-excel', 'text/plain'] });
  private fileArray = [];
  private dataObj: any;

  // constructor
  constructor(
    private activeRoute: ActivatedRoute,
    private commonServices: CommonServices,
    private _fb: FormBuilder,
    private httpService: HttpServices,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private titleService: Title,
    private toastr: ToastsManager,
    private authService: AuthService,
  ) {
    this.titleService.setTitle(environment.siteName + ' - Add Job');
    this.originLat = 26.8070;
    this.originLng = 75.8098;
    this.activeRoute.params.subscribe(params => {
      if (params.id !== undefined) {
        this._addType = 'job';
        const idArr = params.id.split('__');
        this.qid = idArr[0];
        if (idArr[0] === 'sj') {
          this.qid = idArr[1];
          this._addType = 'subjob';
        }
      }
    });
  }

  ngOnInit() {
    const self = this;
    this.truckTypes.map(function (tt: { name: '', value: '' }) {
      self._tempTruckTypes.push(tt.name);
    });

    // setting current position in map
    self._setCurrentPosition();

    // map api on load
    self.mapsAPILoader.load().then(() => {
      self._initAutocomplete(document.getElementById('origin'));
      // self._initAutocomplete(document.getElementById('destination'));
    });

    // form fields declaration
    this.addJobForm = this._fb.group({
      'customer_name': new FormControl({ value: null, disabled: true }, [Validators.required]),
      'c_id': new FormControl({ value: null, disabled: true }, [Validators.required]),
      'customer_id': new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(4)]),
      'job_id': new FormControl({ value: null, disabled: true }, [Validators.required]),
      'qt_id': new FormControl(null, [Validators.required]),
      'quote_id': new FormControl({ value: null, disabled: true }, [Validators.required]),
      'quote_number': new FormControl({ value: null, disabled: true }, [Validators.required]),
      'customer_job': new FormControl({ value: null, disabled: true }, [Validators.required]),
      'job_name': new FormControl({ value: null }, [Validators.required]),
      'purchase_order': new FormControl(null),
      'bill_type': new FormControl({ value: '' }, [Validators.required]),
      'pay_type': new FormControl('H', [Validators.required]),
      'origin': new FormControl({ value: null, disabled: true }, [Validators.required]),
      'destination': new FormControl('', [Validators.required]),
      'bill_from': new FormControl('', [Validators.required]),
      'bill_minimum': new FormControl(null),
      'pay_minimum': new FormControl(null),
      'certified_payroll': new FormControl('n', [Validators.required]),
      'prelim_date': new FormControl(null),
      'request_dates1': new FormControl(null),
      'request_dates2': new FormControl(null),
      'request_dates3': new FormControl(null),
      'request_dates': this._fb.array([]),
      'quarries': this._fb.array([]),
      'truck_details': this._fb.array([]),
      'direction': new FormControl('', [Validators.required]),
      'internal_notes': new FormControl('', [Validators.required]),
      'document': new FormControl(),
      'document_value': new FormControl(null, [Validators.required]),
      'bill_includes': new FormControl(null),
      'pay_includes': new FormControl(null),
      'bill_bridge_toll_check': new FormControl(null),
      'bill_dump_fee_check': new FormControl(null),
      'bill_environmental_fee_check': new FormControl(null),
      'bill_others': new FormControl(null),
      'bill_notApplicableCheck': new FormControl(false),
      'pay_notApplicableCheck': new FormControl(false),
      'pay_bridge_toll_check': new FormControl(null),
      'pay_dump_fee_check': new FormControl(null),
      'pay_environmental_fee_check': new FormControl(null),
      'pay_others': new FormControl(null),
    });

    // this._initRequestDateFields();

    // initializing the truck type fields with array
    this._initTruckTypeFields();

    this.getQuoteDetails();

    // File uploader handlers
    // On fiels adding file
    this.fileUploader.onWhenAddingFileFailed = (item, filter) => {
      switch (filter.name) {
        case 'mimeType':
          document.getElementById('document').classList.add('ng-invalid');
          this.toastr.error('Invalid File Upload', 'Error!', { 'toastLife': 5000 });
          break;
        case 'queueLimit':
          document.getElementById('document').classList.add('ng-invalid');
          this.toastr.error('Maxmimam 10 files upload at a time', 'Error!', { 'toastLife': 5000 });
          break;
        default:
          break;
      }
    };

    self.fileUploader.onAfterAddingFile = (fileItem) => {
      fileItem.withCredentials = false;
      const url = (window.URL) ? window.URL.createObjectURL(fileItem._file) : (window as any).webkitURL.createObjectURL(fileItem._file);
      document.getElementById('document').classList.remove('ng-invalid');
      self.addJobForm.patchValue({
        document_value: url
      });
    };

    // push file data to filearray once fileuploader item is completed
    self.fileUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      self.fileArray.push(response);
    };

    // add quote when file uploading is completed
    self.fileUploader.onCompleteAll = () => {
      self.dataObj.document = self.fileArray;
      self.addJob(self.dataObj);
    };
  }

  // calls the api to add job
  addJob(data) {
    const self = this;
    self.loading = true;
    this.httpService.post(this.url, data)
      .then(function (res: any) {
        self.loading = false;
        self.toastr.success(res.message, 'Success!', { 'toastLife': 5000 });
        self.addJobForm.reset();
        self.router.navigate(['/jobs/jobsListByCustomerId', self.quoteDetails.c_id]);
      })
      .catch(function (err) {
        self.loading = false;
        self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
      });
  }

  // do the needful on form submit
  onJobFormSubmit(e) {
    const self = this;
    const userDetails: any = self.authService.getUserData('user');
    self.commonServices.validateAllFormFields(this.addJobForm);
    if (this.addJobForm.valid) {
      // combining the address name, lat and lng into source and destination
      const formVal = Object.assign({}, this.addJobForm.getRawValue());
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
        'address': this.destinationName,
        'lat': this.destinationLat,
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
    } else {
      this.toastr.error('There are some invalid fields in the form');
    }
  }

  getNextJobId(data) {
    const self = this,
      url = environment.apiUrl + 'jobs/getNextId';
    self.loading = true;
    self.httpService.get(url)
      .then(function (res: any) {
        self.loading = false;
        const cust = data.customer;
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

        //show selected bill type label
        self.changeBillType();
        //show selected pay type label
        self.changePayType();

      })

      .catch(function (err) {
        self.loading = false;
        self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
      });
  }

  getQuoteDetails() {
    const self = this,
      httpParams = new HttpParams(),
      params = httpParams.set('id', self.qid),
      url = environment.apiUrl + 'quotes/getQuoteById';
    self.loading = true;
    self.httpService.get(url, params)
      .then(function (res: any) {
        if (res.data.length) {
          self.quoteDetails = res.data[0];
          if (self.quoteDetails.converted) {
            self.toastr.error('The quote has already been converted to job', 'Error!', { 'toastLife': 5000 });
            self.router.navigate(['/quotes/list']);
          } else {
            self.getNextJobId(self.quoteDetails);
          }
          self._addQuaryMaterialRow(self.quoteDetails);
        } else {
          self.toastr.error('Quote not found', 'Error!', { 'toastLife': 5000 });
          self.router.navigate(['/quotes/list']);
        }
      })
      .catch(function (err) {
        self.loading = false;
        self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
      });
  }

  // initializes request fields in n number
  // _initRequestDateFields() {
  //   for (let i = 0; i < this.totalReqDateFields; i++) {
  //     (<FormArray>this.addJobForm.get('request_dates')).push(new FormControl(null, []));
  //   }
  // }
  _initTruckTypeFields() {
    const self = this;
    self.truckTypes.forEach(function (truckType: { name: null, value: null }, i) {
      (<FormArray>self.addJobForm.get('truck_details')).push(
        new FormGroup({
          'truck_type': new FormControl(truckType.value, [Validators.required]),
          'bill_rate': new FormControl(null, [Validators.required]),
          'pay_rate': new FormControl(null, [Validators.required]),
          // 'dump': new FormControl(null, [Validators.required])
          'bill_bridge_toll_input': new FormControl(self.bridge_toll_values[i]),
          'bill_dump_fee_input': new FormControl(null),
          'bill_environmental_fee_input': new FormControl(null),
          'pay_bridge_toll_input': new FormControl(self.bridge_toll_values[i]),
          'pay_dump_fee_input': new FormControl(null),
          'pay_environmental_fee_input': new FormControl(null),
          'bill_others_input': new FormControl(null),
          'pay_others_input': new FormControl(null),
          'net_value': new FormControl({value:null,disabled: true}),
        })
      );
    });
  }

  //assign dynamic validation in truck type fields
  validatePasscode(control: AbstractControl): { [s: string]: boolean } {
    const group = control.parent;
    if (group) {
      const billType = group.parent.parent.get('bill_type').value;
      const payType = group.parent.parent.get('pay_type').value;

      group.controls['bill_bridge_toll_input'].setValidators([]);
      group.controls['bill_dump_fee_input'].setValidators([]);
      group.controls['bill_environmental_fee_input'].setValidators([]);
      group.controls['bill_others_input'].setValidators([]);

      group.controls['pay_bridge_toll_input'].setValidators([]);
      group.controls['pay_dump_fee_input'].setValidators([]);
      group.controls['pay_environmental_fee_input'].setValidators([]);
      group.controls['pay_others_input'].setValidators([]);
      
      if (group.parent.parent.get('bill_includes').value) {

        if (billType == 'H' && group.parent.parent.get('bill_bridge_toll_check').value && !group.parent.parent.get('bill_notApplicableCheck').value) {
          group.controls['bill_bridge_toll_input'].setValidators([Validators.required]);
        }

        if ((billType == 'H' && group.parent.parent.get('bill_dump_fee_check').value) || ((billType == 'L' || billType == 'T') && !group.parent.parent.get('bill_dump_fee_check').value)) {
          group.controls['bill_dump_fee_input'].setValidators([Validators.required]);
        }

        if ((billType == 'H' && group.parent.parent.get('bill_environmental_fee_check').value) || ((billType == 'L' || billType == 'T') && !group.parent.parent.get('bill_environmental_fee_check').value)) {
          group.controls['bill_environmental_fee_input'].setValidators([Validators.required]);
        }

        if (group.parent.parent.get('bill_others').value && group.parent.parent.get('bill_others').value != '') {
          group.controls['bill_others_input'].setValidators([Validators.required]);
        }

      }

      if (group.parent.parent.get('pay_includes').value) {

        if (payType == 'H' && group.parent.parent.get('pay_bridge_toll_check').value && !group.parent.parent.get('pay_notApplicableCheck').value) {
          group.controls['pay_bridge_toll_input'].setValidators([Validators.required]);
        }

        if ((payType == 'H' && group.parent.parent.get('pay_dump_fee_check').value) || ((payType == 'L' || payType == 'T') && !group.parent.parent.get('pay_dump_fee_check').value)) {
          group.controls['pay_dump_fee_input'].setValidators([Validators.required]);
        }

        if ((payType == 'H' && group.parent.parent.get('pay_environmental_fee_check').value) || ((payType == 'L' || payType == 'T') && !group.parent.parent.get('pay_environmental_fee_check').value)) {
          group.controls['pay_environmental_fee_input'].setValidators([Validators.required]);
        }

        if (group.parent.parent.get('pay_others').value && group.parent.parent.get('pay_others').value != '') {
          group.controls['pay_others_input'].setValidators([Validators.required]);
        }

      }

      group.controls['bill_bridge_toll_input'].updateValueAndValidity({ onlySelf: true, emitEvent: false });
      group.controls['bill_dump_fee_input'].updateValueAndValidity({ onlySelf: true, emitEvent: false });
      group.controls['bill_environmental_fee_input'].updateValueAndValidity({ onlySelf: true, emitEvent: false });
      group.controls['bill_others_input'].updateValueAndValidity({ onlySelf: true, emitEvent: false });

      group.controls['pay_bridge_toll_input'].updateValueAndValidity({ onlySelf: true, emitEvent: false });
      group.controls['pay_dump_fee_input'].updateValueAndValidity({ onlySelf: true, emitEvent: false });
      group.controls['pay_environmental_fee_input'].updateValueAndValidity({ onlySelf: true, emitEvent: false });
      group.controls['pay_others_input'].updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }
    return null;
  }

  // request fields will be dynamic so this function adds a dummy request field in form
  _addDummyReqDateField(e) {
    if (e) {
      e.preventDefault();
    }
    (<FormArray>this.addJobForm.get('request_dates')).push(new FormControl(null, []));
  }
  // request fields will be dynamic so this function adds a dummy request field in form
  _addQuaryMaterialRow(data?) {
    (<FormArray>this.addJobForm.get('quarries')).push(
      new FormGroup({
        'quarry': new FormControl('', [Validators.required]),
        'material': new FormControl(data ? data.material : '', [Validators.required]),
        // 'we_buy': new FormControl(null, [Validators.required]),
        // 'we_sell': new FormControl(null, [Validators.required])
      })
    );
    return false;
  }

  // initialize google map autocomplete for source/destination fields
  _initAutocomplete(ele) {
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
          self.originName = addr;
          self.originLat = lat;
          self.originLng = lng;
        } else if (ele.id === 'destination') {
          self.destinationName = addr;
          self.destinationLat = lat;
          self.destinationLng = lng;
        }
      });
    });
  }

  // gets the user location from browser and sets current location in google map
  _setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.originLat = this.destinationLat = position.coords.latitude;
        this.originLng = this.destinationLng = position.coords.longitude;
      });
    }
  }
  showImageIcon(image) {
    return /(?:\.([^.]+))?$/.exec(image)[1];
  }

  cancel() {
    if (confirm('All the changes you made will be discarded. Are you sure you want to cancel?')) {
      this.router.navigate(['/jobs/list']);
    }
    return false;
  }

  // do something when quarry dropdown changes
  onQuarryChange(event) {
    if (event) {
      this.destinationName = event;
    }
  }

  // calling from onChange bill type
  changeBillType() {
    this.selectedBillTypevalues = '';
    this.billAndPayTypes.forEach((key: any) => {
      if (key.value == this.addJobForm.controls.bill_type.value) {
        this.selectedBillTypevalues = key.name;
        return false;
      }
    });
    this.calculateNetValue();
  }

  // calling from onChange pay type
  changePayType() {
    this.selectedPayTypevalues = '';
    this.billAndPayTypes.forEach((key: any) => {
      if (key.value == this.addJobForm.controls.pay_type.value) {
        this.selectedPayTypevalues = key.name;
        return false;
      }
    });
    this.calculateNetValue();
  }

  // calling from billing includes checkbox
  billingChangeCheck(values) {
    if ((!this.addJobForm.controls[values].value && (this.addJobForm.controls.bill_type.value == 'L' || this.addJobForm.controls.bill_type.value == 'T')) || (this.addJobForm.controls[values].value && this.addJobForm.controls.bill_type.value == 'H')) {
      return true;
    }
    return false;
  }

  // calling from pay includes checkbox
  payChangeCheck(values) {
    if ((!this.addJobForm.controls[values].value && (this.addJobForm.controls.pay_type.value == 'L' || this.addJobForm.controls.pay_type.value == 'T')) || (this.addJobForm.controls[values].value && this.addJobForm.controls.pay_type.value == 'H')) {
      return true;
    }
    return false;
  }

  //for disable bridge toll input for billing
  billingDisableCheck(values) {
    if ((this.addJobForm.controls.bill_type.value == 'L' || this.addJobForm.controls.bill_type.value == 'T') || (this.addJobForm.controls.bill_type.value == 'H' && this.addJobForm.controls[values].value && this.addJobForm.controls.bill_notApplicableCheck.value)) {
      return true;
    }
    return null;
  }

  //for disable bridge toll input for pay
  payDisableCheck(values) {
    if ((this.addJobForm.controls.pay_type.value == 'L' || this.addJobForm.controls.pay_type.value == 'T') || (this.addJobForm.controls.pay_type.value == 'H' && this.addJobForm.controls[values].value && this.addJobForm.controls.pay_notApplicableCheck.value)) {
      return true;
    }
    return null;
  }


  //calculate all data according to dom
  calculateNetValue(callingFrom = null) {

    const self = this;
    // managing truck detail dynamic validation according to conditions
    (<FormArray>self.addJobForm.get('truck_details'))['controls'].forEach(function (ctrl) {
      self.validatePasscode(ctrl.get('bill_bridge_toll_input'));
    });

    //reset all dynamic input and checbox when click on billing includes
    if (callingFrom == 'bill_includes' && !this.addJobForm.controls.bill_includes.value) {
      this.addJobForm.patchValue({ 'bill_bridge_toll_check': false });
      this.addJobForm.patchValue({ 'bill_notApplicableCheck': false });
      this.addJobForm.patchValue({ 'bill_dump_fee_check': false });
      this.addJobForm.patchValue({ 'bill_environmental_fee_check': false });
      this.addJobForm.patchValue({ 'bill_others': '' });
      (<FormArray>self.addJobForm.get('truck_details'))['controls'].forEach(function (ctrl) {
        ctrl.patchValue({ 'bill_dump_fee_input': '' });
        ctrl.patchValue({ 'bill_environmental_fee_input': '' });
        ctrl.patchValue({ 'bill_others_input': '' });
      });
    }

    //reset all dynamic input and checbox when click on pay includes
    if (callingFrom == 'pay_includes' && !this.addJobForm.controls.pay_includes.value) {
      this.addJobForm.patchValue({ 'pay_bridge_toll_check': false });
      this.addJobForm.patchValue({ 'pay_notApplicableCheck': false });
      this.addJobForm.patchValue({ 'pay_dump_fee_check': false });
      this.addJobForm.patchValue({ 'pay_environmental_fee_check': false });
      this.addJobForm.patchValue({ 'pay_others': '' });
      (<FormArray>self.addJobForm.get('truck_details'))['controls'].forEach(function (ctrl) {
        ctrl.patchValue({ 'pay_dump_fee_input': '' });
        ctrl.patchValue({ 'pay_environmental_fee_input': '' });
        ctrl.patchValue({ 'pay_others_input': '' });
      });
    }

    //reset notApplicableBill check when click bridge toll
    if (callingFrom == 'bill_bridge_toll_check' && !this.addJobForm.controls.bill_bridge_toll_check.value) {
      this.addJobForm.patchValue({ 'bill_notApplicableCheck': false });
    }
    //reset notApplicablePay check when click bridge toll
    if (callingFrom == 'pay_bridge_toll_check' && !this.addJobForm.controls.pay_bridge_toll_check.value) {
      this.addJobForm.patchValue({ 'pay_notApplicableCheck': false });
    }

    var rowCount = this.addJobForm.get('truck_details').value.length;

    for (var i = 0; i < rowCount; i++) {

      this.bill_rateValue = this.addJobForm.get('truck_details').value[i].bill_rate;

      if (this.addJobForm.controls.bill_includes.value) {

        if (this.addJobForm.controls.bill_type.value == 'H' && this.addJobForm.controls.bill_bridge_toll_check.value && !this.addJobForm.controls.bill_notApplicableCheck.value) {
          this.bill_bridge_toll_inputValue = this.addJobForm.get('truck_details').value[i].bill_bridge_toll_input;
        } else {
          this.bill_bridge_toll_inputValue = 0;
        }

        if ((this.addJobForm.controls.bill_type.value == 'H' && this.addJobForm.controls.bill_dump_fee_check.value) || ((this.addJobForm.controls.bill_type.value == 'L' || this.addJobForm.controls.bill_type.value == 'T') && !this.addJobForm.controls.bill_dump_fee_check.value)) {
          this.bill_dump_fee_inputValue = this.addJobForm.get('truck_details').value[i].bill_dump_fee_input;
        } else {
          this.bill_dump_fee_inputValue = 0;
        }

        if ((this.addJobForm.controls.bill_type.value == 'H' && this.addJobForm.controls.bill_environmental_fee_check.value) || ((this.addJobForm.controls.bill_type.value == 'L' || this.addJobForm.controls.bill_type.value == 'T') && !this.addJobForm.controls.bill_environmental_fee_check.value)) {
          this.bill_environmental_fee_inputValue = this.addJobForm.get('truck_details').value[i].bill_environmental_fee_input;
        } else {
          this.bill_environmental_fee_inputValue = 0;
        }

        if (typeof this.addJobForm.controls.bill_others.value != 'undefined' && this.addJobForm.controls.bill_others.value != '') {
          this.bill_others_inputValue = this.addJobForm.get('truck_details').value[i].bill_others_input;
        } else {
          this.bill_others_inputValue = 0;
        }


      } else {
        this.bill_bridge_toll_inputValue = 0, this.bill_dump_fee_inputValue = 0, this.bill_environmental_fee_inputValue = 0, this.bill_others_inputValue = 0;
      }



      this.pay_rateValue = this.addJobForm.get('truck_details').value[i].pay_rate;

      if (this.addJobForm.controls.pay_includes.value) {

        if (this.addJobForm.controls.pay_type.value == 'H' && this.addJobForm.controls.pay_bridge_toll_check.value && !this.addJobForm.controls.pay_notApplicableCheck.value) {
          this.pay_bridge_toll_inputValue = this.addJobForm.get('truck_details').value[i].pay_bridge_toll_input;
        } else {
          this.pay_bridge_toll_inputValue = 0;
        }

        if ((this.addJobForm.controls.pay_type.value == 'H' && this.addJobForm.controls.pay_dump_fee_check.value) || ((this.addJobForm.controls.pay_type.value == 'L' || this.addJobForm.controls.pay_type.value == 'T') && !this.addJobForm.controls.pay_dump_fee_check.value)) {
          this.pay_dump_fee_inputValue = this.addJobForm.get('truck_details').value[i].pay_dump_fee_input;
        } else {
          this.pay_dump_fee_inputValue = 0;
        }

        if ((this.addJobForm.controls.pay_type.value == 'H' && this.addJobForm.controls.pay_environmental_fee_check.value) || ((this.addJobForm.controls.pay_type.value == 'L' || this.addJobForm.controls.pay_type.value == 'T') && !this.addJobForm.controls.pay_environmental_fee_check.value)) {
          this.pay_environmental_fee_inputValue = this.addJobForm.get('truck_details').value[i].pay_environmental_fee_input;
        } else {
          this.pay_environmental_fee_inputValue = 0;
        }

        if (typeof this.addJobForm.controls.pay_others.value != 'undefined' && this.addJobForm.controls.pay_others.value != '') {
          this.pay_others_inputValue = this.addJobForm.get('truck_details').value[i].pay_others_input;
        } else {
          this.pay_others_inputValue = 0;
        }
      } else {
        this.pay_bridge_toll_inputValue = 0, this.pay_dump_fee_inputValue = 0, this.pay_environmental_fee_inputValue = 0, this.pay_others_inputValue = 0;
      }
      // console.log(this.bill_rateValue, this.bill_bridge_toll_inputValue, this.bill_dump_fee_inputValue, this.bill_environmental_fee_inputValue, this.bill_others_inputValue);
      // console.log(this.pay_rateValue, this.pay_bridge_toll_inputValue, this.pay_dump_fee_inputValue, this.pay_environmental_fee_inputValue, this.pay_others_inputValue);

      this.billTotalValue = this.bill_rateValue + this.bill_bridge_toll_inputValue + this.bill_dump_fee_inputValue + this.bill_environmental_fee_inputValue + this.bill_others_inputValue;
      this.payTotalValue = this.pay_rateValue + this.pay_bridge_toll_inputValue + this.pay_dump_fee_inputValue + this.pay_environmental_fee_inputValue + this.pay_others_inputValue;
      this.netTotalValue = this.billTotalValue - this.payTotalValue;


      (<FormArray>this.addJobForm.get('truck_details')).at(i).patchValue({ 'net_value': this.netTotalValue });

      if (this.netTotalValue == 0) {
        this.net_color[i] = '#fffab8';
      } else if (this.netTotalValue < 0) {
        this.net_color[i] = '#fb9f9f';
      } else if (this.netTotalValue > 0) {
        this.net_color[i] = '#ccffab';
      }
    }
  }

}
