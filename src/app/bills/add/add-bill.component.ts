
import { } from 'googlemaps';
import { ActivatedRoute, Router } from '@angular/router';
import CommonServices from '../../shared/services/CommonServices';
import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormControl, FormBuilder, FormArray, FormGroup, Validators, NgForm, AbstractControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import HttpServices from '../../shared/services/HttpServices';
import { MapsAPILoader } from '@agm/core';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { AuthService } from './../../shared/auth/auth.service';
const URL = environment.apiUrl + 'upload';
import { DatePipe } from '@angular/common';
import { setTimeout } from 'core-js/library/web/timers';


@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
})
export class AddBillComponent implements OnInit {
  // @ViewChild('jobDetailView') jobDetailView: TemplateRef<any>;
  // variables definition
  private apiMsg: String = 'Loading...';
  private error: String = '';
  private jobDetail: Object;
  private loading: boolean = false;
  private pageTitle = 'Add Bill';
  private temp = [];
  private url = environment.apiUrl;
  private tagId: String = '';
  private subjobdata = [];
  private dataObj: any;
  private material_details: Object;
  private addBillForm: FormGroup;
  private truckTypes = this.commonServices.getTruckDetails();
  private _tempTruckTypes = [];
  private billAndPayTypes: Object[] = [
    { 'name': 'Hourly', 'value': 'H' },
    { 'name': 'Load', 'value': 'L' },
    { 'name': 'Tonnage', 'value': 'T' },
  ];
  private billtypesarr: Object;
  private billArr: any = [];
  private payArr: any = [];
  private billQuantityValue: any = 1;
  private bill_rateValue: any = 1;
  private billRateValue: any = 1;
  private grossValue: any = 0;
  private gross = [];
  // constructor
  constructor(
    private activeRoute: ActivatedRoute,
    private httpService: HttpServices,
    private router: Router,
    private titleService: Title,
    public toastr: ToastsManager,
    private commonServices: CommonServices,
    private authService: AuthService,
    private _fb: FormBuilder,
  ) {
    // setting page title
    this.titleService.setTitle(this.pageTitle);
  }
  ngOnInit() {
    const self = this;
    this.activeRoute.params.subscribe(params => {
      if (params.id !== undefined) {
        const idArr = params.id.split('__');
        this.tagId = idArr[0];
      }
    });
    this._getSubJobDataBySubJobId();

    // form fields declaration
    this.addBillForm = this._fb.group({
      'customer_name': new FormControl({ value: null, disabled: true }, [Validators.required]),
      'created_date': new FormControl({ value: '', disabled: true }),
      'customer_id': new FormControl({ value: '', disabled: true }),
      'driver_id': new FormControl({ value: '', disabled: true }),
      'driver_name': new FormControl({ value: '', disabled: true }),
      'truck_type': new FormControl({ value: '', disabled: true }),
      'bill_from': new FormControl({ value: '', disabled: true }),
      'bill_type': new FormControl({ value: '', disabled: true }),
      'pay_type': new FormControl({ value: '', disabled: true }),
      'bill_minimum': new FormControl({ value: '', disabled: true }),
      'pay_minimum': new FormControl({ value: '', disabled: true }),
      'job_id': new FormControl({ value: '', disabled: true }),
      'job_name': new FormControl({ value: '', disabled: true }),
      'bill_total': new FormControl(''),
      'pay_total': new FormControl(''),
      'net': new FormControl(''),
      // 'truck_types': new FormControl(''),
      // 'tag_id': new FormControl(''),
      // 'document': new FormControl(),
      // 'document_value': new FormControl(null),
      // 'material_details': this._fb.array([
      //   new FormGroup({
      //     'scale_tag_no': new FormControl(''),
      //     'yards': new FormControl(''),
      //     'weight': new FormControl(''),
      //   })
      // ]),
      'bill_details': self._fb.array([]),
      'pay_details': self._fb.array([]),
    });
    // initializing the bill type fields with array

  }

  // calls the api to add Tag
  addBill(data) {
    const self = this;
    self.loading = true;
    this.httpService.post(this.url + 'bills/add', data)
      .then(function (res: any) {
        self.loading = false;
        self.toastr.success(res.message, 'Success!', { 'toastLife': 5000 });
        self.addBillForm.reset();
        // self.router.navigate(['/bills/tagsListByJobId', self.jobObjId]);
      })
      .catch(function (err) {
        self.loading = false;
        self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
      });
  }
  // do the needful on form submit
  onBillFormSubmit(e) {
    const self = this;
    const userDetails: any = self.authService.getUserData('user');
    self.commonServices.validateAllFormFields(this.addBillForm);
    if (this.addBillForm.valid) {
      // combining the address name, lat and lng into source and destination
      const formVal = Object.assign({}, this.addBillForm.getRawValue());
      this.dataObj = formVal;
      self.addBill(self.dataObj);
    } else {
      this.toastr.error('There are some invalid fields in the form');
    }
  }

  private _getSubJobDataBySubJobId(subjobid?) {
    const self = this;
    self.loading = true;
    const id = self.tagId;
    // console.log(self.tagId);
    this.httpService.get(this.url + 'assigned_jobs' + '/getAllDataByTagId', { id })
      .then(function (res: any) {
        self.loading = false;
        self.subjobdata = res.data[0];
        const _j: any = self.subjobdata = res.data[0];
        console.log(self.subjobdata);
        self.addBillForm.patchValue({
          'j_id': _j.job.j_id,
          'job_id': _j.job.pjob_id,
          'c_id': _j.customer._id,
          'customer_id': _j.customer.customer_id,
          'created_date': _j.job.created_date,
          'job_name': _j.job.job_name,
          'customer_name': _j.customer.cust_name,
          'customer_job': _j['customer'].cust_role,
          'driver_name': _j.driver_detail[0].first_name,
          'driver_id': _j.driver_detail[0].emp_id,
          'truck_type': _j.driver_detail[0].truck_type,
          'bill_from': _j.job.bill_from,
          'bill_minimum': _j.job.bill_minimum,
          'bill_type': _j.job.bill_type,
          'pay_minimum': _j.job.pay_minimum,
          'pay_type': _j.job.pay_type,
          'bill_includes': _j.job.bill_includes,
          'pay_includes': _j.job.pay_includes,
          'bill_bridge_toll_check': _j.job.bill_bridge_toll_check,
          'bill_dump_fee_check': _j.job.bill_dump_fee_check,
          'bill_environmental_fee_check': _j.job.bill_environmental_fee_check,
          'pay_bridge_toll_check': _j.job.pay_bridge_toll_check,
          'pay_dump_fee_check': _j.job.pay_dump_fee_check,
          'pay_environmental_fee_check': _j.job.pay_environmental_fee_check,
          'bill_others_input': _j.job.bill_others_input,
          'pay_others': _j.job.pay_others,
        });
        let name: String = '';
        if (_j.job.bill_type) {
          if (_j.job.bill_type === 'H') {
            name = 'Hourly';
          } else if (_j.job.bill_type === 'H') {
            name = 'Load';
          } else {
            name = 'Tonnage';
          }
          self.billArr.push(
            { 'name': name, 'value': name },
          )
        }
        if (_j.job.bill_bridge_toll_check) {

          self.billArr.push(
            { 'name': 'Bridge toll', 'value': 'bridge' },
          )
        }
        if (_j.job.bill_dump_fee_check) {
          self.billArr.push(
            { 'name': 'Bill Dump Fee', 'value': 'bill_dump_fee' },

          )
        }
        if (_j.job.bill_environmental_fee_check) {
          self.billArr.push(
            { 'name': 'Bill Environmental', 'value': 'bill_environmental' },
          )
        }
        if (_j.job.bill_others_input) {
          self.billArr.push(
            { 'name': _j.job.bill_others_input, 'value': 'bill_others' },
          )
        }
        // console.log(self.billArr);
        let payname: String = '';
        if (_j.job.pay_type) {
          if (_j.job.pay_type === 'H') {
            payname = 'Hourly';
          } else if (_j.job.pay_type === 'H') {
            payname = 'Load';
          } else {
            payname = 'Tonnage';
          }
          self.payArr.push(
            { 'name': payname, 'value': payname },
          )
        }
        if (_j.job.pay_bridge_toll_check) {

          self.payArr.push(
            { 'name': 'Bridge toll', 'value': 'bridge' },
          )
        }
        if (_j.job.pay_dump_fee_check) {
          self.payArr.push(
            { 'name': 'Bill Dump Fee', 'value': 'bill_dump_fee' },

          )
        }
        if (_j.job.pay_environmental_fee_check) {
          self.payArr.push(
            { 'name': 'Bill Environmental', 'value': 'bill_environmental' },
          )
        }
        if (_j.job.pay_others) {
          self.payArr.push(
            { 'name': _j.job.pay_others, 'value': 'bill_others' },
          )
        }
        self._initBillTypeFields();
        self._initPayTypeFields();
      })
      .catch(function (err) {
        self.loading = false;
        self.apiMsg = '';
        self.error = 'Error occurred!';
      });
  }
  private _initBillTypeFields() {
    const self = this;
    self.billArr.forEach(function (truckType: { name: null, value: null }, i) {
      (<FormArray>self.addBillForm.get('bill_details')).push(
        new FormGroup({
          'bill_type': new FormControl(truckType.name, [Validators.required]),
          'quantity': new FormControl(null, [Validators.required]),
          'rate': new FormControl(null, [Validators.required]),
          'tax': new FormControl(null, [Validators.required]),
          'gross': new FormControl(null, [Validators.required])

        })
      );
    });
  }
  _addBillTypeRow() {
    const self = this;
    (<FormArray>this.addBillForm.get('bill_details')).push(
      new FormGroup({
        'bill_type': new FormControl(null, [Validators.required]),
        'quantity': new FormControl(null, [Validators.required]),
        'rate': new FormControl(null, [Validators.required]),
        'tax': new FormControl(null, [Validators.required]),
        'gross': new FormControl(null, [Validators.required])
      })
    );
    return false;
  }
  private _initPayTypeFields() {
    const self = this;
    self.payArr.forEach(function (truckType: { name: null, value: null }, i) {
      (<FormArray>self.addBillForm.get('pay_details')).push(
        new FormGroup({
          'pay_type': new FormControl(truckType.name, [Validators.required]),
          'quantity': new FormControl(null, [Validators.required]),
          'rate': new FormControl(null, [Validators.required]),
          'tax': new FormControl(null, [Validators.required]),
          'gross': new FormControl(null, [Validators.required])

        })
      );
    });
  }
  _addPayTypeRow() {
    const self = this;
    (<FormArray>this.addBillForm.get('pay_details')).push(
      new FormGroup({
        'pay_type': new FormControl(null, [Validators.required]),
        'quantity': new FormControl(null, [Validators.required]),
        'rate': new FormControl(null, [Validators.required]),
        'tax': new FormControl(null, [Validators.required]),
        'gross': new FormControl(null, [Validators.required])
      })
    );
    return false;
  }
  cancel() {
    if (confirm('Are you sure you want to discard the changes')) {
      //  this.router.navigate(['/bills/tagsListByJobId', this.jobObjId]);
    }
    return false;
  }
  calculateGrossValue(callingFrom = null) {
    console.log('heres');
    const self = this;
    let rowCount = this.addBillForm.get('bill_details').value.length;
    for (let i = 0; i < rowCount; i++) {
      this.billQuantityValue = this.addBillForm.get('bill_details').value[i].quantity;
      this.billRateValue = this.addBillForm.get('bill_details').value[i].rate;
      this.grossValue = this.billQuantityValue * this.billRateValue;
      (<FormArray>this.addBillForm.get('bill_details')).at(i).patchValue({ 'gross': this.grossValue });

      if (this.grossValue == 0) {
        this.gross[i] = '#fffab8';
      } else if (this.grossValue < 0) {
        this.gross[i] = '#fb9f9f';
      } else if (this.grossValue > 0) {
        this.gross[i] = '#ccffab';
      }
    }
  }
}
