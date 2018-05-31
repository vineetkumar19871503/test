import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import * as moment from 'moment';

@Injectable()
export default class CommonServices {
    private _tz = -(new Date().getTimezoneOffset());
    constructor() { }
    // validates all fields at a time
    validateAllFormFields(formGroup: (FormGroup | FormArray)) {
        const self = this;
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup || control instanceof FormArray) {
                self.validateAllFormFields(control);
            }
        });
    }

    noWhitespaceValidator(control: FormControl) {
        const isWhitespace = (control.value || '').trim().length === 0,
            isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    }

    disableAllFormFields(formGroup: (FormGroup | FormArray)) {
        const self = this;
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.disable();
            } else if (control instanceof FormGroup || control instanceof FormArray) {
                self.disableAllFormFields(control);
            }
        });
    }

    compareDates(date1, operator = 'eq', date2?, dateOnly = false) {
        if (!date2) {
            date2 = new Date();
            date2.setHours(0, 0, 0, 0);
        }
        let dt1: any = moment(date1),
            dt2: any = moment(date2);
        if (dateOnly) {
            dt1 = moment(date1).format('YYYY-MM-DD');
            dt2 = moment(date2).format('YYYY-MM-DD');
        }
        let res = false;
        switch (operator) {
            case 'eq': res = dt1 === dt2; break;    // equals to
            case 'ne': res = dt1 !== dt2; break;    // not equals to
            case 'gt': res = dt1 > dt2; break;  // greater than
            case 'lt': res = dt1 < dt2; break;  // less than
            case 'gte': res = dt1 >= dt2; break;    // greater than equals to
            case 'lte': res = dt1 <= dt2; break;    // less than equals to
        }
        return res;
    }

    convertToDate(date) {
        return new Date(date);
    }

    // takes y m d h m s in object and convert into date object
    convertObjToDate(date, defaultDate: any = { year: 2000, month: 1, day: 1, h: 0, m: 0, s: 0 }, tz?) {
        date = Object.assign({}, defaultDate, date);
        date = new Date(date.year, date.month - 1, date.day, date.h, date.m, date.s);
        if (tz) {
            date.setMinutes(date.getMinutes() + this._tz);
        }
        return date;
    }

    extractDate(date) {
        const dt: any = moment(new Date(date), 'YYYY/MM/DD');
        return {
            'day': parseInt(dt.format('D'), 10),
            'month': parseInt(dt.format('M'), 10),
            'year': parseInt(dt.format('YYYY'), 10)
        }
    }

    convertMinToHours(min: any) {
        return {
            h: Math.floor(min / 60),
            m: parseInt(min, 10) % 60
        }
    }

    getToday(extract = false) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (extract) {
            return {
                'year': today.getFullYear(),
                'month': today.getMonth() + 1,
                'day': today.getDate()
            };
        }
        return today;
    }
    getTruckDetails() {
        return [
            { 'name': 'Ten-Wheeler', 'value': 'TW' },
            { 'name': 'Super Dumps', 'value': 'SD' },
            { 'name': 'End Dumps', 'value': 'ED' },
            { 'name': 'Doubles Bottoms', 'value': 'DB' },
            { 'name': 'Transfers', 'value': 'TS' },
            { 'name': 'Highsides', 'value': 'HS' },
            //  { 'name': 'Flatbeds', 'value': 'FB' },
        ];
    }
    // filters the data of ngx datatable based on search key
    filterTableData(key, rows, tableRef, minChars = 2, excludeCols = []) {
        const self = this;
        if (tableRef && key.length >= minChars) {
            const cols = tableRef.columns ? tableRef.columns : self._extractTableColumns(tableRef.bodyComponent.columns);
            return rows.filter(function (r) {
                // let keyMatched = false;
                for (let cl = 0; cl < cols.length; cl++) {
                    const col = cols[cl];
                    if (excludeCols.indexOf(col) === -1 && self.matchSubstrInString(self.accessObjEleByString(r, col), key)) {
                        return r;
                    }
                }
            });
        } else if (key.length <= minChars) {
            return rows;
        }
    }
    _extractTableColumns(cols) {
        return cols.map(function (c) {
            return c.prop;
        })
    }

    // get nested object value by keys string (eg.'part3[0].name')
    accessObjEleByString(obj, key) {
        key = key.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        key = key.replace(/^\./, '');           // strip a leading dot
        const a = key.split('.');
        for (let i = 0, n = a.length; i < n; ++i) {
            const k = a[i];
            if (k in obj) {
                obj = obj[k];
            } else {
                return;
            }
        }
        return obj;
    }

    // check whether a string contains given substring or not
    matchSubstrInString(_str = null, _substr = null, matchCase = false) {
        // converting the _str to string for matching as the data type of _str can be any
        _str = _str !== null ? _str.toString() : _str;
        if (typeof _str === 'string' && typeof _substr === 'string') {
            _str = matchCase ? _str : _str.toLowerCase();
            _substr = matchCase ? _substr : _substr.toLowerCase();
            return _str.indexOf(_substr) !== -1;
        }
        return false;
    }
}
