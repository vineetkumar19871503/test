"use strict";
/**
 * Injectable auth service
 */
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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var AuthService = (function () {
    function AuthService(router) {
        this.router = router;
    }
    // store user data in local storage when login
    AuthService.prototype.login = function (data) {
        localStorage.setItem('userData', JSON.stringify(data));
    };
    // clear the local storage when logout
    AuthService.prototype.logout = function () {
        localStorage.removeItem('userData');
        var self = this;
        setTimeout(function () {
            self.router.navigate(['/users/login']);
        }, 500);
    };
    // get the user data from local storage
    AuthService.prototype.getUserData = function (key) {
        if (key === void 0) { key = null; }
        var userData = localStorage.getItem('userData');
        if (userData) {
            userData = JSON.parse(userData);
            if (userData[key] !== undefined) {
                return userData[key];
            }
            return userData;
        }
        return null;
    };
    // return true if user data found in local storage
    AuthService.prototype.isAuthenticated = function () {
        var userData = localStorage.getItem('userData');
        return userData !== null && userData !== '' && userData.length > 0;
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map