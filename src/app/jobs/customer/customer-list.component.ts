import { AuthService } from '../../shared/auth/auth.service';
import { Component, OnInit, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { environment } from 'environments/environment';
import HttpServices from '../../shared/services/HttpServices';
import { Title } from '@angular/platform-browser';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  @ViewChild('nameTpl') nameTpl: TemplateRef<any>;
  // variables definition
  private url = environment.apiUrl + 'customers';
  private columns: Object[] = [];
  private customers: Object[] = [];
  private loading: boolean = false;
  // constructor
  constructor(
    private _authService: AuthService,
    private httpService: HttpServices,
    private titleService: Title,
    private toastr: ToastsManager
  ) {
    // setting page title
    this.titleService.setTitle('Customers');
  }

  ngOnInit() {
    this.columns = [
      {
        prop: 'cust_name',
        name: 'Customer Name',
        cellTemplate: this.nameTpl
      },
      {
        prop: 'cust_email',
        name: 'Email'
      },
      {
        prop: 'cust_contact',
        name: 'Contact'
      },
      {
        prop: 'cust_country',
        name: 'Country'
      }
    ];
    this._getCustomers();
  }

  private _getCustomers() {
    const self = this;
    this.httpService.get(this.url)
      .then(function (res: any) {
        self.loading = false;
        self.customers = res.data;
      })
      .catch(function (err) {
        self.loading = false;
        self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
      });
  }
}
