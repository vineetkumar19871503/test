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
var gallery_page_component_1 = require("./gallery/gallery-page.component");
var invoice_page_component_1 = require("./invoice/invoice-page.component");
var horizontal_timeline_page_component_1 = require("./timeline/horizontal/horizontal-timeline-page.component");
var vertical_timeline_page_component_1 = require("./timeline/vertical/vertical-timeline-page.component");
var user_profile_page_component_1 = require("./user-profile/user-profile-page.component");
var search_component_1 = require("./search/search.component");
var faq_component_1 = require("./faq/faq.component");
var knowledge_base_component_1 = require("./knowledge-base/knowledge-base.component");
var routes = [
    {
        path: '',
        children: [
            {
                path: 'gallery',
                component: gallery_page_component_1.GalleryPageComponent,
                data: {
                    title: 'Gallery Page'
                }
            },
            {
                path: 'invoice',
                component: invoice_page_component_1.InvoicePageComponent,
                data: {
                    title: 'Invoice Page'
                }
            },
            {
                path: 'horizontaltimeline',
                component: horizontal_timeline_page_component_1.HorizontalTimelinePageComponent,
                data: {
                    title: 'Horizontal Timeline Page'
                }
            },
            {
                path: 'verticaltimeline',
                component: vertical_timeline_page_component_1.VerticalTimelinePageComponent,
                data: {
                    title: 'Vertical Timeline Page'
                }
            },
            {
                path: 'profile',
                component: user_profile_page_component_1.UserProfilePageComponent,
                data: {
                    title: 'User Profile Page'
                }
            },
            {
                path: 'search',
                component: search_component_1.SearchComponent,
                data: {
                    title: 'Search'
                }
            },
            {
                path: 'faq',
                component: faq_component_1.FaqComponent,
                data: {
                    title: 'FAQ'
                }
            },
            {
                path: 'kb',
                component: knowledge_base_component_1.KnowledgeBaseComponent,
                data: {
                    title: 'Knowledge Base'
                }
            }
        ]
    }
];
var FullPagesRoutingModule = (function () {
    function FullPagesRoutingModule() {
    }
    FullPagesRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule],
        })
    ], FullPagesRoutingModule);
    return FullPagesRoutingModule;
}());
exports.FullPagesRoutingModule = FullPagesRoutingModule;
//# sourceMappingURL=full-pages-routing.module.js.map