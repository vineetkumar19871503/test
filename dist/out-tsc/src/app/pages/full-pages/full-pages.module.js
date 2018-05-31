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
var full_pages_routing_module_1 = require("./full-pages-routing.module");
var ng_chartist_1 = require("ng-chartist");
var core_2 = require("@agm/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var gallery_page_component_1 = require("./gallery/gallery-page.component");
var invoice_page_component_1 = require("./invoice/invoice-page.component");
var horizontal_timeline_page_component_1 = require("./timeline/horizontal/horizontal-timeline-page.component");
var vertical_timeline_page_component_1 = require("./timeline/vertical/vertical-timeline-page.component");
var user_profile_page_component_1 = require("./user-profile/user-profile-page.component");
var search_component_1 = require("./search/search.component");
var faq_component_1 = require("./faq/faq.component");
var knowledge_base_component_1 = require("./knowledge-base/knowledge-base.component");
var FullPagesModule = (function () {
    function FullPagesModule() {
    }
    FullPagesModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                full_pages_routing_module_1.FullPagesRoutingModule,
                forms_1.FormsModule,
                ng_chartist_1.ChartistModule,
                core_2.AgmCoreModule,
                ng_bootstrap_1.NgbModule
            ],
            declarations: [
                gallery_page_component_1.GalleryPageComponent,
                invoice_page_component_1.InvoicePageComponent,
                horizontal_timeline_page_component_1.HorizontalTimelinePageComponent,
                vertical_timeline_page_component_1.VerticalTimelinePageComponent,
                user_profile_page_component_1.UserProfilePageComponent,
                search_component_1.SearchComponent,
                faq_component_1.FaqComponent,
                knowledge_base_component_1.KnowledgeBaseComponent
            ]
        })
    ], FullPagesModule);
    return FullPagesModule;
}());
exports.FullPagesModule = FullPagesModule;
//# sourceMappingURL=full-pages.module.js.map