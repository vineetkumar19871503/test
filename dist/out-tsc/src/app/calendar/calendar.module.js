"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var angular_calendar_1 = require("angular-calendar");
var calendar_routing_module_1 = require("./calendar-routing.module");
var calendar_component_1 = require("./calendar.component");
var date_time_picker_component_1 = require("./date-time-picker.component");
var CalendarsModule = (function () {
    function CalendarsModule() {
    }
    CalendarsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                calendar_routing_module_1.CalendarRoutingModule,
                angular_calendar_1.CalendarModule.forRoot(),
                ng_bootstrap_1.NgbModalModule.forRoot(),
                ng_bootstrap_1.NgbDatepickerModule.forRoot(),
                ng_bootstrap_1.NgbTimepickerModule.forRoot(),
                forms_1.FormsModule
            ],
            declarations: [
                calendar_component_1.CalendarsComponent,
                date_time_picker_component_1.DateTimePickerComponent
            ]
        })
    ], CalendarsModule);
    return CalendarsModule;
}());
exports.CalendarsModule = CalendarsModule;
//# sourceMappingURL=calendar.module.js.map