import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { environment } from 'environments/environment';
import HttpServices from '../../shared/services/HttpServices';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import CommonServices from '../../shared/services/CommonServices';

@Component({
  selector: 'app-all-quote',
  templateUrl: './bills-list.component.html',
  styleUrls: ['./bills-list.component.scss']
})
export class BillsListComponent implements OnInit {
  @ViewChild('jobDetailView') jobDetailView: TemplateRef<any>;
  // variables definition
  private apiMsg: String = 'Loading...';
  private error: String = '';
  private jobDetail: Object;
  private quotes = [];
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
  private datevalue: any;
  // constructor
  constructor(
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
    this._getAllTagidGeneratedSubJob();
  }

  // when date filter changes
  onfdtChange(date) {
    this.selectedDate = date;
    this._getAllTagidGeneratedSubJob(date);
    // this._manageActionsByDate(date);
  }
  private _getAllTagidGeneratedSubJob(date?) {
    const self = this;
    self.loading = true;
    if (!date) {
      date = self.commonServices.getToday(true);
    }
    date = date.year + '-' + date.month + '-' + date.day;
    self.datevalue = date;

    this.httpService.get(this.url + 'assigned_jobs' + '/getAllTagidGeneratedSubJob', { date })
      .then(function (res: any) {
        self.loading = false;
        self.bills = res.data;
      })
      .catch(function (err) {
        self.loading = false;
        self.apiMsg = '';
        self.error = 'Error occurred!';
      });
  }
  private _manageActionsByDate(date) {
    if (date) {
      this.isPastDate = this.commonServices.compareDates(this.commonServices.convertObjToDate(date), 'lt');
    }
  }
}
