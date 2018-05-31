import { } from 'googlemaps';
import { ActivatedRoute } from '@angular/router';
import CommonServices from '../../shared/services/CommonServices';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormControl, FormBuilder, FormArray, FormGroup, Validators, NgForm } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import HttpServices from '../../shared/services/HttpServices';
import * as moment from 'moment';
import { NgbModal, NgbDateStruct, NgbDatepickerI18n, NgbCalendar, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-assign-job',
  templateUrl: './assign-job.component.html',
  styleUrls: ['./assign-job.component.scss']
})
export class AssignJobComponent implements OnInit {
  @ViewChild('cancelJobModal') cancelJobModal: TemplateRef<any>;
  @ViewChild('importDriversModal') importDriversModal: TemplateRef<any>;
  @ViewChild('importPullersModal') importPullersModal: TemplateRef<any>;
  @ViewChild('importSubhaulersModal') importSubhaulersModal: any;
  @ViewChild('subhaulerTable') subhaulerTable: any;

  // variables definition
  private actionLoader: boolean = false;
  private assignForm: FormGroup;
  private cancelJobForm: FormGroup;
  private defaultTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  private dispatchDetail: any = {};
  private quarries = [];
  private formErrors;
  private importedDrivers = [];
  private isNotTodaysJob = true;
  private modalDriverColumns = [
    {
      name: 'Driver Name',
      prop: 'first_name',
      resizeable: false
    },
    {
      name: 'Truck Type',
      prop: 'truck_type',
      resizeable: false
    }
  ];
  private modalDriverSelected = false;
  private importedData = [];
  private isQtyFilled: Boolean = false;
  private isCancelledDriver: Boolean = false;
  private assignDt: any;
  private jobCancelled: boolean = false;
  private jobDetailsGrp;
  private loading: Boolean = false;
  private modalDrivers = [];
  private modalRef: any;
  private modalSelectedDriver = [];
  private selectedDriver = [];
  private assignDate;
  private totalQty: any = 0; // total quantity of trucks to be updated when truck qty fields change
  private truckQty = [];
  private _tempSelectedDrivers = {};
  private _tempTruckTypes = [];
  private _tempTruckTypesObj = {};
  private _tz = -(new Date().getTimezoneOffset());
  private totalReqDateFields: Number = 1;
  private truckTypes = this.commonServices.getTruckDetails();

  private reqDateModel: Object = Array(this.totalReqDateFields)
  // constructor
  constructor(
    private activatedRoute: ActivatedRoute,
    private commonServices: CommonServices,
    private _fb: FormBuilder,
    private httpService: HttpServices,
    private modalService: NgbModal,
    private router: Router,
    private titleService: Title,
    private toastr: ToastsManager
  ) {
    // setting page title
    this.titleService.setTitle(environment.siteName + ' - Assign Job');
    // this.assignDate = this.commonServices.extractDate(new Date());
  }

  ngOnInit() {
    const self = this;
    self.truckTypes.map(function (tt: { name: '', value: '' }) {
      self._tempTruckTypes.push(tt.name);
      self._tempTruckTypesObj[tt.value] = tt.name;
    });
    // form fields declaration
    self.assignForm = new FormGroup({
      'job_details': new FormGroup({
        'customer_id': new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(4)]),
        'customer_name': new FormControl({ value: null, disabled: true }, [Validators.required]),
        'job_id': new FormControl({ value: null, disabled: true }, [Validators.required]),
        'job_name': new FormControl({ value: null, disabled: true }, [Validators.required]),
        'origin': new FormControl({ value: null, disabled: true }, [Validators.required]),
        'destination': new FormControl({ value: null, disabled: true }, [Validators.required]),
        'direction': new FormControl({ value: null }, [Validators.required]),
        'internal_notes': new FormControl({ value: null }, [Validators.required]),
        'cancelled_by': new FormControl({ value: null, disabled: true }),
        'cancel_reason': new FormControl({ value: null, disabled: true }),
      }),
      'date': new FormControl({ value: null, disabled: true }, [Validators.required]),
      'start_time': new FormControl(null, [Validators.required]),
      'no_of_trucks': new FormControl(null, [Validators.required]),
      'truck_qty': self._fb.array([]),
      'tmp_dr_data': self._fb.array([]),  // temporary drivers data (for comments)
      'interval': new FormControl(null, [Validators.required])
    });

    // initializing cancel job form
    self.cancelJobForm = new FormGroup({
      'cancelled_by': new FormControl(null, [Validators.required]),
      'cancel_reason': new FormControl(null, [Validators.required])
    });

    self.jobDetailsGrp = self.assignForm.get('job_details');

    // fetch job details
    self._fillJobDetails();
  }

  // cancel dispatched job for today
  cancelJob() {
    const self = this;
    self.commonServices.validateAllFormFields(self.cancelJobForm);
    if (self.cancelJobForm.valid) {
      self.actionLoader = true;
      const cancelFormVal = self.cancelJobForm.value;
      self.httpService.post(environment.apiUrl + 'dispatches/cancel', Object.assign({}, { 'dispatch_id': self.dispatchDetail._id }, cancelFormVal))
        .then(function (res: any) {
          self.actionLoader = false;
          self.modalRef.close();
          self.toastr.success(res.message, 'Success!', { 'toastLife': 5000 });
          // disable form on cancellation
          self.assignForm.patchValue({
            'job_details': {
              'cancelled_by': cancelFormVal.cancelled_by,
              'cancel_reason': cancelFormVal.cancel_reason
            }
          });
          self.jobCancelled = true;
          self.commonServices.disableAllFormFields(self.assignForm);
        })
        .catch(function (err) {
          self.actionLoader = false;
          self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
        });
    }
    return false;
  }

  // call drivers api and open driver modal
  openImportDriversModal(modalTpl) {
    const self = this;
    self.modalDriverSelected = false;
    self.modalSelectedDriver = [];
    let _sD: any = self.selectedDriver;
    if (_sD.length) {
      _sD = _sD[0];
      if (_sD.conf_sent || _sD.confirmed) {
        self.toastr.error('You can\'t import driver for this slot because confirmation has been sent to this driver', 'Error!', { 'toastLife': 5000 });
      } else {
        self.loading = true;
        // empty import jobs table data
        let url = environment.apiUrl + 'drivers/getUnoccupiedDriversByTruckType';
        if (!_sD.newRow) {
          url += '?type=' + _sD.truck_type;
        }
        this.httpService.get(url)
          .then(function (res: any) {
            self.loading = false;
            // excluding the drivers that are already selected in the slot
            self.modalDrivers = res.data.filter(function (dr) {
              if (!self._tempSelectedDrivers[dr._id]) {
                return dr;
              }
            });
            self.openModal(modalTpl);
          })
          .catch(function (err) {
            self.loading = false;
            self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
          });
      }
    } else {
      self.toastr.error('Please select a slot first', 'Error!', { 'toastLife': 2000 });
    }
  }

  openImportPullersModal(modalTpl) {
    const self = this;
    self.modalDriverSelected = false;
    self.modalSelectedDriver = [];
    let _sD: any = self.selectedDriver;
    if (_sD.length) {
      _sD = _sD[0];
      if (_sD.conf_sent || _sD.confirmed) {
        self.toastr.error('You can\'t import driver for this slot because confirmation has been sent to this driver', 'Error!', { 'toastLife': 2000 });
      } else {
        self.loading = true;
        // call api to fill modal pullers
        let url = environment.apiUrl + 'pullers/getUnoccupiedPullersByTruckType';
        if (!_sD.newRow) {
          url += '?type=' + _sD.truck_type;
        }
        this.httpService.get(url)
          .then(function (res: any) {
            self.loading = false;
            self.modalDriverColumns = [
              {
                name: 'Puller Name',
                prop: 'first_name',
                resizeable: false
              },
              {
                name: 'Truck Type',
                prop: 'truck_type',
                resizeable: false
              }
            ];
            // excluding the drivers that are already selected in the slot
            self.modalDrivers = res.data.filter(function (dr) {
              if (!self._tempSelectedDrivers[dr._id]) {
                return dr;
              }
            });
            self.openModal(modalTpl);
          })
          .catch(function (err) {
            self.loading = false;
            self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
          });
      }
    } else {
      self.toastr.error('Please select a slot first', 'Error!', { 'toastLife': 2000 });
    }
  }

  openImportSubhaulersModal(modalTpl) {
    const self = this;
    self.modalDriverSelected = false;
    self.modalSelectedDriver = [];
    let _sD: any = self.selectedDriver;
    if (_sD.length) {
      _sD = _sD[0];
      if (_sD.conf_sent || _sD.confirmed) {
        self.toastr.error('You can\'t import driver for this slot because confirmation has been sent to this driver', 'Error!', { 'toastLife': 2000 });
      } else {
        self.loading = true;
        // call api to fill modal pullers
        let url = environment.apiUrl + 'subhaulers/getUnoccupiedSubhaulersByTruckType';
        if (!_sD.newRow) {
          url += '?type=' + _sD.truck_type;
        }
        this.httpService.get(url)
          .then(function (res: any) {
            self.loading = false;
            self.modalDrivers = [];
            if (res.data.length) {
              res.data.forEach(function (sh) {
                if (sh.drivers.length) {
                  sh.drivers.forEach(function (dr) {
                    // excluding the drivers that are already selected in the slot
                    if (!self._tempSelectedDrivers[dr._id]) {
                      dr.sh_name = sh.name;
                      dr.sh_id = sh._id;
                      self.modalDrivers.push(dr);
                    }
                  });
                }
              });
            }
            self.openModal(modalTpl);
          })
          .catch(function (err) {
            self.loading = false;
            self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
          });
      }
    } else {
      self.toastr.error('Please select a slot first', 'Error!', { 'toastLife': 2000 });
    }
  }

  // commong method to open popup
  openModal(modalTemplate) {
    this.modalRef = this.modalService.open(modalTemplate);
    this.modalRef.result.then((result) => {
      // do something on close
    }, (reason) => {
    });
    return false;
  }

  // add driver detail to slots
  addDriverDetailToImportedData() {
    const self = this,
      driver: any = self.modalSelectedDriver;
    // if there are no rows selected then don't do anything
    if (typeof driver === 'object' && driver instanceof Array && !driver.length) {
      return;
    }
    setTimeout(function () {
      self.importedData = self.importedData.map(function (d) {
        if (d.i === self.selectedDriver[0].i) {
          d.phone = driver.phone;
          d.driver_name = driver.first_name;
          d.truck_type = driver.truck_type;
          d.driver_id = driver._id;
          if (d.driver_id) {
            self._tempSelectedDrivers[d.driver_id] = true;
          }
        }
        return d;
      })
      self.modalDriverSelected = false;
    }, 10)
    self.modalRef.close();
  }

  selectModalDriver($e) {
    if ($e.selected.length) {
      this.modalSelectedDriver = $e.selected[0];
      this.modalDriverSelected = true;
    }
  }

  // do the needful on form submit
  saveAssign(cb) {
    const self = this;
    self.commonServices.validateAllFormFields(self.assignForm);
    if (self.assignForm.valid) {
      // combining the address name, lat and lng into source and destination
      const formVal = Object.assign({}, self.assignForm.getRawValue()),
        _sT = formVal.start_time, // start time
        tmpDrControls = self.assignForm.get('tmp_dr_data')['controls'];
      formVal.date = self.commonServices.convertObjToDate(self.assignDate);
      // prearing form data
      formVal.start_time = self.commonServices.convertToDate(moment(formVal.date).format('YYYY-MM-DD') + ' ' + moment(_sT.hour + ':' + _sT.minute + ':' + _sT.second, 'HH:mm:ss').format('HH:mm:ss'));
      formVal.dispatch_id = self.dispatchDetail._id;
      formVal.truck_qty = self.truckQty;
      formVal.drivers = [];
      self.importedData.map(function (d, ind) {
        // if slot has driver imported then only allow it to be saved
        if (d.driver_id) {
          const tmp = Object.assign({}, d);
          tmp.comment = tmpDrControls[ind].value.comment;
          // converting driver start time into js date object
          if (d.newRow) {
            let _t = tmpDrControls[ind].value.time;
            _t = _t.hour + ':' + _t.minute + ':' + _t.second;
            tmp.time = self.commonServices.convertToDate(moment(formVal.date).format('YYYY-MM-DD') + ' ' + moment(_t, 'HH:mm  A').format('HH:mm:ss'));
          } else {
            tmp.time = self.commonServices.convertToDate(moment(formVal.date).format('YYYY-MM-DD') + ' ' + moment(d.time, 'HH:mm A').format('HH:mm:ss'));
          }
          delete tmp.i;
          delete tmp.driver_name;
          delete tmp.newRow;
          delete tmp.truck_type;
          formVal.drivers.push(tmp);
        }
      });
      delete formVal.tmp_dr_data;
      delete formVal.job_details;
      // save assign job detail
      self.loading = true;
      self.httpService.post(environment.apiUrl + 'assigned_jobs/add', formVal)
        .then(function (res: any) {
          self.toastr.success(res.message, 'Success!', { 'toastLife': 5000 });
          self.loading = false;
          cb();
        })
        .catch(function (err) {
          self.loading = false;
          self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
        });
    } else {
      this.toastr.error('There are some invalid fields in the form');
    }
    return false;
  }

  // generate slots based on start time + no. of trucks + interval
  generateSlots() {
    const self = this,
      formVal = self.assignForm.getRawValue();
    // rendering slots
    if (self.importedData.length) {
      self.saveAndNotifyDrivers();
    } else {
      if (formVal.interval && formVal.no_of_trucks) {
        self._renderTruckSlots(formVal.truck_qty);
        self._renderTimeSlots();
      } else {
        self.toastr.error('No. of trucks or Interval can\'t be empty', 'Error!', { 'toastLife': 5000 });
      }
      // init tmp_dr_data form control
      self._initTempValues();
    }
  }

  // save selected drivers in slots and send sms for confirmation
  saveAndNotifyDrivers() {
    const self = this;
    self.importedDrivers = [];
    self.importedData.map(function (d) {
      if (d.driver_id) {
        self.importedDrivers.push(d);
      }
    });
    if (self.importedDrivers.length) {
      // making no. of trucks and frequency fields read only
      // if (self.importedDrivers.length) {
      //   const frmCtrls = self.assignForm.controls;
      //   frmCtrls['interval'].disable();
      //   frmCtrls['no_of_trucks'].disable();
      //   frmCtrls['start_time'].disable();
      //   frmCtrls['truck_qty'].disable();
      // }
      self.saveAssign(function () {
        const tmpCtrls = self.assignForm.get('tmp_dr_data')['controls'];
        self.importedDrivers = self.importedDrivers.map(function (driver, ind) {
          tmpCtrls[ind].get('comment').disable();
          driver.conf_sent = true;
          return driver;
        });
      });
    } else {
      self.toastr.error('Please add Drivers/Pullers/Subhaulers in the slots', 'Error!', { 'toastLife': 5000 });
    }
  }

  // binding change event to truck qty controls to update total
  private _bindQtyFieldChanges() {
    const self = this;
    self.assignForm.controls.truck_qty['controls'].forEach(function (i) {
      i.controls.qty.valueChanges.subscribe((change) => {
        self.totalQty = 0;
        self.assignForm.controls.truck_qty['controls'].forEach(function (tq) {
          if (tq.getRawValue().qty) {
            self.totalQty += parseInt(tq.getRawValue().qty, 10);
          }
        });
      });
    });
  }

  addRow() {
    const self = this;
    (<FormArray>self.assignForm.controls.tmp_dr_data).push(
      new FormGroup({
        'comment': new FormControl(null),
        'time': new FormControl(self.defaultTime, [Validators.required])
      })
    );
    self.importedData.push({
      'i': self.importedData.length,
      'newRow': true,
      'cancelled': false
    });
  }

  // deletes the slot before sms sent to driver for approval or driver confirmed the job
  deleteSlot() {
    const self = this;
    if (self.selectedDriver.length) {
      const d: any = self.selectedDriver[0];
      if (d.conf_sent) {
        self.toastr.error('You can\'t delete this slot because confirmation has been sent to the driver for approval!', 'Error!', { 'toastLife': 2000 });
      } else if (d.confirmed) {
        self.toastr.error('You can\'t delete this slot because driver has confirmed the job!', 'Error!', { 'toastLife': 2000 });
      } else {
        if (confirm('Are you sure you want to delete this slot?')) {
          self.importedData.splice(d.i, 1);
          delete self._tempSelectedDrivers[d.driver_id];
        }
      }
    } else {
      self.toastr.error('Please select a slot first', 'Error!', { 'toastLife': 2000 });
    }
  }

  // cancels the driver from job if confirmation is sent to driver or driver confirmed the job
  cancelDriver() {
    const self = this;
    if (self.selectedDriver.length) {
      const d: any = self.selectedDriver[0],
        selectedInd = d.i;
      // if driver is cancelled then don't let user cancel it again
      if (self.isCancelledDriver) {
        self.toastr.error('You can\'t cancel an already cancelled driver!', 'Error!', { 'toastLife': 4000 });
      } else if (d.confirmed) {
        self.toastr.error('You can\'t cancel an approved driver!', 'Error!', { 'toastLife': 4000 });
      } else {
        if (d.conf_sent || d.confirmed) {
          if (confirm('Are you sure you want to cancel this driver?')) {
            self.httpService.post(environment.apiUrl + 'assigned_jobs/cancelDriver', Object.assign({ 'dispatch_id': self.dispatchDetail._id, 'driver_id': d.driver_id }))
              .then(function (res: any) {
                self.loading = false;
                self.toastr.success(res.message, 'Success!', { 'toastLife': 5000 });
                self.importedData[selectedInd].cancelled = true
                delete self._tempSelectedDrivers[d.driver_id];
              })
              .catch(function (err) {
                self.actionLoader = false;
                self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
              });
          }
        } else {
          self.toastr.error('You can only cancel a driver if a confirmation is sent to him or he confirmed the job!', 'Error!', { 'toastLife': 4000 });
        }
      }

    } else {
      self.toastr.error('Please select a slot first', 'Error!', { 'toastLife': 4000 });
    }
  }

  // do something when truck slot is selected
  onSlotSelect($e) {
    const d = this.selectedDriver = $e.selected;
    this.isCancelledDriver = d[0].cancelled;
  }

  // fetch job details based on url id and fill details in form
  private _fillJobDetails() {
    this.loading = true;
    this.activatedRoute.params.subscribe(params => {
      const dispatchId = params.job_id,
        self = this,
        // url = environment.apiUrl + 'sub_jobs/getJobById?id=' + jobId;
        url = environment.apiUrl + 'dispatches/getDispatchDetailById?id=' + dispatchId;

      self.httpService.get(url)
        .then(function (res: any) {
          self.loading = false;
          if (res.data.length) {
            self.dispatchDetail = res.data[0];
            self.quarries = self.dispatchDetail.job.quarries;
            self.assignDate = self.commonServices.extractDate(self.dispatchDetail.date);
            const job = self.dispatchDetail.job,
              customer = self.dispatchDetail.customer;
            // filling job details in form
            self.assignForm.patchValue({
              'job_details': {
                'customer_id': job.customer_id,
                'customer_name': customer.cust_name,
                'job_id': customer.customer_id + '-' + job.pjob_id + '-' + job.subjob_id,
                'job_name': job.job_name,
                'origin': job.origin.address,
                'destination': job.destination.address,
                'direction': job.direction,
                'internal_notes': job.internal_notes
              }
            });
            // disabling form fields
            const jobDetailCtrls = self.assignForm['controls'].job_details['controls'];
            jobDetailCtrls['direction'].disable();
            jobDetailCtrls['internal_notes'].disable();

            // patching dispatch values in form
            self._fillDispatchDetails();

            // patching assign values in form
            self._fillAssignDetails();

            // check if dispatch date is past then disable all form fields
            if (self.commonServices.compareDates(self.dispatchDetail.date, 'ne', null, true)) {
              self.commonServices.disableAllFormFields(self.assignForm);
            } else {
              self.isNotTodaysJob = false;
            }
          } else {
            self.toastr.error(res.message, 'Error!', { 'toastLife': 5000 });
            self.router.navigate(['/jobs/dispatch'])
          }
        })
        .catch(function (err) {
          self.loading = false;
          self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
        });
    });
  }

  _fillDispatchDetails() {
    // patching dispatch values in inputs
    const _dd = this.dispatchDetail;
    if (_dd.cancelled) {
      this.assignForm.patchValue({
        'job_details': {
          'cancelled_by': _dd.cancelled_by,
          'cancel_reason': _dd.cancel_reason
        }
      });
    }
    // if cancel date matches today's date then make form read only
    // passing one argument will check the given date with today
    // if job is cancelled then do the needful
    if (this.dispatchDetail.cancelled) {
      this.jobCancelled = true;
      this.commonServices.disableAllFormFields(this.assignForm);
    }
  }

  _fillAssignDetails() {
    const self = this;
    if (Object.keys(self.dispatchDetail.assign).length) {
      const _dT = self.dispatchDetail.assign,
        // patching values in form
        _sT = moment(_dT.start_time).utcOffset(self._tz);
      self.assignForm.patchValue({
        'no_of_trucks': _dT.no_of_trucks,
        'interval': _dT.interval,
        'start_time': { hour: _sT.format('HH'), minute: _sT.format('mm'), second: _sT.format('ss') }
      });

      // disabling form fields
      const jobDetailCtrls = self.assignForm['controls'];
      jobDetailCtrls['start_time'].disable();
      jobDetailCtrls['no_of_trucks'].disable();
      jobDetailCtrls['interval'].disable();

      const tmpCtrl = <FormArray>self.assignForm.controls.tmp_dr_data,
        twoHrsBack = new Date();
      twoHrsBack.setHours(twoHrsBack.getHours() - 2); // for driver's No Show Up status
      self.importedData = _dT.drivers.map(function (dr, ind) {
        console.log(dr);
        const noShowUp = !dr.confirmed && new Date(dr.assigned_time) < twoHrsBack;
        tmpCtrl.push(
          new FormGroup({
            'comment': new FormControl({ value: dr.comment, disabled: true }),
            'time': new FormControl({
              value: self.commonServices.extractDate(moment(dr.time, 'HH:mm:ss').toDate()),
              disabled: true
            }, [Validators.required])
          })
        );
        const slotTime = dr.time;
        return {
          'i': ind,
          'time': moment(dr.time).utcOffset(self._tz).format('hh:mm A'),
          'driver_id': dr.driver_id,
          'phone': dr.phone,
          'driver_name': dr.first_name,
          'driver_type': dr.driver_type,
          'truck_type': dr.truck_type,
          'cancelled': dr.cancelled ? dr.cancelled : false,
          'confirmed': dr.confirmed,
          'no_show_up': noShowUp,
          'tag_id': dr.tag_id,
          'conf_sent': true
        };
      });
      if (_dT.truck_qty.length) {
        self._initTruckTypeFields(_dT.truck_qty);
      }
    } else {
      self._initTruckTypeFields();
    }
  }

  // initialize tmp_dr_data form control according to slot rows
  private _initTempValues() {
    const self = this;
    const ctrl = <FormArray>self.assignForm.controls.tmp_dr_data;
    self.importedData.forEach(dt => {
      ctrl.push(
        new FormGroup({
          'comment': new FormControl(null),
          'time': new FormControl(null)
        })
      );
    });
  }

  // initializes request fields in n number
  private _initRequestDateFields() {
    for (let i = 0; i < this.totalReqDateFields; i++) {
      (<FormArray>this.assignForm.get('request_dates')).push(new FormControl(null, [Validators.required]));
    }
  }

  // init truck type array controls
  private _initTruckTypeFields(truckData?) {
    const self = this;
    self.truckTypes.forEach(function (truckType: { name: null, value: null }, i) {
      let qty = null;
      if (truckData) {
        // if truck data exists in db then fill it
        const keys = Object.keys(truckData);
        keys.map(function (k) {
          if (truckData[k].truck_type === truckType.value) {
            qty = truckData[k].qty;
            self.totalQty += qty;
            return false;
          }
        });
      }
      self.truckQty.push({
        'truck_type': truckType.value,
        'qty': qty
      });
      (<FormArray>self.assignForm.get('truck_qty')).push(
        new FormGroup({
          'truck_type': new FormControl(truckType.value),
          'qty': new FormControl(qty)
        })
      );
    });
    // update the total qty of trucks when any truck qty field changes
    self._bindQtyFieldChanges();

    // disabling truck_qty form control is assign detail found
    if (truckData || self.jobCancelled) {
      self.assignForm.controls['truck_qty'].disable();
    }
  }

  // do something when quarry dropdown changes
  onQuarryChange(event) {
    if (event) {
      // this.destinationName = event;
    }
  }


  openCancelModal(modalRef) {
    this.cancelJobForm.reset();
    let uncancelledDrivers = false;
    this.importedData.forEach(function (d) {
      if (!d.cancelled) {
        uncancelledDrivers = true;
        return false;
      }
    });
    if (uncancelledDrivers) {
      this.toastr.error('Please cancel all the drivers before cancelling this job!', 'Error!', { 'toastLife': 5000 });
    } else {
      this.openModal(modalRef);
    }
    return false;
  }

  // render the slots based on the start time, no. of trucks and frequency entered
  private _renderTimeSlots() {
    let startTime;
    const formVal = this.assignForm.getRawValue(),
      self = this;
    if (self.isQtyFilled) {
      let counter = 0;
      const _sT = formVal.start_time,
        truckFrequency = formVal.no_of_trucks,
        startDate = moment(formVal.date).format('YYYY-MM-DD');
      startTime = moment(_sT.hour + ':' + _sT.minute + ':' + _sT.second, 'HH:mm:ss');
      self.importedData = self.importedData.map(function (d) {
        if (counter >= truckFrequency) {
          counter = 0;
          startTime.add(formVal.interval, 'minutes');
        }
        counter++;
        d.time = startTime.format('hh:mm A');
        return d;
      });
      const frmCtrls = self.assignForm.controls;
      frmCtrls['interval'].disable();
      frmCtrls['no_of_trucks'].disable();
      frmCtrls['start_time'].disable();
      frmCtrls['truck_qty'].disable();
    }
  }

  // render the slots based on truck quantity entered
  private _renderTruckSlots(data) {
    const self = this;
    let index = 0;
    data.map(function (d) {
      if (d.qty) {
        self.truckQty.push(d);
        // if any truck type has qty then set isQtyFilled to true to generate the time slots
        self.isQtyFilled = true;
        for (let i = 0; i < d.qty; i++) {
          self.importedData.push({
            'i': index,
            'time': '',
            'phone': '',
            'driver_name': '',
            'truck_type': d.truck_type,
            'confirmed': false,
            'comment': '',
            'tag_id': null
          });
          index++;
        }
      }
    });
  }

  // toggle subhauler expand/collapse
  private _toggleExpandGroup(group, elem) {
    elem.groupHeader.toggleExpandGroup(group);
  }
  // do something when subhauler expand/collapse toggles
  private _onDetailToggle($e) {
    // console.log($e);
  }
}
