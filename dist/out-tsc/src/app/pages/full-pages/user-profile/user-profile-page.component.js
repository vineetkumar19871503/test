"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var UserProfilePageComponent = (function () {
    function UserProfilePageComponent() {
        //Variable Declaration
        this.currentPage = "About";
    }
    UserProfilePageComponent.prototype.ngOnInit = function () {
        // Horizontal Timeline js for user timeline
        $.getScript('./assets/js/vertical-timeline.js');
    };
    UserProfilePageComponent.prototype.showPage = function (page) {
        this.currentPage = page;
    };
    UserProfilePageComponent = __decorate([
        core_1.Component({
            selector: 'app-user-profile-page',
            templateUrl: './user-profile-page.component.html',
            styleUrls: ['./user-profile-page.component.scss']
        })
    ], UserProfilePageComponent);
    return UserProfilePageComponent;
}());
exports.UserProfilePageComponent = UserProfilePageComponent;
//# sourceMappingURL=user-profile-page.component.js.map