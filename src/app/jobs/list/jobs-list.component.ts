import CommonServices from '../../shared/services/CommonServices';
import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { environment } from 'environments/environment';
import HttpServices from '../../shared/services/HttpServices';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-all-jobs',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {
  @ViewChild('jobDetailView') jobDetailView: TemplateRef<any>;
  // variables definition
  private apiMsg: String = 'Loading...';
  private error: String = '';
  private jobDetail: Object;
  private jobs = [];
  private tmpJobs = [];
  private loading: boolean = false;
  private pageTitle = 'All Jobs';
  private temp = [];
  private url = environment.apiUrl + 'quotes/getJobsCountByCustomer';
  // constructor
  constructor(
    private commonServices: CommonServices,
    private httpService: HttpServices,
    private modalService: NgbModal,
    private router: Router,
    private titleService: Title
  ) {
    // setting page title
    this.titleService.setTitle(this.pageTitle);
  }

  ngOnInit() {
    this._getJobs();
  }
  private onActionClick(e, type, params) {
    e.stopPropagation();
    switch (type) {
      case 'add': {
        this.router.navigate(['/customers/add/' + params]);
        break;
      };
      case 'joblist': {
        this.router.navigate(['/jobs/jobListByCustomerid/' + params]);
        break;
      };
      default: return false;
    }
    return false;
  }
  private _getJobs() {
    const self = this;
    self.loading = true;
    this.httpService.get(this.url)
      .then(function (res: any) {
        self.loading = false;
        self.jobs = res.data;
        self.tmpJobs = res.data;
        // console.log(self.jobs);
        self.apiMsg = self.jobs.length > 0 ? '' : 'No jobs found!';
      })
      .catch(function (err) {
        self.loading = false;
        self.apiMsg = '';
        self.error = 'Error occurred!';
      });
  }

  // private onActionClick(e, type, params) {
  //   e.stopPropagation();
  //   switch (type) {
  //     case 'detail': {
  //       this.jobDetail = params;
  //       this._openModal(this.jobDetailView);
  //       break;
  //     };
  //     case 'add': {
  //       this.router.navigate(['/jobs/add/' + params]);
  //       break;
  //     };
  //     case 'edit': {
  //       this.router.navigate(['/jobs/add/' + params]);
  //       break;
  //     };
  //     case 'delete': {
  //       break;
  //     };
  //     default: return false;
  //   }
  //   return false;
  // }


  private _openModal(content) {
    this.modalService.open(content).result.then((result) => {
      // do something on close
    }, (reason) => {
    });
  }

  // filter quote table data based on searched key
  filterJobs(val, tableRef) {
    const filteredJobs = this.commonServices.filterTableData(val, this.tmpJobs, tableRef);
    if (filteredJobs !== undefined) {
      this.jobs = filteredJobs;
      tableRef.offset = 0;
    }
  }
}
