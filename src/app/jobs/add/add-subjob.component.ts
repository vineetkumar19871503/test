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
  templateUrl: './add-subjob.component.html',
  styleUrls: ['./add-job.component.scss']
})

export class AddSubjobComponent implements OnInit {
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
  private quarriesite: Object[] = [
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
  private url: string = environment.apiUrl + 'sub_jobs/add';
  private subJobLogData: any;
  private subJobLogDataValue: any;
  private pdvalue: Number = 0;
  private rd1value: Number = 0;
  private rd2value: Number = 0;
  private rd3value: Number = 0;
  private purchaseorderValue: Number = 0;
  private parentJobId: string;
  private certifiedPayroll: String;
  // google map variables
  @ViewChild('search')
  private originLat: Number = 26.8070;
  private originLng: Number = 75.8098;
  private originName: String = null;
  private destinationLat: Number = 26.9601;
  private destinationLng: Number = 75.7758;
  private destinationName: String = null;
  private jobId: string;
  private jobDetail;
  private _addType: String = null;
  zoom: Number = 15;

  public fileUploader: FileUploader = new FileUploader({ url: URL }); var
  private fileArray = [];
  private dataObj: any;
  // private updateJobFields: any;

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
    this.titleService.setTitle(environment.siteName + ' - Add Sub Job');
    this.originLat = 26.8070;
    this.originLng = 75.8098;
    this.activeRoute.params.subscribe(params => {
      if (params.job_id !== undefined) {
        this.jobId = params.job_id;
      } else {
        this.toastr.error('Please provide Job ID in parameter.', 'Error!', { 'toastLife': 5000 });
      }
    });
  }

  ngOnInit() {
    const self = this,
      userDetails: any = self.authService.getUserData('user');
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

    this.addJobForm = new FormGroup({
      'customer_name': new FormControl({ value: null, disabled: true }, [Validators.required]),
      'c_id': new FormControl({ value: null, disabled: true }, [Validators.required]),
      'customer_id': new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(4)]),
      'j_id': new FormControl({ value: null, disabled: true }, [Validators.required]),
      'pjob_id': new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(4)]),
      'quote_id': new FormControl({ value: null, disabled: true }, [Validators.required]),
      'customer_job': new FormControl({ value: null, disabled: true }, [Validators.required]),
      'job_name': new FormControl({ value: null }, [Validators.required]),
      'purchase_order': new FormControl(null),
      'bill_type': new FormControl('L', [Validators.required]),
      'pay_type': new FormControl('L', [Validators.required]),
      'origin': new FormControl({ value: '', disabled: true }, [Validators.required]),
      'destination': new FormControl('', [Validators.required]),
      'bill_from': new FormControl('amijot', [Validators.required]),
      'bill_minimum': new FormControl(null),
      'pay_minimum': new FormControl(null),
      'certified_payroll': new FormControl([Validators.required]),
      'prelim_date': new FormControl(null),
      'request_dates1': new FormControl({ value: null }),
      'request_dates2': new FormControl({ value: null }),
      'request_dates3': new FormControl({ value: null }),
      'request_dates': this._fb.array([]),
      'quarries': this._fb.array([
        new FormGroup({
          'quarry': new FormControl('', [Validators.required]),
          'material': new FormControl('', [Validators.required]),
          // 'we_buy': new FormControl(null, [Validators.required]),
          // 'we_sell': new FormControl(null, [Validators.required]),
        })
      ]),
      'truck_details': this._fb.array([]),
      'direction': new FormControl(null, [Validators.required]),
      'internal_notes': new FormControl(null, [Validators.required]),
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
      'subjob_logs': this._fb.array([]),
      // 'net_value': new FormControl(),
    });

    // this._initRequestDateFields();

    // initializing the truck type fields with array
    this._initTruckTypeFields();

    this.getJobDetails();

    // File uploader handlers
    this.fileUploader.onAfterAddingFile = (fileItem) => {
      fileItem.withCredentials = false;
      const url = (window.URL) ? window.URL.createObjectURL(fileItem._file) : (window as any).webkitURL.createObjectURL(fileItem._file);
      document.getElementById('document').classList.remove('ng-invalid');
      this.addJobForm.patchValue({
        document_value: url
      });
    };

    this.fileUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.fileArray.push(response);
    };
    this.fileUploader.onCompleteAll = () => {
      this.dataObj.document = this.fileArray;
      this.addJob();
    };


  }

  // calls the api to add job
  addJob() {
    const self = this;
    this.httpService.post(this.url, this.dataObj)
      .then(function (res: any) {
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
  // calls the api to update job
  updateJob(data) {
    const self = this;
    return new Promise(function (resolve, reject) {
      let updateFormValues = Object.assign({});
      const obj = {};
      data.forEach(function (arrayItem) {
        const field_name = arrayItem.field;
        const field_value = arrayItem.value;
        obj[field_name] = field_value;

      });
      obj['_id'] = self.parentJobId;
      updateFormValues = JSON.stringify(obj);
      const updateUrl = environment.apiUrl + 'jobs/updateFields';
      self.httpService.post(updateUrl, updateFormValues)
        .then(function (res: any) {
          resolve();
        })
        .catch(function (err) {
          self.loading = false;
          self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
          reject();
        });
    });
  }
  // do the needful on form submit
  async saveSubJob(e) {
    const self = this;
    const userDetails: any = self.authService.getUserData('user');
    self.commonServices.validateAllFormFields(this.addJobForm);
    // add invalid to doc
    if (this.addJobForm.controls.document_value.value === '') {
      document.getElementById('document').classList.add('ng-invalid');
    }

    if (this.addJobForm.valid) {
      // combining the address name, lat and lng into source and destination
      const formVal = Object.assign({}, this.addJobForm.getRawValue());
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
        'address': this.destinationName,
        'lat': this.destinationLat,
        'lng': this.destinationLng
      };
      const updateJobFields = [];
      let prelimDatevalue = null;
      let updateFlag = 0;
      if (self.pdvalue === 0) {
        prelimDatevalue = formVal.prelim_date ? formVal.prelim_date : null
        updateJobFields.push({ 'field': 'prelim_date', 'value': prelimDatevalue });
        updateFlag = 1;
      }
      let rd1Datevalue = null;
      if (self.rd1value === 0) {
        rd1Datevalue = formVal.request_dates1 ? formVal.request_dates1 : null
        updateJobFields.push({ 'field': 'request_dates1', 'value': rd1Datevalue });
        updateFlag = 1;
      }
      let rd2Datevalue = null;
      if (self.rd2value === 0) {
        rd2Datevalue = formVal.request_dates2 ? formVal.request_dates2 : null
        updateJobFields.push({ 'field': 'request_dates2', 'value': rd2Datevalue });
        updateFlag = 1;
      }
      let rd3Datevalue = null;
      if (self.rd3value === 0) {
        rd3Datevalue = formVal.request_dates3 ? formVal.request_dates3 : null
        updateJobFields.push({ 'field': 'request_dates3', 'value': rd3Datevalue });
        updateFlag = 1;
      }
      let localPurchaseorderValue = null;
      if (self.purchaseorderValue === 0) {
        localPurchaseorderValue = formVal.purchase_order ? formVal.purchase_order : null
        updateJobFields.push({ 'field': 'purchase_order', 'value': localPurchaseorderValue });
        updateFlag = 1;
      }
      if (formVal.certified_payroll) {
        if (self.certifiedPayroll !== formVal.certified_payroll) {
          updateJobFields.push({ 'field': 'certified_payroll', 'value': formVal.certified_payroll });
          updateFlag = 1;
        }
      }
      if (updateFlag) {
        await this.updateJob(updateJobFields);
      }
      if (self.subJobLogDataValue) {
        let addSubJobLog = Object.assign({});
        addSubJobLog = {
          'uid': userDetails._id,
          'name': userDetails.fname + ' ' + userDetails.lname,
          'internal_notes': formVal.internal_notes
        };
        self.subJobLogDataValue.push(addSubJobLog);
        formVal.subjob_logs = self.subJobLogDataValue;
      }
      // upload files
      this.dataObj = formVal;
      this.loading = true;
      this.fileUploader.uploadAll();
    } else {
      this.toastr.error('There are some invalid fields in the form');
    }
  }

  getJobDetails() {
    const self = this;
    const httpParams = new HttpParams();
    const params = httpParams.set('id', this.jobId);
    const url = environment.apiUrl + 'jobs/getJobById';
    self.loading = true;
    this.httpService.get(url, params)
      .then(function (job: any) {
        self.loading = false;
        if (job.data.length) {
          const _j = self.jobDetail = job.data[0];
          let prelimDate;
          let requestdates1;
          let requestdates2;
          let requestdates3;
          let purchaseOrder;

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
          if (_j.certified_payroll) {
            self.certifiedPayroll = _j.certified_payroll;
          }
          self.parentJobId = _j._id;
          self.subJobLogData = _j.subjob_logs;
          self.subJobLogDataValue = _j.subjob_logs;
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
            'certified_payroll': _j.certified_payroll,
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

          //show selected bill type label
          self.changeBillType();
          //show selected pay type label
          self.changePayType();

          // managing truck detail dynamic validation according to conditions
          // (<FormArray>self.addJobForm.get('truck_details'))['controls'].forEach(function (ctrl) {
          //   self.validatePasscode(ctrl.get('bill_bridge_toll_input'));
          // });
        }
      })
      .catch(function (err) {
        self.loading = false;
        self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
      });
  }

  _initTruckTypeFields() {
    const self = this;
    self.truckTypes.forEach(function (truckType: { name: null, value: null }, i) {
      (<FormArray>self.addJobForm.get('truck_details')).push(
        new FormGroup({
          'truck_type': new FormControl(truckType.value, [Validators.required]),
          'bill_rate': new FormControl(null, [Validators.required]),
          'pay_rate': new FormControl(null, [Validators.required]),
          // 'dump': new FormControl(0, [Validators.required]),
          'bill_bridge_toll_input': new FormControl(self.bridge_toll_values[i]),
          'bill_dump_fee_input': new FormControl(null),
          'bill_environmental_fee_input': new FormControl(null),
          'pay_bridge_toll_input': new FormControl(self.bridge_toll_values[i]),
          'pay_dump_fee_input': new FormControl(null),
          'pay_environmental_fee_input': new FormControl(null),
          'bill_others_input': new FormControl(null),
          'pay_others_input': new FormControl(null),
          'net_value': new FormControl({ value: null, disabled: true }),
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

  _addQuaryMaterialRow(e) {
    if (e) {
      e.preventDefault();
    }
    (<FormArray>this.addJobForm.get('quarries')).push(
      new FormGroup({
        'quarry': new FormControl('', [Validators.required]),
        'material': new FormControl('', [Validators.required]),
        // 'we_buy': new FormControl(null, [Validators.required]),
        // 'we_sell': new FormControl(null, [Validators.required])
      })
    );
  }

  // removes the material row
  removeMaterial(i) {
    this.addJobForm.get('quarries')['controls'].splice(i, 1);
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
        }
        // else if (ele.id === 'destination') {
        //   self.destinationName = addr;
        //   self.destinationLat = lat;
        //   self.destinationLng = lng;
        // }
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
      this.router.navigate(['/jobs/SubjobsListByJobId', this.jobDetail._id]);
    }
    return false;
  }

  // if quarry dropdown changes then do the needful
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
