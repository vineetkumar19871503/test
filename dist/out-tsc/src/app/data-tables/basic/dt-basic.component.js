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
var core_1 = require("@angular/core");
var data = require('../../shared/data/company.json');
var DTBasicComponent = (function () {
    function DTBasicComponent() {
        var _this = this;
        this.rows = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        // DataTable Content Titles
        this.columns = [
            { prop: 'name' },
            { name: 'Gender' },
            { name: 'Company' }
        ];
        this.rows = data;
        setTimeout(function () { _this.loadingIndicator = false; }, 1500);
    }
    DTBasicComponent = __decorate([
        core_1.Component({
            selector: 'app-dt-basic',
            templateUrl: './dt-basic.component.html',
            styleUrls: ['./dt-basic.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], DTBasicComponent);
    return DTBasicComponent;
}());
exports.DTBasicComponent = DTBasicComponent;
//# sourceMappingURL=dt-basic.component.js.map