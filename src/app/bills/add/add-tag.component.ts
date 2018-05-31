import { } from 'googlemaps';
import { ActivatedRoute, Router } from '@angular/router';
import CommonServices from '../../shared/services/CommonServices';
import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormControl, FormBuilder, FormArray, FormGroup, Validators, NgForm, AbstractControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import HttpServices from '../../shared/services/HttpServices';
import { MapsAPILoader } from '@agm/core';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { AuthService } from './../../shared/auth/auth.service';
const URL = environment.apiUrl + 'upload';
@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.scss']
})

export class AddTagComponent implements OnInit {
  // variables definition
  private apiMsg: String = 'Loading...';
  private error: String = '';
  private addTagForm: FormGroup;
  private truckTypes = this.commonServices.getTruckDetails();
  private _tempTruckTypes = [];
  private loading: boolean = false;
  private fileArray = [];
  private dataObj: any;
  private material_details: Object;

  private originLat: Number = 26.8070;
  private originLng: Number = 75.8098;
  private originName: String = null;
  private destinationLat: Number = 26.9601;
  private destinationName: String = null;
  private destinationLng: Number = 75.7758;
  private invalidTimeSelection = {};  // arrival time should not be greater than leave time for loading detail
  private invalidTimeSelectionUnLoad = {};  // arrival time should not be greater than leave time for un loading detail
  private loadingDisplayNetValue = {};
  private unLoadingDisplayNetValue = {};
  private adminNetTime;
  private chpNetTime;
  private invalidTimeSelectionAdminUse = false;
  private invalidTimeSelectionChp = false;
  private admin_start_time: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  private admin_stop_time: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  private admin_deduct_time: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  private chp_start_time: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  private chp_finish_time: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  private sign_out_time: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };

  private quarries: Object[] = [
    { 'name': 'Quarry1', 'value': 'quarry1' },
    { 'name': 'Quarry2', 'value': 'quarry2' },
    { 'name': 'Quarry3', 'value': 'quarry3' },
    { 'name': 'Quarry4', 'value': 'quarry4' }
  ];
  private url: string = environment.apiUrl + 'tags/add';
  private jobData = [];
  private jobObjId = '';
  private date;
  private customer_id;

  // public fileUploader: FileUploader = new FileUploader({ url: URL }); var
  public fileUploader: FileUploader = new FileUploader(
    {
      url: environment.apiUrl + 'upload',
      queueLimit: 1,
      allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf', 'application/msword', 'application/vnd.ms-excel', 'text/plain']
    });

  // constructor
  constructor(
    private activeRoute: ActivatedRoute,
    private commonServices: CommonServices,
    private _fb: FormBuilder,
    private httpService: HttpServices,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private titleService: Title,
    private toastr: ToastsManager,
    private authService: AuthService,
  ) {
    this.titleService.setTitle(environment.siteName + ' - Add Tag');
  }

  ngOnInit() {
    const self = this;

    self.activeRoute.params.subscribe(params => {
      if (params.id !== undefined) {

        self.jobObjId = params.id;
        self.date = params.date;
        this.customer_id = params.customer_id;
        this._getAllJobDetail(self.jobObjId);
      } else {
        // this.router.navigate(['/quotes/all']);
      }
    });

    this.truckTypes.map(function (tt: { name: '', value: '' }) {
      self._tempTruckTypes.push(tt.name);
    });

    // setting current position in map
    self._setCurrentPosition();

    // map api on load
    self.mapsAPILoader.load().then(() => {
      self._initAutocomplete(document.getElementById('origin'));
      // self._initAutocomplete(document.getElementById('destination'));
    });

    // form fields declaration
    this.addTagForm = this._fb.group({
      'truck': new FormControl(null),
      'trailer': new FormControl(null),
      'account_no': new FormControl(null),
      'sub_hauler': new FormControl(null),
      'prime_carrier': new FormControl(''),
      'customer_name': new FormControl({ value: '', disabled: true }),
      'material_charged_to': new FormControl(''),
      'job_id': new FormControl({ value: '', disabled: true }),
      'material': new FormControl(''),
      'origin': new FormControl(''),
      'destination': new FormControl(''),
      'truck_types': new FormControl(''),
      'tag_id': new FormControl('',[Validators.minLength(6),Validators.maxLength(6)]),
      'document': new FormControl(),
      'document_value': new FormControl(null),
      'material_details': this._fb.array([
        new FormGroup({
          'scale_tag_no': new FormControl(''),
          'yards': new FormControl(''),
          'weight': new FormControl(''),
        })
      ]),
      'loading_details': this._fb.array([]),
      'un_loading_time': this._fb.array([]),
      'admin_start_time': new FormControl('', (control: FormControl) => {
        const value = control.value;
        if (!value) {
          return null;
        }
        const pre_hour:any = (<FormArray>this.addTagForm.get('admin_stop_time').value.hour);
        const pre_minute:any = (<FormArray>this.addTagForm.get('admin_stop_time').value.minute);
        const durationInMinute = (((pre_hour * 60) + pre_minute) - ((value.hour * 60) + value.minute));
        
        const deduct_hour:any = (<FormArray>this.addTagForm.get('admin_deduct_time').value.hour);
        const deduct_minute:any = (<FormArray>this.addTagForm.get('admin_deduct_time').value.minute);
        const deductInMinute = (deduct_hour * 60) + deduct_minute;


        if (value.hour > pre_hour || (value.hour == pre_hour && value.minute > pre_minute) || (deductInMinute > durationInMinute)) {
          self.invalidTimeSelectionAdminUse = true;
          return { greaterThanArrivalNew: true };
        }
        self.invalidTimeSelectionAdminUse = false;
        (<FormArray>this.addTagForm.get('admin_stop_time')).setErrors(null);
        (<FormArray>this.addTagForm.get('admin_deduct_time')).setErrors(null);
        return null;
      }),
      'admin_stop_time': new FormControl('', (control: FormControl) => {
        const value = control.value;
        if (!value) {
          return null;
        }
        const pre_hour:any = (<FormArray>this.addTagForm.get('admin_start_time').value.hour);
        const pre_minute:any = (<FormArray>this.addTagForm.get('admin_start_time').value.minute);
        const durationInMinute = (((value.hour * 60) + value.minute) - ((pre_hour * 60) + pre_minute));

        const deduct_hour:any = (<FormArray>this.addTagForm.get('admin_deduct_time').value.hour);
        const deduct_minute:any = (<FormArray>this.addTagForm.get('admin_deduct_time').value.minute);
        const deductInMinute = (deduct_hour * 60) + deduct_minute;

        if (value.hour < pre_hour || (value.hour == pre_hour && value.minute < pre_minute) || (deductInMinute > durationInMinute)) {
          self.invalidTimeSelectionAdminUse = true;
          return { greaterThanArrivalNew: true };
        }
        self.invalidTimeSelectionAdminUse = false;
        (<FormArray>this.addTagForm.get('admin_start_time')).setErrors(null);
        (<FormArray>this.addTagForm.get('admin_deduct_time')).setErrors(null);
        return null;
      }),
      'admin_deduct_time': new FormControl('', (control: FormControl) => {
        const value = control.value;
        if (!value) {
          return null;
        }
        const pre_hour1:any = (<FormArray>this.addTagForm.get('admin_start_time').value.hour);
        const pre_minute1:any = (<FormArray>this.addTagForm.get('admin_start_time').value.minute);

        const pre_hour2:any = (<FormArray>this.addTagForm.get('admin_stop_time').value.hour);
        const pre_minute2:any = (<FormArray>this.addTagForm.get('admin_stop_time').value.minute);

        const durationInMinute = (((pre_hour2 * 60) + pre_minute2) - ((pre_hour1 * 60) + pre_minute1));

        const deduct_hour:any = (<FormArray>this.addTagForm.get('admin_deduct_time').value.hour);
        const deduct_minute:any = (<FormArray>this.addTagForm.get('admin_deduct_time').value.minute);
        const deductInMinute = (value.hour * 60) + value.minute;

        if (pre_hour2 < pre_hour1 || (pre_hour2 == pre_hour1 && pre_minute2 < pre_minute2) || (deductInMinute > durationInMinute)) {
          self.invalidTimeSelectionAdminUse = true;
          return { greaterThanArrivalNew: true };
        }
        self.invalidTimeSelectionAdminUse = false;
        (<FormArray>this.addTagForm.get('admin_start_time')).setErrors(null);
        (<FormArray>this.addTagForm.get('admin_stop_time')).setErrors(null);
        return null;
      }),
      'admin_net_time': new FormControl(''),
      'driver_name': new FormControl(''),
      'received_by': new FormControl(''),
      'sign_out_time': new FormControl('', (control: FormControl) => {
        const value = control.value;
        if (!value) {
          return null;
        }
        return null;
      }),
      'chp_start_time': new FormControl('', (control: FormControl) => {
        const value = control.value;
        if (!value) {
          return null;
        }
        const pre_hour:any = (<FormArray>this.addTagForm.get('chp_finish_time').value.hour);
        const pre_minute:any = (<FormArray>this.addTagForm.get('chp_finish_time').value.minute);

        if (value.hour > pre_hour || (value.hour == pre_hour && value.minute > pre_minute)) {
          self.invalidTimeSelectionChp = true;
          return { greaterThanArrivalNew: true };
        }
        self.invalidTimeSelectionChp = false;
        (<FormArray>this.addTagForm.get('chp_finish_time')).setErrors(null);
        return null;
      }),
      'chp_finish_time': new FormControl('', (control: FormControl) => {
        const value = control.value;
        if (!value) {
          return null;
        }
        const pre_hour:any = (<FormArray>this.addTagForm.get('chp_start_time').value.hour);
        const pre_minute:any = (<FormArray>this.addTagForm.get('chp_start_time').value.minute);

        if (value.hour < pre_hour || (value.hour == pre_hour && value.minute < pre_minute)) {
          self.invalidTimeSelectionChp = true;
          return { greaterThanArrivalNew: true };
        }
        self.invalidTimeSelectionChp = false;
        (<FormArray>this.addTagForm.get('chp_start_time')).setErrors(null);
        return null;
      }),
      'chp_total_time': new FormControl(''),

    });

    // adding one loading detail row by default
    self._addLoadingDetailRow();

    // adding one Un loading detail row by default
    self._addUnLoadingTimeRow();

    // this._initRequestDateFields();

    // File uploader handlers
    // On fiels adding file
    this.fileUploader.onWhenAddingFileFailed = (item, filter) => {
      switch (filter.name) {
        case 'mimeType':
          document.getElementById('document').classList.add('ng-invalid');
          this.toastr.error('Invalid File Upload', 'Error!', { 'toastLife': 5000 });
          break;
        case 'queueLimit':
          document.getElementById('document').classList.add('ng-invalid');
          this.toastr.error('Only 1 files upload at a time', 'Error!', { 'toastLife': 5000 });
          break;
        default:
          break;
      }
    };

    self.fileUploader.onAfterAddingFile = (fileItem) => {
      fileItem.withCredentials = false;
      const url = (window.URL) ? window.URL.createObjectURL(fileItem._file) : (window as any).webkitURL.createObjectURL(fileItem._file);
      document.getElementById('document').classList.remove('ng-invalid');
      self.addTagForm.patchValue({
        document_value: url
      });
    };

    // push file data to filearray once fileuploader item is completed
    self.fileUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      self.fileArray.push(response);
    };

    // add quote when file uploading is completed
    self.fileUploader.onCompleteAll = () => {
      self.dataObj.document = self.fileArray;
      self.addTag(self.dataObj);
    };
  }

  // initialize google map autocomplete for source/destination fields
  _initAutocomplete(ele) {
    const self = this,
      autocomplete = new google.maps.places.Autocomplete(ele, {
        types: ['address']
      });
    autocomplete.addListener('place_changed', () => {
      self.ngZone.run(() => {
        // get the place result
        const place: google.maps.places.PlaceResult = autocomplete.getPlace();
        // verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
        const lat = place.geometry.location.lat(),
          lng = place.geometry.location.lng(),
          addr = place.formatted_address;
        if (ele.id === 'origin') {
          self.originName = addr;
          self.originLat = lat;
          self.originLng = lng;
        } else if (ele.id === 'destination') {
          self.destinationName = addr;
          self.destinationLat = lat;
          self.destinationLng = lng;
        }
      });
    });
  }

  showImageIcon(image) {
    return /(?:\.([^.]+))?$/.exec(image)[1];
  }
  _removeFile(item){
    item.remove();
    if(this.fileUploader.queue.length <= 0){
      this.addTagForm.patchValue({
        document_value: ''
      });
    }
    
  }

  //get all job data
  private _getAllJobDetail(id) {
    const self = this;
    self.loading = true;
    // if (!date) {
    //   date = self.commonServices.getToday(true);
    // }
    // date = date.year + '-' + date.month + '-' + date.day;
    this.httpService.get(environment.apiUrl + 'sub_jobs' + '/getSubJobById', { id })
      .then(function (res: any) {
        self.loading = false;
        self.jobData = res.data[0];
        self.addTagForm.patchValue({ 'customer_name': self.jobData['customer'].org_name });
        self.addTagForm.patchValue({ 'job_id': self.jobData['customer_id'] + '-' + self.jobData['pjob_id'] + '-' + self.jobData['subjob_id'] });
      })
      .catch(function (err) {
        self.loading = false;
        self.apiMsg = '';
        self.error = 'Error occurred!';
      });
  }

  // gets the user location from browser and sets current location in google map
  _setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.originLat = this.destinationLat = position.coords.latitude;
        this.originLng = this.destinationLng = position.coords.longitude;
      });
    }
  }
  // do something when quarry dropdown changes
  onQuarryChange(event) {
    if (event) {
      this.destinationName = event;
    }
  }

  //add row for meterial detail
  _addMaterialDetailRow(e) {
    if (e) {
      e.preventDefault();
    }
    (<FormArray>this.addTagForm.get('material_details')).push(
      new FormGroup({
        'scale_tag_no': new FormControl(''),
        'yards': new FormControl(''),
        'weight': new FormControl(''),
      })
    );
  }

  //add row for loading detail
  _addLoadingDetailRow() {
    const arr = (<FormArray>this.addTagForm.get('loading_details')),
      newIndex = arr.length,
      self = this;
    arr.push(
      new FormGroup({
        'time_arrival': new FormControl(0, (control: FormControl) => {
          const value = control.value;
          if (!value) {
            return null;
          }
          const pre_hour = (<FormArray>this.addTagForm.get('loading_details').value[newIndex].time_leave) ? <FormArray>this.addTagForm.get('loading_details').value[newIndex].time_leave.hour : 0;
          const pre_minute = (<FormArray>this.addTagForm.get('loading_details').value[newIndex].time_leave) ? <FormArray>this.addTagForm.get('loading_details').value[newIndex].time_leave.minute : 0;
          if (value.hour > pre_hour || (value.hour == pre_hour && value.minute > pre_minute)) {
            self.invalidTimeSelection[newIndex] = true;
            return { greaterThanArrivalNew: true };
          }
          self.invalidTimeSelection[newIndex] = false;
          (<FormArray>this.addTagForm.get('loading_details')).at(newIndex).get('time_leave').setErrors(null);
          return null;
        }),
        'time_leave': new FormControl(0, (control: FormControl) => {
          const value = control.value;
          if (!value) {
            return null;
          }
          const loading_pre_hour = (<FormArray>this.addTagForm.get('loading_details').value[newIndex].time_arrival) ? <FormArray>this.addTagForm.get('loading_details').value[newIndex].time_arrival.hour : 0;
          const loading_pre_minute = (<FormArray>this.addTagForm.get('loading_details').value[newIndex].time_arrival) ? <FormArray>this.addTagForm.get('loading_details').value[newIndex].time_arrival.minute : 0;
          if (value.hour < loading_pre_hour || (value.hour == loading_pre_hour && value.minute < loading_pre_minute)) {
            // invalid time selection
            self.invalidTimeSelection[newIndex] = true;
            return { greaterThanArrival: true };
          }
          self.invalidTimeSelection[newIndex] = false;
          (<FormArray>this.addTagForm.get('loading_details')).at(newIndex).get('time_arrival').setErrors(null);
          return null;
        }),
        'net_stand_by': new FormControl(''),
      })
    );
    (<FormArray>this.addTagForm.get('loading_details')).at(newIndex).patchValue({
      time_arrival: {hour:0, minute:0,second:0},
      time_leave: {hour:0, minute:0,second:0}
    });
    return false;
  }

  //add row for loading detail
  _addUnLoadingTimeRow() {

    const arr = (<FormArray>this.addTagForm.get('un_loading_time')),
      newIndex = arr.length,
      self = this;
    arr.push(
      new FormGroup({
        'time_arrival': new FormControl(0, (control: FormControl) => {
          const value = control.value;
          if (!value) {
            return null;
          }
          const pre_hour = (<FormArray>this.addTagForm.get('un_loading_time').value[newIndex].time_leave) ? <FormArray>this.addTagForm.get('un_loading_time').value[newIndex].time_leave.hour : 0;
          const pre_minute = (<FormArray>this.addTagForm.get('un_loading_time').value[newIndex].time_leave) ? <FormArray>this.addTagForm.get('un_loading_time').value[newIndex].time_leave.minute : 0;
          if (value.hour > pre_hour || (value.hour == pre_hour && value.minute > pre_minute)) {
            self.invalidTimeSelectionUnLoad[newIndex] = true;
            return { greaterThanArrivalNew: true };
          }
          self.invalidTimeSelectionUnLoad[newIndex] = false;
          (<FormArray>this.addTagForm.get('un_loading_time')).at(newIndex).get('time_leave').setErrors(null);
          return null;
        }),
        'time_leave': new FormControl(0, (control: FormControl) => {
          const value = control.value;
          if (!value) {
            return null;
          }
          const loading_pre_hour = (<FormArray>this.addTagForm.get('un_loading_time').value[newIndex].time_arrival) ? <FormArray>this.addTagForm.get('un_loading_time').value[newIndex].time_arrival.hour : 0;
          const loading_pre_minute = (<FormArray>this.addTagForm.get('un_loading_time').value[newIndex].time_arrival) ? <FormArray>this.addTagForm.get('un_loading_time').value[newIndex].time_arrival.minute : 0;
          if (value.hour < loading_pre_hour || (value.hour == loading_pre_hour && value.minute < loading_pre_minute)) {
            self.invalidTimeSelectionUnLoad[newIndex] = true;
            return { greaterThanArrival: true };
          }
          self.invalidTimeSelectionUnLoad[newIndex] = false;
          (<FormArray>this.addTagForm.get('un_loading_time')).at(newIndex).get('time_arrival').setErrors(null);
          return null;
        }),
        'net_stand_by': new FormControl(''),
      })
    );
    (<FormArray>this.addTagForm.get('un_loading_time')).at(newIndex).patchValue({
      time_arrival: {hour:0, minute:0,second:0},
      time_leave: {hour:0, minute:0,second:0}
    });
    return false;
  }

  //remove row 
  _removeRows(thisData, formControlName, index) {
    if (confirm('Are you sure you want to remove?')) {
      const controlName = <FormArray>this.addTagForm.controls[formControlName];
      controlName.removeAt(index);
    }
    return false;
  }

  // calls the api to add Tag
  addTag(data) {
    const self = this;
    self.loading = true;

    this.httpService.post(this.url, data)
      .then(function (res: any) {
        self.loading = false;
        self.toastr.success(res.message, 'Success!', { 'toastLife': 5000 });
        self.addTagForm.reset();
        self.router.navigate(['/bills/tagsListByJobId', self.jobObjId, self.date, self.customer_id]);
      })
      .catch(function (err) {
        self.loading = false;
        self.toastr.error(err.error.message, 'Error!', { 'toastLife': 5000 });
      });
  }

  // do the needful on form submit
  onJobFormSubmit() {
    const self = this;
    const userDetails: any = self.authService.getUserData('user');
    self.commonServices.validateAllFormFields(this.addTagForm);
    if (this.addTagForm.valid) {
      // combining the address name, lat and lng into source and destination
      const formVal = Object.assign({}, this.addTagForm.getRawValue());

      formVal.origin = {
        'address': this.originName,
        'lat': this.originLat,
        'lng': this.originLng
      };
      if (this.originName) {
        formVal.origin.address = this.originName;
      }
      formVal.destination = {
        'address': this.destinationName,
        'lat': this.destinationLat,
        'lng': this.destinationLng
      };
      formVal.subjob_id = this.jobObjId;
      formVal.date = this.date;
      formVal.customer_id = this.customer_id;
      // if (this.destinationName) {
      //   formVal.destination.address = this.destinationName;
      // }
      if (!formVal.document_value) {
        this.dataObj = formVal;
        self.addTag(self.dataObj);
      } else {
        this.dataObj = formVal;
        this.fileUploader.uploadAll();
      }
    } else {
      this.toastr.error('There are some invalid fields in the form');
    }
  }

  cancel() {
    if (confirm('Are you sure you want to discard the changes')) {
      this.router.navigate(['/bills/tagsListByJobId', this.jobObjId, this.date, this.customer_id]);
    }
    return false;
  }

  _onTimerChange(event, indexObj, type) {
    const self = this;

    if (type == 'loadingTa') {
      const current_hour = (event) ? event.hour : 0;
      const current_minute = (event) ? event.minute : 0;

      const other_hour: any = (<FormArray>this.addTagForm.get('loading_details').value[indexObj].time_leave) ? <FormArray>this.addTagForm.get('loading_details').value[indexObj].time_leave.hour : 0;
      const other_minute: any = (<FormArray>this.addTagForm.get('loading_details').value[indexObj].time_leave) ? <FormArray>this.addTagForm.get('loading_details').value[indexObj].time_leave.minute : 0;

      const currentTotalMinute = (current_hour * 60) + current_minute;
      const otherTotalMinute = (other_hour * 60) + other_minute;

      const netTotalTime = ((otherTotalMinute - currentTotalMinute) > 0) ? otherTotalMinute - currentTotalMinute : 0;
      const hourString = Math.floor(netTotalTime / 60);
      const minuteString = (netTotalTime % 60);

      self.loadingDisplayNetValue[indexObj] = hourString + 'h' + ' ' + minuteString + 'm';
      (<FormArray>self.addTagForm.get('loading_details')).at(indexObj).patchValue({ 'net_stand_by': netTotalTime });

    }

    if (type == 'loadingLa') {
      const current_hour = (event) ? event.hour : 0;
      const current_minute = (event) ? event.minute : 0;

      const other_hour: any = (<FormArray>this.addTagForm.get('loading_details').value[indexObj].time_arrival) ? <FormArray>this.addTagForm.get('loading_details').value[indexObj].time_arrival.hour : 0;
      const other_minute: any = (<FormArray>this.addTagForm.get('loading_details').value[indexObj].time_arrival) ? <FormArray>this.addTagForm.get('loading_details').value[indexObj].time_arrival.minute : 0;

      const currentTotalMinute = (current_hour * 60) + current_minute;
      const otherTotalMinute = (other_hour * 60) + other_minute;

      const netTotalTime = ((currentTotalMinute - otherTotalMinute) > 0) ? currentTotalMinute - otherTotalMinute : 0;
      const hourString = Math.floor(netTotalTime / 60);
      const minuteString = (netTotalTime % 60);

      self.loadingDisplayNetValue[indexObj] = hourString + 'h' + ' ' + minuteString + 'm';
      (<FormArray>self.addTagForm.get('loading_details')).at(indexObj).patchValue({ 'net_stand_by': netTotalTime });

    }

    if (type == 'unloadingTa') {
      const current_hour = (event) ? event.hour : 0;
      const current_minute = (event) ? event.minute : 0;

      const other_hour: any = (<FormArray>this.addTagForm.get('un_loading_time').value[indexObj].time_leave) ? <FormArray>this.addTagForm.get('un_loading_time').value[indexObj].time_leave.hour : 0;
      const other_minute: any = (<FormArray>this.addTagForm.get('un_loading_time').value[indexObj].time_leave) ? <FormArray>this.addTagForm.get('un_loading_time').value[indexObj].time_leave.minute : 0;

      const currentTotalMinute = (current_hour * 60) + current_minute;
      const otherTotalMinute = (other_hour * 60) + other_minute;

      const netTotalTime = ((otherTotalMinute - currentTotalMinute) > 0) ? otherTotalMinute - currentTotalMinute : 0;
      const hourString = Math.floor(netTotalTime / 60);
      const minuteString = (netTotalTime % 60);

      self.unLoadingDisplayNetValue[indexObj] = hourString + 'h' + ' ' + minuteString + 'm';
      (<FormArray>self.addTagForm.get('un_loading_time')).at(indexObj).patchValue({ 'net_stand_by': netTotalTime });

    }

    if (type == 'unloadingLa') {
      const current_hour = (event) ? event.hour : 0;
      const current_minute = (event) ? event.minute : 0;

      const other_hour: any = (<FormArray>this.addTagForm.get('un_loading_time').value[indexObj].time_arrival) ? <FormArray>this.addTagForm.get('un_loading_time').value[indexObj].time_arrival.hour : 0;
      const other_minute: any = (<FormArray>this.addTagForm.get('un_loading_time').value[indexObj].time_arrival) ? <FormArray>this.addTagForm.get('un_loading_time').value[indexObj].time_arrival.minute : 0;

      const currentTotalMinute = (current_hour * 60) + current_minute;
      const otherTotalMinute = (other_hour * 60) + other_minute;

      const netTotalTime = ((currentTotalMinute - otherTotalMinute) > 0) ? currentTotalMinute - otherTotalMinute : 0;
      const hourString = Math.floor(netTotalTime / 60);
      const minuteString = (netTotalTime % 60);

      self.unLoadingDisplayNetValue[indexObj] = hourString + 'h' + ' ' + minuteString + 'm';
      (<FormArray>self.addTagForm.get('un_loading_time')).at(indexObj).patchValue({ 'net_stand_by': netTotalTime });

    }

    if (type == 'admin_start_time') {
      const current_hour = (event) ? event.hour : 0;
      const current_minute = (event) ? event.minute : 0;

      const other_hour: any = (<FormArray>this.addTagForm.get('admin_stop_time').value) ? <FormArray>this.addTagForm.get('admin_stop_time').value.hour : 0;
      const other_minute: any = (<FormArray>this.addTagForm.get('admin_stop_time').value) ? <FormArray>this.addTagForm.get('admin_stop_time').value.minute : 0;

      const deduct_hour: any = (<FormArray>this.addTagForm.get('admin_deduct_time').value) ? <FormArray>this.addTagForm.get('admin_deduct_time').value.hour : 0;
      const deduct_minute: any = (<FormArray>this.addTagForm.get('admin_deduct_time').value) ? <FormArray>this.addTagForm.get('admin_deduct_time').value.minute : 0;

      const currentTotalMinute = (current_hour * 60) + current_minute;
      const otherTotalMinute = (other_hour * 60) + other_minute;
      const deductTotalMinute = (deduct_hour * 60) + deduct_minute;

      const netTotalTime = ((otherTotalMinute - currentTotalMinute - deductTotalMinute) > 0) ? otherTotalMinute - currentTotalMinute - deductTotalMinute : 0;
      const hourString = Math.floor(netTotalTime / 60);
      const minuteString = (netTotalTime % 60);

      self.adminNetTime = hourString + 'h' + ' ' + minuteString + 'm';
      self.addTagForm.patchValue({ 'admin_net_time': netTotalTime });

    }

    if (type == 'admin_stop_time') {
      const current_hour = (event) ? event.hour : 0;
      const current_minute = (event) ? event.minute : 0;

      const other_hour: any = (<FormArray>this.addTagForm.get('admin_start_time').value) ? <FormArray>this.addTagForm.get('admin_start_time').value.hour : 0;
      const other_minute: any = (<FormArray>this.addTagForm.get('admin_start_time').value) ? <FormArray>this.addTagForm.get('admin_start_time').value.minute : 0;

      const deduct_hour: any = (<FormArray>this.addTagForm.get('admin_deduct_time').value) ? <FormArray>this.addTagForm.get('admin_deduct_time').value.hour : 0;
      const deduct_minute: any = (<FormArray>this.addTagForm.get('admin_deduct_time').value) ? <FormArray>this.addTagForm.get('admin_deduct_time').value.minute : 0;

      const currentTotalMinute = (current_hour * 60) + current_minute;
      const otherTotalMinute = (other_hour * 60) + other_minute;
      const deductTotalMinute = (deduct_hour * 60) + deduct_minute;

      const netTotalTime = ((currentTotalMinute - otherTotalMinute - deductTotalMinute) > 0) ? currentTotalMinute - otherTotalMinute - deductTotalMinute : 0;
      const hourString = Math.floor(netTotalTime / 60);
      const minuteString = (netTotalTime % 60);

      self.adminNetTime = hourString + 'h' + ' ' + minuteString + 'm';
      self.addTagForm.patchValue({ 'admin_net_time': netTotalTime });

    }

    if (type == 'admin_deduct_time') {
      const deduct_hour = (event) ? event.hour : 0;
      const deduct_minute = (event) ? event.minute : 0;

      const other_hour: any = (<FormArray>this.addTagForm.get('admin_start_time').value) ? <FormArray>this.addTagForm.get('admin_start_time').value.hour : 0;
      const other_minute: any = (<FormArray>this.addTagForm.get('admin_start_time').value) ? <FormArray>this.addTagForm.get('admin_start_time').value.minute : 0;

      const current_hour: any = (<FormArray>this.addTagForm.get('admin_stop_time').value) ? <FormArray>this.addTagForm.get('admin_stop_time').value.hour : 0;
      const current_minute: any = (<FormArray>this.addTagForm.get('admin_stop_time').value) ? <FormArray>this.addTagForm.get('admin_stop_time').value.minute : 0;

      const currentTotalMinute = (current_hour * 60) + current_minute;
      const otherTotalMinute = (other_hour * 60) + other_minute;
      const deductTotalMinute = (deduct_hour * 60) + deduct_minute;

      const netTotalTime = ((currentTotalMinute - otherTotalMinute - deductTotalMinute) > 0) ? currentTotalMinute - otherTotalMinute - deductTotalMinute : 0;
      const hourString = Math.floor(netTotalTime / 60);
      const minuteString = (netTotalTime % 60);

      self.adminNetTime = hourString + 'h' + ' ' + minuteString + 'm';
      self.addTagForm.patchValue({ 'admin_net_time': netTotalTime });

    }

    if (type == 'chp_start_time') {
      const current_hour = (event) ? event.hour : 0;
      const current_minute = (event) ? event.minute : 0;

      const other_hour: any = (<FormArray>this.addTagForm.get('chp_finish_time').value) ? <FormArray>this.addTagForm.get('chp_finish_time').value.hour : 0;
      const other_minute: any = (<FormArray>this.addTagForm.get('chp_finish_time').value) ? <FormArray>this.addTagForm.get('chp_finish_time').value.minute : 0;

      const currentTotalMinute = (current_hour * 60) + current_minute;
      const otherTotalMinute = (other_hour * 60) + other_minute;

      const netTotalTime = ((otherTotalMinute - currentTotalMinute) > 0) ? otherTotalMinute - currentTotalMinute : 0;
      const hourString = Math.floor(netTotalTime / 60);
      const minuteString = (netTotalTime % 60);

      self.chpNetTime = hourString + 'h' + ' ' + minuteString + 'm';
      self.addTagForm.patchValue({ 'chp_total_time': netTotalTime });

    }

    if (type == 'chp_finish_time') {
      const current_hour = (event) ? event.hour : 0;
      const current_minute = (event) ? event.minute : 0;

      const other_hour: any = (<FormArray>this.addTagForm.get('chp_start_time').value) ? <FormArray>this.addTagForm.get('chp_start_time').value.hour : 0;
      const other_minute: any = (<FormArray>this.addTagForm.get('chp_start_time').value) ? <FormArray>this.addTagForm.get('chp_start_time').value.minute : 0;

      const currentTotalMinute = (current_hour * 60) + current_minute;
      const otherTotalMinute = (other_hour * 60) + other_minute;

      const netTotalTime = ((currentTotalMinute - otherTotalMinute) > 0) ? currentTotalMinute - otherTotalMinute : 0;
      const hourString = Math.floor(netTotalTime / 60);
      const minuteString = (netTotalTime % 60);

      self.chpNetTime = hourString + 'h' + ' ' + minuteString + 'm';
      self.addTagForm.patchValue({ 'chp_total_time': netTotalTime });

    }

  }

}
