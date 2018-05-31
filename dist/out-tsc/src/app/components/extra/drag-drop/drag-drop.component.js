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
var ng2_dragula_1 = require("ng2-dragula");
var DragDropComponent = (function () {
    function DragDropComponent(dragulaService) {
        var _this = this;
        this.dragulaService = dragulaService;
        this.many = ['The', 'possibilities', 'are', 'endless!'];
        this.many2 = ['Explore', 'them'];
        this.groups = [
            {
                name: 'Group A',
                items: [{ name: 'Item A' }, { name: 'Item B' }, { name: 'Item C' }, { name: 'Item D' }]
            },
            {
                name: 'Group B',
                items: [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }, { name: 'Item 4' }]
            }
        ];
        this.thirdOptions = {
            removeOnSpill: true
        };
        this.fourthOptions = {
            revertOnSpill: true
        };
        this.fifthOptions = {
            copy: true
        };
        this.sixthOptions = {
            moves: function (el, container, handle) {
                return handle.className === 'handle';
            }
        };
        this.clicked = {
            'one': false,
            'two': false,
            'three': false,
            'four': false,
            'five': false,
            'six': false,
            'seven': false
        };
        dragulaService.drag.subscribe(function (value) {
            _this.onDrag(value.slice(1));
        });
        dragulaService.drop.subscribe(function (value) {
            _this.onDrop(value.slice(1));
        });
        dragulaService.over.subscribe(function (value) {
            _this.onOver(value.slice(1));
        });
        dragulaService.out.subscribe(function (value) {
            _this.onOut(value.slice(1));
        });
        dragulaService.dropModel.subscribe(function (value) {
            _this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe(function (value) {
            _this.onRemoveModel(value.slice(1));
        });
    }
    DragDropComponent.prototype.hasClass = function (el, name) {
        return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
    };
    DragDropComponent.prototype.addClass = function (el, name) {
        if (!this.hasClass(el, name)) {
            el.className = el.className ? [el.className, name].join(' ') : name;
        }
    };
    DragDropComponent.prototype.removeClass = function (el, name) {
        if (this.hasClass(el, name)) {
            el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
        }
    };
    DragDropComponent.prototype.onDrag = function (args) {
        var e = args[0];
        this.removeClass(e, 'ex-moved');
    };
    DragDropComponent.prototype.onDrop = function (args) {
        var e = args[0];
        this.addClass(e, 'ex-moved');
    };
    DragDropComponent.prototype.onOver = function (args) {
        var el = args[0];
        this.addClass(el, 'ex-over');
    };
    DragDropComponent.prototype.onOut = function (args) {
        var el = args[0];
        this.removeClass(el, 'ex-over');
    };
    DragDropComponent.prototype.onclick = function (key) {
        var _this = this;
        this.clicked[key] = true;
        setTimeout(function () {
            _this.clicked[key] = false;
        }, 2000);
    };
    DragDropComponent.prototype.onDropModel = function (args) {
        var el = args[0], target = args[1], source = args[2];
    };
    DragDropComponent.prototype.onRemoveModel = function (args) {
        var el = args[0], source = args[1];
    };
    DragDropComponent = __decorate([
        core_1.Component({
            selector: 'app-drag-drop',
            templateUrl: './drag-drop.component.html',
            styleUrls: ['./drag-drop.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [ng2_dragula_1.DragulaService])
    ], DragDropComponent);
    return DragDropComponent;
}());
exports.DragDropComponent = DragDropComponent;
//# sourceMappingURL=drag-drop.component.js.map