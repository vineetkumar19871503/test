"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var ui_kit_routing_module_1 = require("./ui-kit-routing.module");
var match_height_directive_1 = require("../shared/directives/match-height.directive");
var grids_component_1 = require("./grids/grids.component");
var typography_component_1 = require("./typography/typography.component");
var helper_classes_component_1 = require("./helper-classes/helper-classes.component");
var syntax_highlighter_component_1 = require("./syntax-highlighter/syntax-highlighter.component");
var text_utilities_component_1 = require("./text-utilities/text-utilities.component");
var feather_component_1 = require("./icons/feather/feather.component");
var font_awesome_component_1 = require("./icons/font-awesome/font-awesome.component");
var simple_line_component_1 = require("./icons/simple-line/simple-line.component");
;
var UIKitModule = (function () {
    function UIKitModule() {
    }
    UIKitModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                ui_kit_routing_module_1.UIKitRoutingModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                match_height_directive_1.MatchHeightModule
            ],
            declarations: [
                grids_component_1.GridsComponent,
                typography_component_1.TypographyComponent,
                helper_classes_component_1.HelperClassesComponent,
                syntax_highlighter_component_1.SyntaxHighlighterComponent,
                text_utilities_component_1.TextUtilitiesComponent,
                feather_component_1.FeatherComponent,
                font_awesome_component_1.FontAwesomeComponent,
                simple_line_component_1.SimpleLineComponent
            ]
        })
    ], UIKitModule);
    return UIKitModule;
}());
exports.UIKitModule = UIKitModule;
//# sourceMappingURL=ui-kit.module.js.map