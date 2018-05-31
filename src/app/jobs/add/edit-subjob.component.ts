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
  selector: 'app-edit-job',
  templateUrl: './edit-subjob.component.html',
  styleUrls: ['./add-job.component.scss']
})

export class EditSubjobComponent implements OnInit {
  // variables definition
  private editJobForm: FormGroup;
  private billAndPayTypes: Object[] = [
    { 'name': 'Hourly', 'value': 'H' },
    { 'name': 'Load', 'value': 'L' },
    { 'name': 'Tonnage', 'value': 'T' },
  ];
  // private selectedBillTypevalues = 'null';
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
  private newFilesUploaded = false;
  private pd: any;
  private pdModel: any;
  private prelimDateModel: any;
  private rd1: any;
  private rd1Model: any;
  private rd2: any;
  private rd2Model: any;
  private rd3: any;
  private rd3Model: any;
  private quarries: Object[] = [
    { 'name': 'Quarry1', 'value': 'quarry1' },
    { 'name': 'Quarry2', 'value': 'quarry2' },
    { 'name': 'Quarry3', 'value': 'quarry3' },
    { 'name': 'Quarry4', 'value': 'quarry4' }
  ];
  private rd: any;
  private _tempTruckTypes = [];
  private truckTypes = this.commonServices.getTruckDetails();
  private quarriesite: Object[] = [
    { 'name': 'Quarry1', 'value': 'quarry1' },
    { 'name': 'Quarry2', 'value': 'quarry2' },
    { 'name': 'Quarry3', 'value': 'quarry3' },
    { 'name': 'Quarry4', 'value': 'quarry4' }
  ];

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
  private selectedBillTypevalues;
  private selectedPayTypevalues;
  private bill_notApplicableCheck: any = false;
  private bridge_toll_values = [15, 20, 25, 25, 25, 25];
  private net_color = [];

  private totalReqDateFields: Number = 3;
  private reqDateModel: Object = Array(this.totalReqDateFields)
  private url: string = environment.apiUrl + 'sub_jobs/edit';
  private documentData: any;
  private subJobLogData: any;
  private pdvalue: Number = 0;
  private rd1value: Number = 0;
  private rd2value: Number = 0;
  private rd3value: Number = 0;
  private purchaseorderValue: Number = 0;
  private parentJobId: string;
  private certifiedPayroll: String;
  // google map variables
  @ViewChild('search')
  private destinationLat: Number = 26.9601;
  private destinationLng: Number = 75.7758;
  private jobId: string;
  private jobDetail;
  private _addType: String = null;
  private originName: String = null;
  private destinationName: String = null;
  private destinationAddress: String = null;
  private originLat: Number = 26.8070;
  private destinationLatvalue: Number = 26.9601;
  private originLng: Number = 75.8098;
  zoom: Number = 15;
  public fileUploader: FileUploader = new FileUploader({ url: URL });
  private fileArray = [];
  private dataObj: any;
  private billTypePreValue: any;
  private payTypePreValue: any;
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
    this.titleService.setTitle(environment.siteName + ' - edit Sub Job');
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

    self.editJobForm = new FormGroup({
      'customer_name': new FormControl({ value: null, disabled: true }, [Validators.required]),
      'c_id': new FormControl({ value: null, disabled: true }, [Validators.required]),
      'customer_id': new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(4)]),
      'j_id': new FormControl({ value: null, disabled: true }, [Validators.required]),
      'job_id': new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(4)]),
      'quote_id': new FormControl({ value: null, disabled: true }, [Validators.required]),
      'customer_job': new FormControl({ value: null, disabled: true }, [Validators.required]),
      'job_name': new FormControl({ value: null }, [Validators.required]),
      'purchase_order': new FormControl({ value: null }),
      'bill_type': new FormControl('', [Validators.required]),
      'pay_type': new FormControl('', [Validators.required]),
      'origin': new FormControl({ value: '', disabled: true }, [Validators.required]),
      'destination': new FormControl('', [Validators.required]),
      'bill_from': new FormControl('', [Validators.required]),
      'bill_minimum': new FormControl(''),
      'pay_minimum': new FormControl(''),
      'certified_payroll': new FormControl('', [Validators.required]),
      'prelim_date': new FormControl(null),
      'request_dates1': new FormControl({ value: null }),
      'request_dates2': new FormControl({ value: null }),
      'request_dates3': new FormControl({ value: null }),
      'request_dates': this._fb.array([]),
      'quarries': this._fb.array([]),
      'truck_details': this._fb.array([]),
      'direction': new FormControl('', [Validators.required]),
      'internal_notes': new FormControl('', [Validators.required]),
      '_id': new FormControl('', [Validators.required]),
      'document': new FormControl(),
      'subjob_logs': new FormGroup({
        'uid': new FormControl(userDetails._id, [Validators.required]),
        'name': new FormControl(userDetails.fname + ' ' + userDetails.lname, [Validators.required]),
        'internal_notes': new FormControl('', [Validators.required])
      }),
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

    // initializing the truck type fields with array
    self._initTruckTypeFields();

    // getting job details and patching values in form
    self.getJobDetails();


    // File uploader handlers
    self.fileUploader.onAfterAddingFile = (fileItem) => {
      self.newFilesUploaded = true;
      fileItem.withCredentials = false;
    };

    self.fileUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      self.fileArray.push(response);
    };
    self.fileUploader.onCompleteAll = () => {
      self.saveSubjob();
    };
  }
  // calls the api to update job
  updateJob(data, cb) {
    const self = this;
    let updateFormValues = Object.assign({});
    const obj = {};
    data.forEach(function (arrayItem) {
      const field_name = arrayItem.field;
      const field_value = arrayItem.value;
      // obj.push({ field_name: field_value });
      obj[field_name] = field_value;

    });
    obj['_id'] = this.parentJobId;
    updateFormValues = JSON.stringify(obj);
    //   updateFormValues._id = this.parentJobId;
    const updateUrl = environment.apiUrl + 'jobs/updateFields';
    this.httpService.post(updateUrl, updateFormValues)
      .then(function (res: any) {
        self.loading = false;
        cb();
      })
      .catch(function (err) {
        self.loading = false;
        self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
      });
  }
  // calls the api to edit job
  saveSubjob() {
    const self = this;
    self.dataObj.document = self.fileArray;
    self.httpService.post(self.url, self.dataObj)
      .then(function (res: any) {
        self.loading = false;
        self.toastr.success(res.message, 'Success!', { 'toastLife': 5000 });
        self.editJobForm.reset();
        self.router.navigate(['jobs/SubjobsListByJobId', self.jobDetail.j_id]);
      })
      .catch(function (err) {
        self.loading = false;
        self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
      });

  }

  // do the needful on form submit
  onFormSubmit() {
    const self = this;
    self.commonServices.validateAllFormFields(self.editJobForm);
    if (this.editJobForm.valid) {
      // combining the address name, lat and lng into source and destination
      const formVal = Object.assign({}, this.editJobForm.getRawValue());
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
      } else {
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
          // alert(prelimDatevalue);
          this.updateJob(updateJobFields, function () {
          });

        }
        self.saveSubjob();
      }
    } else {
      self.toastr.error('There are some invalid fields in the form');
    }
    return false;
  }

  getJobDetails() {
    const self = this;
    const httpParams = new HttpParams();
    const params = httpParams.set('id', self.jobId);
    const url = environment.apiUrl + 'sub_jobs/getSubJobById';
    const materialDetailsArr = (<FormArray>self.editJobForm.get('quarries'));
    self.loading = true;
    self.httpService.get(url, params)
      .then(function (job: any) {
        self.loading = false;
        if (job.data.length) {
          const _j: any = self.jobDetail = job.data[0];
          let prelimDate;
          let requestdates1;
          let requestdates2;
          let requestdates3;
          let purchaseOrder;
          if (_j.job.prelim_date) {
            prelimDate = self.commonServices.extractDate(_j.job.prelim_date);
            self.editJobForm.get('prelim_date').disable();
            self.pdvalue = 1;
          }
          if (_j.job.request_dates1) {
            requestdates1 = self.commonServices.extractDate(_j.job.request_dates1);
            self.editJobForm.get('request_dates1').disable();
            self.rd1value = 1;
          }
          if (_j.job.request_dates2) {
            requestdates2 = self.commonServices.extractDate(_j.job.request_dates2);
            self.editJobForm.get('request_dates2').disable();
            self.rd2value = 1;
          }
          if (_j.job.request_dates3) {
            requestdates3 = self.commonServices.extractDate(_j.job.request_dates3);
            self.editJobForm.get('request_dates3').disable();
            self.rd3value = 1;
          }
          if (_j.job.purchase_order) {
            purchaseOrder = _j.job.purchase_order;
            self.editJobForm.get('purchase_order').disable();
            self.purchaseorderValue = 1;
          }
          if (_j.job.certified_payroll) {
            self.certifiedPayroll = _j.job.certified_payroll;
          }
          self.parentJobId = _j.j_id;
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
            'pay_minimum': _j.pay_minimum,
            'certified_payroll': _j.certified_payroll,
            'origin': _j.origin.address,
            'destination': _j.destination.address,
            'direction': _j.direction,
            'internal_notes': _j.internal_notes,
            'bill_includes': _j.bill_includes,
            'pay_includes': _j.pay_includes,
            // 'bill_bridge_toll_check': _j.bill_bridge_toll_check,
            // 'bill_dump_fee_check': _j.bill_dump_fee_check,
            // 'bill_environmental_fee_check': _j.bill_environmental_fee_check,
            // 'bill_others': _j.bill_others,
            // 'bill_notApplicableCheck': _j.bill_notApplicableCheck,
            // 'pay_notApplicableCheck': _j.pay_notApplicableCheck,
            // 'pay_bridge_toll_check': _j.pay_bridge_toll_check,
            // 'pay_dump_fee_check': _j.pay_dump_fee_check,
            // 'pay_environmental_fee_check': _j.pay_environmental_fee_check,
            // 'pay_others': _j.pay_others,
            '_id': _j._id,
          });

          setTimeout(function () {
            self.editJobForm.patchValue({
              'bill_bridge_toll_check': _j.bill_bridge_toll_check,
              'bill_dump_fee_check': _j.bill_dump_fee_check,
              'bill_environmental_fee_check': _j.bill_environmental_fee_check,
              'bill_others': _j.bill_others,
              'pay_bridge_toll_check': _j.pay_bridge_toll_check,
              'pay_dump_fee_check': _j.pay_dump_fee_check,
              'pay_environmental_fee_check': _j.pay_environmental_fee_check,
              'pay_others': _j.pay_others,
            });
          }, 100);

          setTimeout(function () {
            self.editJobForm.patchValue({
              'bill_notApplicableCheck': _j.bill_notApplicableCheck,
              'pay_notApplicableCheck': _j.pay_notApplicableCheck,
            });
            self.calculateNetValue();
          }, 200);


          self._initTruckDetailsArr(_j.truck_details);
          self._initMaterialDetailsArr(_j.quarries);
          // self._initRequestDateFields(_j.request_dates);
          self.originLat = _j.origin.lat;
          self.originLng = _j.origin.lng;
          self.destinationLat = _j.destination.lat;
          self.destinationLng = _j.destination.lng;
          self._initDocumentsArr(_j.document);
          //show selected bill and pay type label
          self.showBillPayTypeText();
        } else {
          // self._initRequestDateFields([]);
        }
      })
      .catch(function (err) {
        self.loading = false;
        self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
      });
  }

  // removes the material row
  removeMaterial(i) {
    this.editJobForm.get('quarries')['controls'].splice(i, 1);
  }

  _initMaterialDetailsArr(data?) {
    const self = this;
    const materialDetailsArr = (<FormArray>self.editJobForm.get('quarries'));
    if (data && data.length) {
      data.forEach((lineItem, index) => {
        materialDetailsArr.push(
          new FormGroup({
            'quarry': new FormControl(lineItem.quarry, [Validators.required]),
            'material': new FormControl(lineItem.material, [Validators.required]),
            // 'we_buy': new FormControl(lineItem.we_buy, [Validators.required]),
            // 'we_sell': new FormControl(lineItem.we_sell, [Validators.required])
          }));
      });
    } else {
    }
  }
  _initTruckDetailsArr(data?) {
    const self = this;
    const custDetailsArr = (<FormArray>self.editJobForm.get('truck_details'));
    if (data && data.length) {
      for (let custDetails = 0; custDetails < custDetailsArr.controls.length; custDetails++) {
        if (data[custDetails].net_value == 0) {
          this.net_color[custDetails] = '#fffab8';
        } else if (data[custDetails].net_value < 0) {
          this.net_color[custDetails] = '#fb9f9f';
        } else if (data[custDetails].net_value > 0) {
          this.net_color[custDetails] = '#ccffab';
        }
        custDetailsArr.controls[custDetails].patchValue({
          bill_rate: data[custDetails].bill_rate,
          pay_rate: data[custDetails].pay_rate,
          dump: data[custDetails].dump,
          bill_bridge_toll_input: data[custDetails].bill_bridge_toll_input,
          bill_dump_fee_input: data[custDetails].bill_dump_fee_input,
          bill_environmental_fee_input: data[custDetails].bill_environmental_fee_input,
          pay_bridge_toll_input: data[custDetails].pay_bridge_toll_input,
          pay_dump_fee_input: data[custDetails].pay_dump_fee_input,
          pay_environmental_fee_input: data[custDetails].pay_environmental_fee_input,
          bill_others_input: data[custDetails].bill_others_input,
          pay_others_input: data[custDetails].pay_others_input,
          net_value: data[custDetails].net_value,

        });
      }
    }
  }
  // initializes request fields in n number
  _initRequestDateFields(dt) {
    for (let i = 0; i < this.totalReqDateFields; i++) {
      let convertedD = null;
      if (dt.length) {
        convertedD = this.commonServices.extractDate(dt[i]);
      }
      (<FormArray>this.editJobForm.get('request_dates')).push(new FormControl(convertedD, []));
    }
  }

  _initTruckTypeFields() {
    const self = this;
    self.truckTypes.forEach(function (truckType: { name: null, value: null }, i) {
      (<FormArray>self.editJobForm.get('truck_details')).push(
        new FormGroup({
          'truck_type': new FormControl(truckType.value, [Validators.required]),
          'bill_rate': new FormControl(null, [Validators.required]),
          'pay_rate': new FormControl(null, [Validators.required]),
          // 'dump': new FormControl(null, [Validators.required]),
          'bill_bridge_toll_input': new FormControl(null),
          'bill_dump_fee_input': new FormControl(null),
          'bill_environmental_fee_input': new FormControl(null),
          'pay_bridge_toll_input': new FormControl(null),
          'pay_dump_fee_input': new FormControl(null),
          'pay_environmental_fee_input': new FormControl(null),
          'bill_others_input': new FormControl(null),
          'pay_others_input': new FormControl(null),
          'net_value': new FormControl({ value: null, disabled: true }),
        })
      );
    });
  }

  // assign dynamic validation in truck type fields
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

  // initalizes doucment type
  _initDocumentsArr(data?) {
    const self = this;
    const documentDetailsarr = [];
    self.documentData = data.map(function (a) {
      a = JSON.parse(a);
      const nameArr = a.file_path.split('/');
      a.name = nameArr[nameArr.length - 1];
      return a
    });

    for (let i = 0; i < self.documentData.length; i++) {
      self.fileArray.push(JSON.stringify(self.documentData[i]));
    }
  }
  // request fields will be dynamic so this function adds a dummy request field in form
  _addDummyReqDateField(e) {
    if (e) {
      e.preventDefault();
    }
    (<FormArray>this.editJobForm.get('request_dates')).push(new FormControl(null, [Validators.required]));
  }
  // request fields will be dynamic so this function adds a dummy request field in form
  _addQuaryMaterialRow(e) {
    if (e) {
      e.preventDefault();
    }
    (<FormArray>this.editJobForm.get('quarries')).push(
      new FormGroup({
        'quarry': new FormControl('', [Validators.required]),
        'material': new FormControl('', [Validators.required]),
        // 'we_buy': new FormControl(null, [Validators.required]),
        // 'we_sell': new FormControl(null, [Validators.required])
      })
    );
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
      this.router.navigate(['/jobs/SubjobsListByJobId', this.jobDetail.j_id]);
    }
    return false;
  }

  onChange(event) {
    if (event) {
      this.destinationAddress = event;
    }
  }

  //show bill and pay type text in label
  showBillPayTypeText() {
    this.selectedBillTypevalues = '';
    this.billAndPayTypes.forEach((key: any) => {
      if (key.value == this.editJobForm.controls.bill_type.value) {
        this.selectedBillTypevalues = key.name;
        this.billTypePreValue = key.value;
        return false;
      }
    });

    this.selectedPayTypevalues = '';
    this.billAndPayTypes.forEach((key: any) => {
      if (key.value == this.editJobForm.controls.pay_type.value) {
        this.selectedPayTypevalues = key.name;
        this.payTypePreValue = key.value;
        return false;
      }
    });
  }

  // calling from onChange bill type
  changeBillType() {
    if (confirm('Are you sure you want to change the bill type? This will reset all the existing calculations')) {
      this.showBillPayTypeText();
      this.calculateNetValue();
    } else {
      this.editJobForm.patchValue({ bill_type: this.billTypePreValue });
    }

  }

  // calling from onChange pay type
  changePayType() {
    if (confirm('Are you sure you want to change the pay type? This will reset all the existing calculations')) {
      this.showBillPayTypeText();
      this.calculateNetValue();
    } else {
      this.editJobForm.patchValue({ pay_type: this.payTypePreValue });
    }
  }

  // calling from billing includes checkbox
  billingChangeCheck(values) {
    if ((!this.editJobForm.controls[values].value && (this.editJobForm.controls.bill_type.value == 'L' || this.editJobForm.controls.bill_type.value == 'T')) || (this.editJobForm.controls[values].value && this.editJobForm.controls.bill_type.value == 'H')) {
      return true;
    }
    return false;
  }

  // calling from pay includes checkbox
  payChangeCheck(values) {
    if ((!this.editJobForm.controls[values].value && (this.editJobForm.controls.pay_type.value == 'L' || this.editJobForm.controls.pay_type.value == 'T')) || (this.editJobForm.controls[values].value && this.editJobForm.controls.pay_type.value == 'H')) {
      return true;
    }
    return false;
  }

  //for disable bridge toll input for billing
  billingDisableCheck(values) {
    if ((this.editJobForm.controls.bill_type.value == 'L' || this.editJobForm.controls.bill_type.value == 'T') || (this.editJobForm.controls.bill_type.value == 'H' && this.editJobForm.controls[values].value && this.editJobForm.controls.bill_notApplicableCheck.value)) {
      return true;
    }
    return null;
  }

  //for disable bridge toll input for pay
  payDisableCheck(values) {
    if ((this.editJobForm.controls.pay_type.value == 'L' || this.editJobForm.controls.pay_type.value == 'T') || (this.editJobForm.controls.pay_type.value == 'H' && this.editJobForm.controls[values].value && this.editJobForm.controls.pay_notApplicableCheck.value)) {
      return true;
    }
    return null;
  }

  //calculate all data according to dom
  calculateNetValue() {

    const self = this;
    // managing truck detail dynamic validation according to conditions
    (<FormArray>self.editJobForm.get('truck_details'))['controls'].forEach(function (ctrl) {
      self.validatePasscode(ctrl.get('bill_bridge_toll_input'));
    });

    var rowCount = this.editJobForm.get('truck_details').value.length;

    for (var i = 0; i < rowCount; i++) {

      this.bill_rateValue = parseFloat(this.editJobForm.get('truck_details').value[i].bill_rate);

      if (this.editJobForm.controls.bill_includes.value) {

        if (this.editJobForm.controls.bill_type.value == 'H' && this.editJobForm.controls.bill_bridge_toll_check.value && !this.editJobForm.controls.bill_notApplicableCheck.value) {
          this.bill_bridge_toll_inputValue = this.editJobForm.get('truck_details').value[i].bill_bridge_toll_input;
        } else {
          this.bill_bridge_toll_inputValue = 0;
        }

        if ((this.editJobForm.controls.bill_type.value == 'H' && this.editJobForm.controls.bill_dump_fee_check.value) || ((this.editJobForm.controls.bill_type.value == 'L' || this.editJobForm.controls.bill_type.value == 'T') && !this.editJobForm.controls.bill_dump_fee_check.value)) {
          this.bill_dump_fee_inputValue = this.editJobForm.get('truck_details').value[i].bill_dump_fee_input;
        } else {
          this.bill_dump_fee_inputValue = 0;
        }

        if ((this.editJobForm.controls.bill_type.value == 'H' && this.editJobForm.controls.bill_environmental_fee_check.value) || ((this.editJobForm.controls.bill_type.value == 'L' || this.editJobForm.controls.bill_type.value == 'T') && !this.editJobForm.controls.bill_environmental_fee_check.value)) {
          this.bill_environmental_fee_inputValue = this.editJobForm.get('truck_details').value[i].bill_environmental_fee_input;
        } else {
          this.bill_environmental_fee_inputValue = 0;
        }

        if (typeof this.editJobForm.controls.bill_others.value != 'undefined' && this.editJobForm.controls.bill_others.value != '') {
          this.bill_others_inputValue = this.editJobForm.get('truck_details').value[i].bill_others_input;
        } else {
          this.bill_others_inputValue = 0;
        }


      } else {
        this.bill_bridge_toll_inputValue = 0, this.bill_dump_fee_inputValue = 0, this.bill_environmental_fee_inputValue = 0, this.bill_others_inputValue = 0;
      }



      this.pay_rateValue = parseFloat(this.editJobForm.get('truck_details').value[i].pay_rate);

      if (this.editJobForm.controls.pay_includes.value) {

        if (this.editJobForm.controls.pay_type.value == 'H' && this.editJobForm.controls.pay_bridge_toll_check.value && !this.editJobForm.controls.pay_notApplicableCheck.value) {
          this.pay_bridge_toll_inputValue = this.editJobForm.get('truck_details').value[i].pay_bridge_toll_input;
        } else {
          this.pay_bridge_toll_inputValue = 0;
        }

        if ((this.editJobForm.controls.pay_type.value == 'H' && this.editJobForm.controls.pay_dump_fee_check.value) || ((this.editJobForm.controls.pay_type.value == 'L' || this.editJobForm.controls.pay_type.value == 'T') && !this.editJobForm.controls.pay_dump_fee_check.value)) {
          this.pay_dump_fee_inputValue = this.editJobForm.get('truck_details').value[i].pay_dump_fee_input;
        } else {
          this.pay_dump_fee_inputValue = 0;
        }

        if ((this.editJobForm.controls.pay_type.value == 'H' && this.editJobForm.controls.pay_environmental_fee_check.value) || ((this.editJobForm.controls.pay_type.value == 'L' || this.editJobForm.controls.pay_type.value == 'T') && !this.editJobForm.controls.pay_environmental_fee_check.value)) {
          this.pay_environmental_fee_inputValue = this.editJobForm.get('truck_details').value[i].pay_environmental_fee_input;
        } else {
          this.pay_environmental_fee_inputValue = 0;
        }

        if (typeof this.editJobForm.controls.pay_others.value != 'undefined' && this.editJobForm.controls.pay_others.value != '') {
          this.pay_others_inputValue = this.editJobForm.get('truck_details').value[i].pay_others_input;
        } else {
          this.pay_others_inputValue = 0;
        }
      } else {
        this.pay_bridge_toll_inputValue = 0, this.pay_dump_fee_inputValue = 0, this.pay_environmental_fee_inputValue = 0, this.pay_others_inputValue = 0;
      }
      // console.log(typeof this.bill_rateValue, typeof this.bill_bridge_toll_inputValue, typeof this.bill_dump_fee_inputValue, typeof this.bill_environmental_fee_inputValue, typeof this.bill_others_inputValue);
      // console.log(typeof this.pay_rateValue, typeof this.pay_bridge_toll_inputValue, typeof this.pay_dump_fee_inputValue, typeof this.pay_environmental_fee_inputValue, typeof this.pay_others_inputValue);

      this.billTotalValue = this.bill_rateValue + this.bill_bridge_toll_inputValue + this.bill_dump_fee_inputValue + this.bill_environmental_fee_inputValue + this.bill_others_inputValue;
      this.payTotalValue = this.pay_rateValue + this.pay_bridge_toll_inputValue + this.pay_dump_fee_inputValue + this.pay_environmental_fee_inputValue + this.pay_others_inputValue;
      this.netTotalValue = this.billTotalValue - this.payTotalValue;


      (<FormArray>this.editJobForm.get('truck_details')).at(i).patchValue({ 'net_value': this.netTotalValue });

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
