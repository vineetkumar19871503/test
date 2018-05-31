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
var chat_model_1 = require("./chat.model");
var ChatService = (function () {
    function ChatService() {
        this.chat1 = [
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'How can we help? We are here for you!'
            ], 'text'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-3.png', '1 hour ago', [
                'Hey John, I am looking for the best admin template.',
                'Could you please help me to find it out?',
                'It should be angular 5 bootstrap compatible.'
            ], 'text'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '30 minutes ago', [
                'Absolutely!',
                'Apex admin is the responsive angular 5 bootstrap admin template.'
            ], 'text'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-3.png', '20 minutes ago', [
                'Can you provide me audio link?'
            ], 'text'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'http://static.videogular.com/assets/audios/videogular.mp3'
            ], 'audio'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-3.png', '10 minutes ago', [
                'Can you provide me video link?'
            ], 'text'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'http://static.videogular.com/assets/videos/videogular.mp4'
            ], 'video'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-3.png', 'just now', [
                'Looks clean and fresh UI.',
                'It is perfect for my next project.',
                'How can I purchase it?'
            ], 'text'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'Thanks, from ThemeForest.'
            ], 'text'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-3.png', '', [
                'I will purchase it for sure.',
                'Thanks.'
            ], 'text'),
        ];
        this.chat2 = [
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'How can we help'
            ], 'text'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-7.png', '1 hours ago', [
                'Hi, I spoke with a representative yesterday.',
                'he gave me some steps to fix my problem',
                'but they didn’t help.'
            ], 'text'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '20 minutes ago', [
                'Can you provide me audio link of your conversation?'
            ], 'text'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-7.png', '', [
                'http://static.videogular.com/assets/audios/videogular.mp3'
            ], 'audio'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '10 minutes ago', [
                'Can you provide me video link of your issue?'
            ], 'text'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-7.png', '', [
                'http://static.videogular.com/assets/videos/videogular.mp4'
            ], 'video'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'I’m sorry to hear that',
                'Can I ask which model of projector you own?',
                'What steps did he suggest you to take?',
                'What sort of issue are you having?'
            ], 'text'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-7.png', '', [
                'An issue with the power.'
            ], 'text'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'Did you make sure the outlet you plugged it into was functional.'
            ], 'text'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-7.png', '', [
                'Yes'
            ], 'text'),
        ];
        this.chat3 = [
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'How can we help'
            ], 'text'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-8.png', '1 hours ago', [
                'Hey John, I am looking for the best admin template.',
                'Could you please help me to find it out?',
                'It should be angular 5 bootstrap compatible.'
            ], 'text'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'Absolutely!',
                'Apex admin is the responsive angular 5 bootstrap admin template.'
            ], 'text'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-8.png', '20 minutes ago', [
                'Can you provide me audio link?'
            ], 'text'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'http://static.videogular.com/assets/audios/videogular.mp3'
            ], 'audio'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-8.png', '10 minutes ago', [
                'Can you provide me video link?'
            ], 'text'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'http://static.videogular.com/assets/videos/videogular.mp4'
            ], 'video'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-8.png', '', [
                'Looks clean and fresh UI.',
                'It is perfect for my next project.',
                'How can I purchase it?'
            ], 'text'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'Thanks, from ThemeForest.'
            ], 'text'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-8.png', '', [
                'I will purchase it for sure.',
                'Thanks.'
            ], 'text'),
        ];
        this.chat4 = [
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'How can we help'
            ], 'text'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-5.png', '1 hours ago', [
                'Hi, I spoke with a representative yesterday.',
                'he gave me some steps to fix my problem',
                'but they didn’t help.'
            ], 'text'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '20 minutes ago', [
                'Can you provide me audio link of your conversation?'
            ], 'text'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-5.png', '', [
                'http://static.videogular.com/assets/audios/videogular.mp3'
            ], 'audio'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '10 minutes ago', [
                'Can you provide me video link of your issue?'
            ], 'text'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-5.png', '', [
                'http://static.videogular.com/assets/videos/videogular.mp4'
            ], 'video'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'I’m sorry to hear that',
                'Can I ask which model of projector you own?',
                'What steps did he suggest you to take?',
                'What sort of issue are you having?'
            ], 'text'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-5.png', '', [
                'An issue with the power.'
            ], 'text'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'Did you make sure the outlet you plugged it into was functional.'
            ], 'text'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-5.png', '', [
                'Yes'
            ], 'text'),
        ];
        this.chat5 = [
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'How can we help'
            ], 'text'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-9.png', '1 hours ago', [
                'Hey John, I am looking for the best admin template.',
                'Could you please help me to find it out?',
                'It should be angular 5 bootstrap compatible.'
            ], 'text'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'Absolutely!',
                'Apex admin is the responsive angular 5 bootstrap admin template.'
            ], 'text'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-9.png', '20 minutes ago', [
                'Can you provide me audio link?'
            ], 'text'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'http://static.videogular.com/assets/audios/videogular.mp3'
            ], 'audio'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-9.png', '10 minutes ago', [
                'Can you provide me video link?'
            ], 'text'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'http://static.videogular.com/assets/videos/videogular.mp4'
            ], 'video'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-9.png', '', [
                'Looks clean and fresh UI.',
                'It is perfect for my next project.',
                'How can I purchase it?'
            ], 'text'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'Thanks, from ThemeForest.'
            ], 'text'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-9.png', '', [
                'I will purchase it for sure.',
                'Thanks.'
            ], 'text'),
        ];
        this.chat6 = [
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'How can we help'
            ], 'text'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-4.png', '1 hours ago', [
                'Hi, I spoke with a representative yesterday.',
                'he gave me some steps to fix my problem',
                'but they didn’t help.'
            ], 'text'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '20 minutes ago', [
                'Can you provide me audio link of your conversation?'
            ], 'text'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-4.png', '', [
                'http://static.videogular.com/assets/audios/videogular.mp3'
            ], 'audio'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '10 minutes ago', [
                'Can you provide me video link of your issue?'
            ], 'text'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-4.png', '', [
                'http://static.videogular.com/assets/videos/videogular.mp4'
            ], 'video'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'I’m sorry to hear that',
                'Can I ask which model of projector you own?',
                'What steps did he suggest you to take?',
                'What sort of issue are you having?'
            ], 'text'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-4.png', '', [
                'An issue with the power.'
            ], 'text'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'Did you make sure the outlet you plugged it into was functional.'
            ], 'text'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-4.png', '', [
                'Yes'
            ], 'text'),
        ];
        this.chat7 = [
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'How can we help'
            ], 'text'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-14.png', '1 hours ago', [
                'Hey John, I am looking for the best admin template.',
                'Could you please help me to find it out?',
                'It should be angular 4 bootstrap compatible.'
            ], 'text'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'Absolutely!',
                'Apex admin is the responsive angular 4 bootstrap admin template.'
            ], 'text'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-14.png', '20 minutes ago', [
                'Can you provide me audio link?'
            ], 'text'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'http://static.videogular.com/assets/audios/videogular.mp3'
            ], 'audio'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-14.png', '10 minutes ago', [
                'Can you provide me video link?'
            ], 'text'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'http://static.videogular.com/assets/videos/videogular.mp4'
            ], 'video'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-14.png', '', [
                'Looks clean and fresh UI.',
                'It is perfect for my next project.',
                'How can I purchase it?'
            ], 'text'),
            new chat_model_1.Chat('right', 'chat', 'assets/img/portrait/small/avatar-s-1.png', '', [
                'Thanks, from ThemeForest.'
            ], 'text'),
            new chat_model_1.Chat('left', 'chat chat-left', 'assets/img/portrait/small/avatar-s-14.png', '', [
                'I will purchase it for sure.',
                'Thanks.'
            ], 'text'),
        ];
    }
    ChatService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], ChatService);
    return ChatService;
}());
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map