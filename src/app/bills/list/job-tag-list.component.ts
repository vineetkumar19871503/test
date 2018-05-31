import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { environment } from 'environments/environment';
import HttpServices from '../../shared/services/HttpServices';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import CommonServices from '../../shared/services/CommonServices';

@Component({
  selector: 'app-all-quote',
  templateUrl: './job-tag-list.component.html',
  // styleUrls: ['./bills-list.component.scss']
})
export class JobTagsListComponent implements OnInit {
  @ViewChild('jobDetailView') jobDetailView: TemplateRef<any>;
  // variables definition
  private apiMsg: String = 'Loading...';
  private error: String = '';
  private jobDetail: Object;
  private jobdata = [];
  private bills = [];
  private quotesWithStatus = [];
  private loading: boolean = false;
  private pageTitle = 'Bill';
  private temp = [];
  private url = environment.apiUrl;
  private modalRef: any;
  private selectedDate;
  private isPastDate = false;
  private fdtVal: any;
  private date: any;
  private job_id: String;
  private customer_id: String = '';
  private jobids = [];
  // constructor
  constructor(
    private activeRoute: ActivatedRoute,
    private httpService: HttpServices,
    private modalService: NgbModal,
    private router: Router,
    private titleService: Title,
    public toastr: ToastsManager,
    private commonServices: CommonServices,
  ) {
    // setting page title
    this.titleService.setTitle(this.pageTitle);
    this.fdtVal = this.selectedDate = this.commonServices.getToday(true);
  }
  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      if (params.id !== undefined) {
        const idArr = params.id.split('__');
        this.job_id = idArr[0];
      }
      if (params.date !== undefined) {
        this.date = params.date;
      }
      if (params.cid !== undefined) {
        this.customer_id = params.cid;
      }
    });
    this._getTagidGeneratedBySingleSubJob();
    this._getAllJobIdUniqueCustomerId();
  }

  // when date filter changes
  onfdtChange(date) {
    this.selectedDate = date;
    this._getTagidGeneratedBySingleSubJob(date);
    // this._manageActionsByDate(date);
  }
  private _getTagidGeneratedBySingleSubJob(date?) {
    const self = this;
    self.loading = true;
    // if (!date) {
    //   date = self.commonServices.getToday(true);
    //   date = date.year + '-' + date.month + '-' + date.day;
    // }
    date = self.date;
    let JobId = self.job_id;
    this.httpService.get(this.url + 'assigned_jobs' + '/getTagidGeneratedBySingleSubJob', { date, JobId })
      .then(function (res: any) {
        self.loading = false;
        self.bills = res.data;
        console.log(self.bills[0]);
      })
      .catch(function (err) {
        self.loading = false;
        self.apiMsg = '';
        self.error = 'Error occurred!';
      });
  }

  private _getAllJobIdUniqueCustomerId() {
    const self = this;
    self.loading = true;
    const datevalue = this.date;
  //  let JobId = self.job_id;
    const c_id = self.customer_id;
    this.httpService.get(this.url + 'assigned_jobs' + '/getAllJobIdUniqueCustomerId', { datevalue, c_id })
      .then(function (res: any) {
        self.loading = false;
        self.jobdata = res.data;

        self.jobdata.forEach(function (data, index) {
          if (data) {
            self.jobids.push({
              'subjobid': data.customer_id + '-' + data.jobid + '-' + data.subjobid,
              'subjobidvalue': data.subjobobjid
            });
          }

        });

      })
      .catch(function (err) {
        self.loading = false;
        self.apiMsg = '';
        self.error = 'Error occurred!';
      });
  }
  // quotesWithStatus
  // commong method to open popup
  openModal(modalTpl) {
    this.modalRef = this.modalService.open(modalTpl);
    this.modalRef.result.then((result) => {
      // do something on close
    }, (reason) => {
    });
  }
  // open modal to show quotes with status
  openQuoteStatusModal(modalTpl, cId) {
    const self = this;
    self.loading = true;
    this.httpService.get(this.url + '/getAllQuotesByCustomerId?c_id=' + cId)
      .then(function (res: any) {
        self.loading = false;
        self.quotesWithStatus = res.data;
        self.openModal(modalTpl);
      })
      .catch(function (err) {
        self.loading = false;
        self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
      });
  }
  private _openModal(content) {
    this.modalService.open(content).result.then((result) => {
      // do something on close
    }, (reason) => {
    });
  }

  private updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    // this.quotes = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

  private _manageActionsByDate(date) {
    if (date) {
      this.isPastDate = this.commonServices.compareDates(this.commonServices.convertObjToDate(date), 'lt');
    }
  }
}
