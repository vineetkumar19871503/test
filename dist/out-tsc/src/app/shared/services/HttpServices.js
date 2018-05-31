"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_service_1 = require("../auth/auth.service");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var HttpServices = (function () {
    function HttpServices(_authService, http) {
        this._authService = _authService;
        this.http = http;
    }
    HttpServices.prototype._updateHeaders = function () {
        this.headers = new http_1.HttpHeaders();
        this.headers = this.headers.append('Content-Type', 'application/json');
        this.headers = this.headers.append('Authorization', 'Bearer ' + this._authService.getUserData('token'));
    };
    HttpServices.prototype.checkSession = function (err) {
        err = err.error;
        if (err.status === 401 && err.message.toLowerCase() === 'user session expired') {
            this._authService.logout();
        }
    };
    HttpServices.prototype.get = function (url, params) {
        if (params === void 0) { params = null; }
        this._updateHeaders();
        var headers = this.headers, self = this;
        var query = { headers: headers };
        if (params) {
            query.params = params;
        }
        return new Promise(function (resolve, reject) {
            self.http.get(url, query)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                self.checkSession(err);
                reject(err);
            });
        });
    };
    HttpServices.prototype.post = function (url, data, params) {
        if (data === void 0) { data = {}; }
        if (params === void 0) { params = null; }
        this._updateHeaders();
        var headers = this.headers, self = this;
        var query = { headers: headers };
        if (params) {
            query.params = params;
        }
        return new Promise(function (resolve, reject) {
            self.http.post(url, data, query)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                self.checkSession(err);
                reject(err);
            });
        });
    };
    HttpServices.prototype.put = function (url, data, params) {
        if (data === void 0) { data = {}; }
        if (params === void 0) { params = null; }
        this._updateHeaders();
        var headers = this.headers, self = this;
        var query = { headers: headers };
        if (params) {
            query.params = params;
        }
        return new Promise(function (resolve, reject) {
            self.http.put(url, data, query)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                self.checkSession(err);
                reject(err);
            });
        });
    };
    HttpServices = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [auth_service_1.AuthService,
            http_1.HttpClient])
    ], HttpServices);
    return HttpServices;
}());
exports.default = HttpServices;
//# sourceMappingURL=HttpServices.js.map