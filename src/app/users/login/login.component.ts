import { AuthService } from './../../shared/auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FormControl, FormBuilder, FormArray, FormGroup, Validators, NgForm } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  // variables definition
  private loading: boolean = false;
  private loginForm: FormGroup;
  private url: string = environment.apiUrl + 'users/login';

  // constructor
  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private titleService: Title,
    private toastr: ToastsManager
  ) {
    this.titleService.setTitle(environment.siteName + ' - Login');
  }

  ngOnInit() {
    const self = this;
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required])
    });
  }

  // do the needful on form submit
  login(e) {
    const self = this;
    self.loading = true;
    self.validateAllFormFields(this.loginForm);
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    if (this.loginForm.valid) {
      // call login api
      this.http.post(this.url, self.loginForm.value, { headers })
        .subscribe(
        function (res: any) {
          const userData = res.data,
            token = res.token;
          if (Object.keys(userData).length) {
            self._authService.login({
              'user': userData,
              'token': token
            });
            self.router.navigate(['/dashboard']);
          } else {
            self.loading = false;
            self.toastr.error('Email or Password is incorrect!', 'Login unsuccessful!', { 'toastLife': 5000 });
            self.loginForm.reset();
          }
        },
        function (err) {
          self.loading = false;
          self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
        }
        );
    }
  }

  // on form submit, it checks validation rules for all fields
  validateAllFormFields(formGroup: (FormGroup | FormArray)) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.validateAllFormFields(control);
      }
    });
  }
}
