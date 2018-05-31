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
var chat_service_1 = require("./chat.service");
var ChatComponent = (function () {
    function ChatComponent(elRef, chatService) {
        this.elRef = elRef;
        this.chatService = chatService;
        this.messages = new Array();
        this.item = 0;
        this.chat = chatService.chat1;
    }
    ChatComponent.prototype.ngOnInit = function () {
        $.getScript('./assets/js/chat.js');
    };
    //send button function calls
    ChatComponent.prototype.onAddMessage = function () {
        if (this.messageInputRef.nativeElement.value != "") {
            this.messages.push(this.messageInputRef.nativeElement.value);
        }
        this.messageInputRef.nativeElement.value = "";
        this.messageInputRef.nativeElement.focus();
    };
    //chat user list click event function
    ChatComponent.prototype.SetActive = function (event, chatId) {
        var hElement = this.elRef.nativeElement;
        //now you can simply get your elements with their class name
        var allAnchors = hElement.getElementsByClassName('list-group-item');
        //do something with selected elements
        [].forEach.call(allAnchors, function (item) {
            item.setAttribute('class', 'list-group-item no-border');
        });
        //set active class for selected item 
        event.currentTarget.setAttribute('class', 'list-group-item bg-blue-grey bg-lighten-5 border-right-primary border-right-2');
        this.messages = [];
        if (chatId === 'chat1') {
            this.chat = this.chatService.chat1;
        }
        else if (chatId === 'chat2') {
            this.chat = this.chatService.chat2;
        }
        else if (chatId === 'chat3') {
            this.chat = this.chatService.chat3;
        }
        else if (chatId === 'chat4') {
            this.chat = this.chatService.chat4;
        }
        else if (chatId === 'chat5') {
            this.chat = this.chatService.chat5;
        }
        else if (chatId === 'chat6') {
            this.chat = this.chatService.chat6;
        }
        else if (chatId === 'chat7') {
            this.chat = this.chatService.chat7;
        }
    };
    __decorate([
        core_1.ViewChild('messageInput'),
        __metadata("design:type", core_1.ElementRef)
    ], ChatComponent.prototype, "messageInputRef", void 0);
    ChatComponent = __decorate([
        core_1.Component({
            selector: 'app-chat',
            templateUrl: './chat.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            styleUrls: ['./chat.component.scss'],
            providers: [chat_service_1.ChatService]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, chat_service_1.ChatService])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map