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
var forms_1 = require("@angular/forms");
var quill_editor_component_1 = require("ngx-quill/src/quill-editor.component");
// override p with div tag
var quill_1 = require("quill");
var Parchment = quill_1.default.import('parchment');
var Block = Parchment.query('block');
Block.tagName = 'DIV';
// or class NewBlock extends Block {}; NewBlock.tagName = 'DIV';
quill_1.default.register(Block /* or NewBlock */, true);
var counter_1 = require("./counter");
quill_1.default.register('modules/counter', counter_1.default);
var EditorComponent = (function () {
    function EditorComponent(fb) {
        //declarations
        this.title = 'Quill works!';
        this.hide = false;
        this.isReadOnly = false;
        this.form = fb.group({
            editor: ['test']
        });
    }
    EditorComponent.prototype.ngOnInit = function () {
        this.form
            .controls
            .editor
            .valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(function (data) {
            //your code here
        });
        this.editor
            .onContentChanged.debounceTime(400)
            .distinctUntilChanged()
            .subscribe(function (data) {
            //your code here
        });
    };
    //events starts
    EditorComponent.prototype.setFocus = function ($event) {
        $event.focus();
    };
    EditorComponent.prototype.patchValue = function () {
        this.form.controls['editor'].patchValue(this.form.controls['editor'].value + " patched!");
    };
    EditorComponent.prototype.toggleReadOnly = function () {
        this.isReadOnly = !this.isReadOnly;
    };
    EditorComponent.prototype.logChange = function ($event) {
        //your code here
    };
    EditorComponent.prototype.logSelection = function ($event) {
        //your code here
    };
    __decorate([
        core_1.ViewChild('editor'),
        __metadata("design:type", quill_editor_component_1.QuillEditorComponent)
    ], EditorComponent.prototype, "editor", void 0);
    EditorComponent = __decorate([
        core_1.Component({
            selector: 'app-editor',
            templateUrl: './editor.component.html',
            styleUrls: ['./editor.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder])
    ], EditorComponent);
    return EditorComponent;
}());
exports.EditorComponent = EditorComponent;
//# sourceMappingURL=editor.component.js.map