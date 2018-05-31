import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export default class HttpServices {
    private headers;
    constructor(
        private _authService: AuthService,
        private http: HttpClient,
    ) { }

    _updateHeaders() {
        this.headers = new HttpHeaders();
        this.headers = this.headers.append('Content-Type', 'application/json');
        this.headers = this.headers.append('Authorization', 'Bearer ' + this._authService.getUserData('token'));
    }

    checkSession(err) {
        err = err.error;
        if (err.status === 401 && err.message.toLowerCase() === 'user session expired') {
            this._authService.logout();
        }
    }

    get(url, params = null) {
        this._updateHeaders();
        const headers = this.headers,
            self = this;
        const query: any = { headers };
        if (params) {
            query.params = params;
        }
        return new Promise((resolve, reject) => {
            self.http.get(url, query)
                .subscribe(
                function (res: any) {
                    resolve(res);
                },
                function (err) {
                    self.checkSession(err);
                    reject(err);
                });
        });
    }

    post(url, data = {}, params = null) {
        this._updateHeaders();
        const headers = this.headers,
            self = this;
        const query: any = { headers };
        if (params) {
            query.params = params;
        }
        return new Promise((resolve, reject) => {
            self.http.post(url, data, query)
                .subscribe(
                function (res: any) {
                    resolve(res);
                },
                function (err) {
                    self.checkSession(err);
                    reject(err);
                });
        });
    }

    put(url, data = {}, params = null) {
        this._updateHeaders();
        const headers = this.headers,
            self = this;
        const query: any = { headers };
        if (params) {
            query.params = params;
        }
        return new Promise((resolve, reject) => {
            self.http.put(url, data, query)
                .subscribe(
                function (res: any) {
                    resolve(res);
                },
                function (err) {
                    self.checkSession(err);
                    reject(err);
                });
        });
    }
}
