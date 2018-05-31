import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import CommonServices from '../../shared/services/CommonServices';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import * as moment from 'moment';
import HttpServices from '../../shared/services/HttpServices';
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbDateStruct, NgbDatepickerI18n, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Title } from '@angular/platform-browser';
import { HttpSentEvent } from '@angular/common/http/src/response';
@Component({
  selector: 'app-dispatch-job',
  templateUrl: './dispatch-job.component.html',
  styleUrls: ['./dispatch-job.component.scss']
})
export class DispatchJobComponent implements OnInit {
  // modal view templates
  @ViewChild('copyJobModal') copyJobModal: TemplateRef<any>;
  @ViewChild('dispatchTable') dispatchTable: any;
  @ViewChild('importJobModal') importJobModal: TemplateRef<any>;
  @ViewChild('moveJobModal') moveJobModal: TemplateRef<any>;
  @ViewChild('removeJobModal') removeJobModal: TemplateRef<any>;

  private copyJobForm: FormGroup;
  private moveJobForm: FormGroup;
  private currentSelectedJob: any = null;
  // for copy datepicker+modal
  private cpd: any;
  private cancelledJob: boolean = false;
  private fdt: any;
  private fdtVal: any;
  private mvd: any;
  private dispatchJobs = [];
  private isPastDate = false;
  private jobs = [];
  private tmpJobs = [];
  private importedJobs = [];
  private _tmpImportedJobs = [];  // for filtering
  private actionLoader: boolean = false;
  private loading: boolean = false;
  private minDate: NgbDateStruct;
  private modalRef: any;
  private selectedDate;
  private selectedJobsToImport = [];

  // constructor
  constructor(
    private commonServices: CommonServices,
    private _fb: FormBuilder,
    private httpService: HttpServices,
    private modalService: NgbModal,
    public toastr: ToastsManager,
    private titleService: Title,
  ) {
    this.titleService.setTitle(environment.siteName + ' - Dispatch Job');
    this.fdtVal = this.selectedDate = this.commonServices.getToday(true);
    this._manageActionsByDate(this.fdtVal);
  }

  ngOnInit() {
    // instantiate copy job form
    this.copyJobForm = this._fb.group({
      'job_id': new FormControl(null, [Validators.required]),
      'job_name': new FormControl(null, [Validators.required]),
      'copy_date': new FormControl(null, [Validators.required])
    });

    // instantiate move job form
    this.moveJobForm = this._fb.group({
      'job_id': new FormControl(null, [Validators.required]),
      'job_name': new FormControl(null, [Validators.required]),
      'move_date': new FormControl(null, [Validators.required])
    });

    // to disable past dates in datepicker
    this.setMinDate();

    // get dispatch data
    this.getDispatches();
  }

  // open modal to import jobs
  openImportJobModal(modalTpl) {
    const self = this,
      _dT = this.selectedDate,
      date = _dT.year + '-' + _dT.month + '-' + _dT.day;
    self.loading = true;
    // empty import jobs table data
    this.httpService.get(environment.apiUrl + 'dispatches/getJobs', { date })
      .then(function (res: any) {
        self.loading = false;
        self.jobs = res.data.map(function (d) {
          d.disp_jobid = d.pjob_id + '-' + d.subjob_id;
          return d;
        });
        self.tmpJobs = self.jobs;
        self.openModal(modalTpl);
      })
      .catch(function (err) {
        self.loading = false;
        self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
      });
  }

  // open modal to copy job
  openCopyJobModal(modalTpl) {
    if (this.currentSelectedJob) {
      const _j = this.currentSelectedJob;
      this.copyJobForm.get('job_id').patchValue(_j.customer.customer_id + '-' + _j.pjob_id + '-' + _j.subjob_id);
      this.copyJobForm.get('job_name').patchValue(_j.job_name);
      this.openModal(modalTpl);
    } else {
      this.toastr.error('Please import & select a job first', 'Error!', { 'toastLife': 5000 });
    }
  }

  // open modal to move job
  openMoveJobModal(modalTpl) {
    // if there are assigned drivers then you can't move the job
    this.moveJobForm.reset();
    if (this.currentSelectedJob) {
      if (this.currentSelectedJob.total_trucks) {
        this.toastr.error('Please cancel all the assigned drivers first to remove the job.', 'Error!', { 'toastLife': 5000 });
      } else {
        const _j = this.currentSelectedJob;
        this.moveJobForm.get('job_id').patchValue(_j.customer.customer_id + '-' + _j.pjob_id + '-' + _j.subjob_id);
        this.moveJobForm.get('job_name').patchValue(_j.job_name);
        this.openModal(modalTpl);
      }
    } else {
      this.toastr.error('Please import & select a job first', 'Error!', { 'toastLife': 5000 });
    }
  }

  // open modal to remove job
  openRemoveJobModal(modalTpl) {
    if (this.currentSelectedJob) {
      if (this.currentSelectedJob.total_trucks) {
        this.toastr.error('Please cancel all the assigned drivers first to remove the job.', 'Error!', { 'toastLife': 5000 });
      } else {
        this.openModal(modalTpl);
      }
    } else {
      this.toastr.error('Please import & select a job first', 'Error!', { 'toastLife': 5000 });
    }
  }

  // commong method to open popup
  openModal(modalTpl) {
    this.modalRef = this.modalService.open(modalTpl, { 'backdrop': 'static', 'size': 'lg' });
    this.modalRef.result.then((result) => {
      // do something on close
    }, (reason) => {
    });
  }

  getDispatches(date?) {
    const self = this;
    self.loading = true;
    if (!date) {
      date = self.commonServices.getToday(true);
    }
    date = date.year + '-' + date.month + '-' + date.day;
    // empty import jobs table data
    self.httpService.get(environment.apiUrl + 'dispatches', { date })
      .then(function (res: any) {
        self.currentSelectedJob = null;
        self.loading = false;
        self.importedJobs = res.data.map(function (d, i) {
          d.job.cancelled = d.cancelled;
          d.job.rowIndex = i;
          d.job.status = null;
          d.job.dispatch_id = d._id;
          d.job.total_trucks = 0;
          d.job.customer = d.customer;
          d.job.disp_jobid = d.job.pjob_id + '-' + d.job.subjob_id;
          if (Object.keys(d.assign).length && d.assign.drivers.length) {
            // counting the total drivers assigned (uncancelled)
            d.assign.drivers.forEach(function (_dr) {
              if (!_dr.cancelled) {
                d.job.total_trucks += 1;
              }
            });
          }
          if (d.cancelled) {
            d.job.status = 'Cancelled';
          }
          return d.job;
        });
        self._updateTempImportedJobs();
      })
      .catch(function (err) {
        self.loading = false;
        self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
      });
  }

  // assign selected jobs to imported jobs varibale
  importJob() {
    const self = this;
    if (self.selectedJobsToImport.length) {
      self.actionLoader = true;
      setTimeout(function () {
        const _dT = self.selectedDate,
          date = _dT.year + '-' + _dT.month + '-' + _dT.day,
          importUrl = environment.apiUrl + 'dispatches/add',
          dispatchData = self.selectedJobsToImport.map(function (d) {
            return {
              'job_id': d._id,
              'date': date
            };
          });
        // saving imported job into dispatch collection
        self.httpService.post(importUrl, dispatchData)
          .then(function (res: any) {
            self.selectedJobsToImport = self.selectedJobsToImport.map(function (d, i) {
              if (res.data) {
                const addedData = Object.assign({}, res.data[i]);
                addedData.total_trucks = 0;
                addedData.dispatch_id = addedData._id;
                delete addedData.job_id;
                delete addedData._id;
                d = Object.assign({}, d, addedData);
              }
              d.disp_jobid = d.pjob_id + '-' + d.subjob_id;
              return d;
            });
            self.importedJobs = self.selectedJobsToImport.concat(self.importedJobs);
            self._updateTempImportedJobs();
            self.actionLoader = false;
            self.modalRef.close();
            self.selectedJobsToImport = [];
          })
          .catch(function (err) {
            self.actionLoader = false;
            self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
          });
      }, 10);
    } else {
      self.toastr.error('Please select atleast one job from grid to import!', 'Error!', { 'toastLife': 5000 });
    }
  }

  // call api to copy selected job
  copyJob() {
    const self = this;
    this.commonServices.validateAllFormFields(this.copyJobForm);
    if (this.copyJobForm.valid) {
      self.actionLoader = true;
      const copyFormValues = Object.assign({}, this.copyJobForm.value);
      copyFormValues.copy_date = this.commonServices.convertObjToDate(copyFormValues.copy_date);
      copyFormValues.j_id = this.currentSelectedJob._id;
      copyFormValues.date_from = this.commonServices.convertObjToDate(self.fdtVal);
      const copyUrl = environment.apiUrl + 'sub_jobs/copy';
      this.httpService.post(copyUrl, copyFormValues)
        .then(function (res: any) {
          self.actionLoader = false;
          self.toastr.success(res.message, 'Success!', { 'toastLife': 5000 });
          self.copyJobForm.reset();
          self.modalRef.close();
        })
        .catch(function (err) {
          self.actionLoader = false;
          self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
        });
    }
  }

  // call api to move selected job
  moveJob() {
    const self = this;
    this.commonServices.validateAllFormFields(this.moveJobForm);
    if (this.moveJobForm.valid) {
      self.actionLoader = true;
      const moveFormValues = Object.assign({}, this.moveJobForm.value);
      moveFormValues.move_date = this.commonServices.convertObjToDate(moveFormValues.move_date);
      moveFormValues._id = this.currentSelectedJob.dispatch_id;
      moveFormValues.job_id = this.currentSelectedJob._id;
      const moveUrl = environment.apiUrl + 'dispatches/move';
      this.httpService.post(moveUrl, moveFormValues)
        .then(function (res: any) {
          self.importedJobs.splice(self.currentSelectedJob.rowIndex, 1);
          self._updateTempImportedJobs();
          self.actionLoader = false;
          self.toastr.success(res.message, 'Success!', { 'toastLife': 5000 });
          self.copyJobForm.reset();
          self.modalRef.close();
          self.currentSelectedJob = null;
        })
        .catch(function (err) {
          self.actionLoader = false;
          self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
        });
    }
  }

  onJobSelect($e) {
    const j = this.currentSelectedJob = $e.selected[0];
    this.cancelledJob = j.cancelled;
  }

  // when date filter changes
  onfdtChange(date) {
    this.selectedDate = date;
    this.getDispatches(date);
    this._manageActionsByDate(date);
    this.setMinDate();
  }

  // call api to remove selected job
  removeJob() {
    const self = this,
      removeUrl = environment.apiUrl + 'dispatches/delete';
    self.actionLoader = true;
    this.httpService.post(removeUrl, { _id: this.currentSelectedJob.dispatch_id })
      .then(function (res: any) {
        // trim remove job from array
        self.importedJobs = self.importedJobs.filter(function (job: any) {
          if (job._id !== self.currentSelectedJob._id) {
            return job;
          }
        });
        self._updateTempImportedJobs();
        self.actionLoader = false;
        self.toastr.success(res.message, 'Success!', { 'toastLife': 5000 });
        self.modalRef.close();
        self.currentSelectedJob = null;
      })
      .catch(function (err) {
        self.actionLoader = false;
        self.toastr.error(err.error.message, 'Couldn\'t remove job!', { 'toastLife': 5000 });
        self.modalRef.close();
      });
  }

  // to disable the past dates in datepicker module
  setMinDate() {
    const today = new Date();
    this.minDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate()
    };
  }

  // for move job date field:
  // if its today then disable today's date
  // if its a future date then don't disable today's date
  disableDays(date: any) {
    date = JSON.stringify(date);
    let _sd: any = document.getElementById('fdt')['value'];
    _sd = _sd.match(/(\d+)/g);
    _sd = new Date(_sd[0], _sd[1] - 1, _sd[2]);
    _sd = JSON.stringify({
      year: _sd.getFullYear(),
      month: _sd.getMonth() + 1,
      day: _sd.getDate()
    });
    let _td: any = new Date();
    _td = JSON.stringify({
      year: _td.getFullYear(),
      month: _td.getMonth() + 1,
      day: _td.getDate()
    });
    return _sd === date && date === _td;
  }

  // enable disable action buttons based on date
  // only copy will be enabled for past dates
  private _manageActionsByDate(date) {
    if (date) {
      this.isPastDate = this.commonServices.compareDates(this.commonServices.convertObjToDate(date), 'lt', null, true);
    }
    this.cancelledJob = false;
  }

  // filtering dispatch table data by searched key
  filterDispatchedJobs(val) {
    const filteredJobs = this.commonServices.filterTableData(val, this._tmpImportedJobs, this.dispatchTable);
    if (filteredJobs !== undefined) {
      this.importedJobs = filteredJobs;
      // this.dispatchTable.offset = 0;
    }
  }

  // filter jobs in import job modal
  filterJobsToImport(val, tableRef) {
    const filteredJobs = this.commonServices.filterTableData(val, this.tmpJobs, tableRef);
    if (filteredJobs !== undefined) {
      this.jobs = filteredJobs;
      // tableRef.offset = 0;
    }
  }

  // whenever the imported jobs array changes, update the temp imported jobs as well (for filtering)
  private _updateTempImportedJobs() {
    this._tmpImportedJobs = this.importedJobs;
  }
}
