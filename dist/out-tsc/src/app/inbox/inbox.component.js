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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var inbox_service_1 = require("./inbox.service");
var InboxComponent = (function () {
    function InboxComponent(elRef, modalService, inboxService) {
        this.elRef = elRef;
        this.modalService = modalService;
        this.inboxService = inboxService;
        this.isCollapsed = true;
        this.isCollapsed1 = false;
        this.isMessageSelected = true;
        this.mail = this.inboxService.inbox.filter(function (mail) { return mail.mailType === 'Inbox'; });
        this.message = this.inboxService.message.filter(function (message) { return message.mailId === 4; })[0];
    }
    InboxComponent.prototype.ngOnInit = function () {
        $.getScript('./assets/js/inbox.js');
    };
    //inbox user list click event function
    InboxComponent.prototype.DisplayMessage = function (event, mailId) {
        this.message = this.inboxService.message.filter(function (message) { return message.mailId.toString() === mailId.toString(); })[0];
        this.isMessageSelected = true;
        var hElement = this.elRef.nativeElement;
        //now you can simply get your elements with their class name
        var allAnchors = hElement.querySelectorAll('.users-list-padding > a.list-group-item');
        //do something with selected elements
        [].forEach.call(allAnchors, function (item) {
            item.setAttribute('class', 'list-group-item list-group-item-action no-border');
        });
        //set active class for selected item 
        event.currentTarget.setAttribute('class', 'list-group-item list-group-item-action bg-blue-grey bg-lighten-5 border-right-primary border-right-2');
    };
    //compose popup start
    InboxComponent.prototype.open = function (content) {
        var _this = this;
        this.modalService.open(content, { size: 'lg' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    InboxComponent.prototype.getDismissReason = function (reason) {
        if (reason === ng_bootstrap_1.ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ng_bootstrap_1.ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    //compose popup ends
    //inbox labels click event function
    InboxComponent.prototype.GetEmailsByLabel = function (event, labelType) {
        this.mail = this.inboxService.inbox.filter(function (mail) { return mail.labelType === labelType; });
        this.SetItemActive(event);
    };
    //inbox type click event function
    InboxComponent.prototype.GetEmailsByType = function (event, type) {
        this.mail = this.inboxService.inbox.filter(function (mail) { return mail.mailType === type; });
        this.SetItemActive(event);
    };
    //inbox Starred click event function
    InboxComponent.prototype.GetStarredEmails = function (event) {
        this.mail = this.inboxService.inbox.filter(function (mail) { return mail.isImportant === true; });
        this.SetItemActive(event);
    };
    InboxComponent.prototype.SetItemActive = function (event) {
        var hElement = this.elRef.nativeElement;
        //now you can simply get your elements with their class name
        var allAnchors = hElement.querySelectorAll('.list-group-messages > a.list-group-item');
        //do something with selected elements
        [].forEach.call(allAnchors, function (item) {
            item.setAttribute('class', 'list-group-item list-group-item-action no-border');
        });
        //set active class for selected item 
        event.currentTarget.setAttribute('class', 'list-group-item active no-border');
    };
    InboxComponent = __decorate([
        core_1.Component({
            selector: 'app-inbox',
            templateUrl: './inbox.component.html',
            styleUrls: ['./inbox.component.scss'],
            providers: [inbox_service_1.InboxService]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, ng_bootstrap_1.NgbModal, inbox_service_1.InboxService])
    ], InboxComponent);
    return InboxComponent;
}());
exports.InboxComponent = InboxComponent;
//# sourceMappingURL=inbox.component.js.map