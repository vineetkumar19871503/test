import { } from 'googlemaps';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../shared/auth/auth.service';
import CommonServices from '../../shared/services/CommonServices';
import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormControl, FormBuilder, FormArray, FormGroup, Validators, NgForm } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import HttpServices from '../../shared/services/HttpServices';
import { MapsAPILoader } from '@agm/core';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})

export class EditCustomerComponent implements OnInit {
  // variables definition
  private addcustomerForm: FormGroup;

  private loading: boolean = false;

  private custLogData: any;

  private url: string = environment.apiUrl + 'customers/edit';

  // google map variables
  @ViewChild('search')
  private _id: string;
  private _addType: String = null;
  private logdata: String = null;

  // constructor
  constructor(
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private commonServices: CommonServices,
    private _fb: FormBuilder,
    private httpService: HttpServices,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private titleService: Title,
    private toastr: ToastsManager,
    private router: Router
  ) {
    this.titleService.setTitle(environment.siteName + ' - Add customer');
  }

  ngOnInit() {
    const self = this,
      userDetails: any = self.authService.getUserData('user');
    this.addcustomerForm = new FormGroup({
      'org_name': new FormControl('', [Validators.required, , self.commonServices.noWhitespaceValidator]),
      'c_id': new FormControl('', [Validators.required, , self.commonServices.noWhitespaceValidator]),
      'customer_id': new FormControl({ value: null, disabled: true }, [Validators.required, , self.commonServices.noWhitespaceValidator, Validators.maxLength(4)]),
      'contact_details': this._fb.array([]),
      'cust_logs': new FormGroup({
        'uid': new FormControl(userDetails._id, [Validators.required, self.commonServices.noWhitespaceValidator]),
        'name': new FormControl(userDetails.fname + ' ' + userDetails.lname, [Validators.required, self.commonServices.noWhitespaceValidator]),
        'notes': new FormControl('', [Validators.required, self.commonServices.noWhitespaceValidator])
      }),
      'org_address': new FormControl('', [Validators.required, self.commonServices.noWhitespaceValidator])
    });
    this.activeRoute.params.subscribe(params => {
      if (params.id !== undefined) {
        this._addType = 'customer';
        const idArr = params.id.split('__');
        this._id = idArr[0];
      } else {
        self.toastr.error('Please provide customer id!', 'Error!', { 'toastLife': 5000 });
        this.router.navigate(['/quotes/list']);
      }
    });
    this.getCustomerDetails();
  }

  // calls the api to add customer
  addcustomer(data) {
    const self = this;
    if (self.addcustomerForm.valid) {
      self.loading = true;
      this.httpService.post(this.url, data)
        .then(function (res: any) {
          self.loading = false;
          self.toastr.success(res.message, 'Success!', { 'toastLife': 5000 });
          self.router.navigate(['/quotes/list']);
        })
        .catch(function (err) {
          self.loading = false;
          self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
        });
    } else {
      self.toastr.error('There are some invalid fields in the form', 'Error!', { 'toastLife': 5000 });
    }

  }
  addCusomersLogs(data) {
    const self = this;
    self.loading = true;
    this.httpService.post(environment.apiUrl + 'addCustomer_logs', data)
      .then(function (res: any) {
        self.loading = false;
        self.toastr.success(res.message, 'Success!', { 'toastLife': 5000 });
        self.addcustomerForm.reset();
      })
      .catch(function (err) {
        self.loading = false;
        self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
      });
  }
  // do the needful on form submit
  oncustomerFormSubmit(e) {
    const self = this;
    const formVal = Object.assign({}, this.addcustomerForm.value);
    self.commonServices.validateAllFormFields(this.addcustomerForm);
    this.addcustomer(formVal);
    // this.addCusomersLogs(formVal);
  }

  initLineItem(options?) {
    return this._fb.group({
      name: ['', []],
      phone: ['', []],
      email: ['', []],
      description: ['', []]
    });
  }
  getCustomerDetails() {
    const self = this;
    self.loading = true;
    const httpParams = new HttpParams();
    const params = httpParams.set('id', this._id);

    const url = environment.apiUrl + 'customers';
    /**
   *  Init the line item for the form builder
   */
    const custDetailsArr = (<FormArray>self.addcustomerForm.get('contact_details'));
    this.httpService.get(url, params)
      .then(function (customer: any) {
        self.loading = false;
        if (customer.data.length) {
          customer = customer.data[0];
          self.custLogData = customer.cust_logs;
          self.addcustomerForm.patchValue({
            org_name: customer.org_name,
            org_address: customer.org_address,
            c_id: customer._id,
            customer_id: customer.customer_id
          });
          self._initCustomerDetailsArr(customer.contact_details);
        } else {
          self.toastr.error('Customer not found!', 'Error!', { 'toastLife': 5000 });
          this.router.navigate(['/quotes/list']);
        }
      })
      .catch(function (err) {
        self.loading = false;
        self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
      });
  }

  cancel() {
    if (confirm('All the changes you made will be discarded. Are you sure you want to cancel?')) {
      this.router.navigate(['/quotes/list']);
    }
    return false;
  }

  _initCustomerDetailsArr(data?) {
    const self = this;
    const custDetailsArr = (<FormArray>self.addcustomerForm.get('contact_details'));
    if (data && data.length) {
      data.forEach((lineItem, index) => {
        custDetailsArr.push(
          new FormGroup({
            'name': new FormControl(lineItem.name, [Validators.required, self.commonServices.noWhitespaceValidator]),
            'phone': new FormControl(lineItem.phone, [Validators.required, , self.commonServices.noWhitespaceValidator]),
            'email': new FormControl(lineItem.email, [Validators.required, , self.commonServices.noWhitespaceValidator]),
            'description': new FormControl(lineItem.description, [Validators.required, , self.commonServices.noWhitespaceValidator])
          }));
      });
    } else {
      self._addQuaryContactRow();
    }
  }

  _addQuaryContactRow() {
    const self = this;
    (<FormArray>this.addcustomerForm.get('contact_details')).push(
      new FormGroup({
        'name': new FormControl('', [Validators.required, self.commonServices.noWhitespaceValidator]),
        'phone': new FormControl('', [Validators.required, self.commonServices.noWhitespaceValidator]),
        'email': new FormControl('', [Validators.required, self.commonServices.noWhitespaceValidator]),
        'description': new FormControl('', [Validators.required, self.commonServices.noWhitespaceValidator])
      })
    );
    return false;
  }
}
