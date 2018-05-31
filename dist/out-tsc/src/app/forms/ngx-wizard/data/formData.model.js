"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Wizard form data class Starts
var FormData = (function () {
    function FormData() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.work = '';
        this.street = '';
        this.city = '';
        this.state = '';
        this.zip = '';
    }
    FormData.prototype.clear = function () {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.work = '';
        this.street = '';
        this.city = '';
        this.state = '';
        this.zip = '';
    };
    return FormData;
}());
exports.FormData = FormData;
//Wizard form data class Ends
//Personal tab data class starts
var Personal = (function () {
    function Personal() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
    }
    return Personal;
}());
exports.Personal = Personal;
//Personal tab data class ends
//Address tab data class starts
var Address = (function () {
    function Address() {
        this.street = '';
        this.city = '';
        this.state = '';
        this.zip = '';
    }
    return Address;
}());
exports.Address = Address;
//Address tab data class Ends 
//# sourceMappingURL=formData.model.js.map