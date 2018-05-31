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
export class SubjobsListComponent implements OnInit {
  @ViewChild('jobDetailView') jobDetailView: TemplateRef<any>;
  // variables definition
  private apiMsg: String = 'Loading...';
  private error: String = '';
  private jobDetail: Object;
  private jobs = [];
  private loading: boolean = false;
  private pageTitle = 'All Jobs';
  private temp = [];
  private url = environment.apiUrl + 'jobs/getAllJobsCountByCustomer';
  // constructor
  constructor(
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

  private _getJobs() {
    const self = this;
    self.loading = true;
    this.httpService.get(this.url)
      .then(function (res: any) {
        self.loading = false;
        self.jobs = res.data;
        self.apiMsg = self.jobs.length > 0 ? '' : 'No jobs found!';
      })
      .catch(function (err) {
        self.loading = false;
        self.apiMsg = '';
        self.error = 'Error occurred!';
      });
  }

  private onActionClick(e, type, params) {
    e.stopPropagation();
    switch (type) {
      case 'detail': {
        this.jobDetail = params;
        this._openModal(this.jobDetailView);
        break;
      };
      case 'add': {
        this.router.navigate(['/jobs/add/' + params]);
        break;
      };
      case 'edit': {
        this.router.navigate(['/jobs/add/' + params]);
        break;
      };
      case 'delete': {
        break;
      };
      default: return false;
    }
    return false;
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
    this.jobs = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
}
