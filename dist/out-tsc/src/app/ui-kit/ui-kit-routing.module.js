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
var grids_component_1 = require("./grids/grids.component");
var typography_component_1 = require("./typography/typography.component");
var helper_classes_component_1 = require("./helper-classes/helper-classes.component");
var syntax_highlighter_component_1 = require("./syntax-highlighter/syntax-highlighter.component");
var text_utilities_component_1 = require("./text-utilities/text-utilities.component");
var feather_component_1 = require("./icons/feather/feather.component");
var font_awesome_component_1 = require("./icons/font-awesome/font-awesome.component");
var simple_line_component_1 = require("./icons/simple-line/simple-line.component");
var routes = [
    {
        path: '',
        children: [
            {
                path: 'grids',
                component: grids_component_1.GridsComponent,
                data: {
                    title: 'Grids'
                }
            },
            {
                path: 'typography',
                component: typography_component_1.TypographyComponent,
                data: {
                    title: 'Typography'
                }
            },
            {
                path: 'textutilities',
                component: text_utilities_component_1.TextUtilitiesComponent,
                data: {
                    title: 'Text Utilities'
                }
            },
            {
                path: 'syntaxhighlighter',
                component: syntax_highlighter_component_1.SyntaxHighlighterComponent,
                data: {
                    title: 'Syntax Highlighter'
                }
            },
            {
                path: 'helperclasses',
                component: helper_classes_component_1.HelperClassesComponent,
                data: {
                    title: 'Helper Classes'
                }
            },
            {
                path: 'feather',
                component: feather_component_1.FeatherComponent,
                data: {
                    title: 'Feather Icons'
                }
            },
            {
                path: 'font-awesome',
                component: font_awesome_component_1.FontAwesomeComponent,
                data: {
                    title: 'Font Awesome'
                }
            },
            {
                path: 'simple-line',
                component: simple_line_component_1.SimpleLineComponent,
                data: {
                    title: 'Simple Line'
                }
            },
        ]
    }
];
var UIKitRoutingModule = (function () {
    function UIKitRoutingModule() {
    }
    UIKitRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule],
        })
    ], UIKitRoutingModule);
    return UIKitRoutingModule;
}());
exports.UIKitRoutingModule = UIKitRoutingModule;
//# sourceMappingURL=ui-kit-routing.module.js.map