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
var taskboard_service_1 = require("./taskboard.service");
var TaskboardComponent = (function () {
    function TaskboardComponent(elRef, taskBoardService) {
        this.elRef = elRef;
        this.taskBoardService = taskBoardService;
        this.todo = taskBoardService.todo;
        this.inProcess = taskBoardService.inProcess;
        this.backLog = taskBoardService.backLog;
        this.completed = taskBoardService.completed;
    }
    TaskboardComponent.prototype.onAddTask = function () {
        if (this.messageInputRef.nativeElement.value != "" && this.titleInputRef.nativeElement.value != "") {
            this.taskBoardService.addNewTask(this.titleInputRef.nativeElement.value, this.messageInputRef.nativeElement.value);
            this.todo = this.taskBoardService.gettodo();
        }
        this.titleInputRef.nativeElement.value = "";
        this.messageInputRef.nativeElement.value = "";
        this.titleInputRef.nativeElement.focus();
    };
    __decorate([
        core_1.ViewChild('todoTitle'),
        __metadata("design:type", core_1.ElementRef)
    ], TaskboardComponent.prototype, "titleInputRef", void 0);
    __decorate([
        core_1.ViewChild('todoMessage'),
        __metadata("design:type", core_1.ElementRef)
    ], TaskboardComponent.prototype, "messageInputRef", void 0);
    TaskboardComponent = __decorate([
        core_1.Component({
            selector: 'app-taskboard',
            templateUrl: './taskboard.component.html',
            styleUrls: ['./taskboard.component.scss'],
            providers: [taskboard_service_1.TaskBoardService],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, taskboard_service_1.TaskBoardService])
    ], TaskboardComponent);
    return TaskboardComponent;
}());
exports.TaskboardComponent = TaskboardComponent;
//# sourceMappingURL=taskboard.component.js.map