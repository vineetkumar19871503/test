import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import CommonServices from '../../shared/services/CommonServices';
import { DatePipe } from '@angular/common';
import { environment } from 'environments/environment';
import HttpServices from '../../shared/services/HttpServices';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-all-quote',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.scss']
})
export class QuotesListComponent implements OnInit {
  @ViewChild('jobDetailView') jobDetailView: TemplateRef<any>;
  // variables definition
  private apiMsg: String = 'Loading...';
  private error: String = '';
  private jobDetail: Object;
  private quotes = [];
  private tmpQuotes = [];
  private quotesWithStatus = [];
  private tmpQuotesWithStatus = [];
  private loading: boolean = false;
  private pageTitle = 'Quotes';
  private temp = [];
  private url = environment.apiUrl + 'quotes';
  private modalRef: any;
  // constructor
  constructor(
    private commonServices: CommonServices,
    private httpService: HttpServices,
    private modalService: NgbModal,
    private router: Router,
    private titleService: Title,
    public toastr: ToastsManager
  ) {
    // setting page title
    this.titleService.setTitle(this.pageTitle);
  }
  ngOnInit() {
    this._getQuotesCountByCustomer();
  }
  private _getQuotesCountByCustomer() {
    const self = this;
    self.loading = true;
    this.httpService.get(this.url + '/getQuotesCountByCustomer')
      .then(function (res: any) {
        self.loading = false;
        self.quotes = res.data;
        self.tmpQuotes = self.quotes;
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
        self.tmpQuotesWithStatus = res.data;
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

  // filter quote table data based on searched key
  filterQuotes(val, tableRef) {
    const filteredQuotes = this.commonServices.filterTableData(val, this.tmpQuotes, tableRef);
    if (filteredQuotes !== undefined) {
      this.quotes = filteredQuotes;
      tableRef.offset = 0;
    }
  }

  // filter quote table data based on searched key
  filterModalQuotes(val, tableRef) {
    const filteredQuotes = this.commonServices.filterTableData(val, this.tmpQuotesWithStatus, tableRef);
    if (filteredQuotes !== undefined) {
      this.quotesWithStatus = filteredQuotes;
      tableRef.offset = 0;
    }
  }
}
