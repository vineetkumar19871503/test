import CommonServices from '../../shared/services/CommonServices';
import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { environment } from 'environments/environment';
import HttpServices from '../../shared/services/HttpServices';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';


@Component({
  selector: 'app-all-jobs',
  templateUrl: './sub-jobs-list.component.html'
})
export class SubJobsComponent implements OnInit {
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
  private _id: string;
  private c_id: string;
  private url = environment.apiUrl + 'sub_jobs/getAllSubJobById';
  // constructor
  constructor(
    private activeRoute: ActivatedRoute,
    private commonServices: CommonServices,
    private httpService: HttpServices,
    private modalService: NgbModal,
    private router: Router,
    private titleService: Title,
    private _location: Location
  ) {
    // setting page title
    this.titleService.setTitle(this.pageTitle);
  }
  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      if (params.id !== undefined) {
        const idArr = params.id.split('__');
        this._id = idArr[0];
      } else {
        // this.router.navigate(['/quotes/all']);
      }
    });
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
    const httpParams = new HttpParams();
    const params = httpParams.set('id', this._id);
    this.httpService.get(this.url, params)
      .then(function (res: any) {
        self.loading = false;
        self.jobs = res.data.map(function (d) {
          d.disp_jobid = d.customer_id + '-' + d.pjob_id + '-' + d.subjob_id;
          return d;
        });
        self.tmpJobs = self.jobs;
        if (self.jobs.length) {
          self.c_id = res.data[0].c_id;
        }
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
    const filteredQuotes = this.commonServices.filterTableData(val, this.tmpJobs, tableRef);
    if (filteredQuotes !== undefined) {
      this.jobs = filteredQuotes;
      tableRef.offset = 0;
    }
  }
}
