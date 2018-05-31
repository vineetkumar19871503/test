"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var chat_component_1 = require("./chat.component");
var routes = [
    {
        path: '',
        component: chat_component_1.ChatComponent,
        data: {
            title: 'Chat'
        },
    }
];
var ChatRoutingModule = (function () {
    function ChatRoutingModule() {
    }
    ChatRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule],
        })
    ], ChatRoutingModule);
    return ChatRoutingModule;
}());
exports.ChatRoutingModule = ChatRoutingModule;
exports.routedComponents = [chat_component_1.ChatComponent];
//# sourceMappingURL=chat-routing.module.js.map