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
var ui_components_routing_module_1 = require("./ui-components-routing.module");
var nouislider_1 = require("ng2-nouislider/src/nouislider");
var ng2_file_upload_1 = require("ng2-file-upload/ng2-file-upload");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var http_1 = require("@angular/http");
var ngx_quill_1 = require("ngx-quill");
var ng2_dragula_1 = require("ng2-dragula");
var match_height_directive_1 = require("../shared/directives/match-height.directive");
var buttons_component_1 = require("./bootstrap/buttons/buttons.component");
var lists_component_1 = require("./bootstrap/lists/lists.component");
var alerts_component_1 = require("./bootstrap/alerts/alerts.component");
var sweet_alerts_component_1 = require("./extra/sweet-alerts/sweet-alerts.component");
var toastr_component_1 = require("./extra/toastr/toastr.component");
var nouislider_component_1 = require("./extra/nouislider/nouislider.component");
var badges_component_1 = require("./bootstrap/badges/badges.component");
var dropdowns_component_1 = require("./bootstrap/dropdowns/dropdowns.component");
var input_groups_component_1 = require("./bootstrap/input-groups/input-groups.component");
var media_objects_component_1 = require("./bootstrap/media-objects/media-objects.component");
var pagination_component_1 = require("./bootstrap/pagination/pagination.component");
var progress_component_1 = require("./bootstrap/progress/progress.component");
var modals_component_1 = require("./bootstrap/modals/modals.component");
var collapse_component_1 = require("./bootstrap/collapse/collapse.component");
var accordion_component_1 = require("./bootstrap/accordion/accordion.component");
var carousel_component_1 = require("./bootstrap/carousel/carousel.component");
var datepicker_component_1 = require("./bootstrap/datepicker/datepicker.component");
var popover_component_1 = require("./bootstrap/popover/popover.component");
var rating_component_1 = require("./bootstrap/rating/rating.component");
var tabs_component_1 = require("./bootstrap/tabs/tabs.component");
var timepicker_component_1 = require("./bootstrap/timepicker/timepicker.component");
var tooltip_component_1 = require("./bootstrap/tooltip/tooltip.component");
var typeahead_component_1 = require("./bootstrap/typeahead/typeahead.component");
var ng_buttons_component_1 = require("./bootstrap/ng-buttons/ng-buttons.component");
var upload_component_1 = require("./extra/upload/upload.component");
var editor_component_1 = require("./extra/editor/editor.component");
var drag_drop_component_1 = require("./extra/drag-drop/drag-drop.component");
var tour_component_1 = require("./extra/tour/tour.component");
var UIComponentsModule = (function () {
    function UIComponentsModule() {
    }
    UIComponentsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                ui_components_routing_module_1.UIComponentsRoutingModule,
                nouislider_1.NouisliderModule,
                ng2_file_upload_1.FileUploadModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.JsonpModule,
                ng_bootstrap_1.NgbModule,
                ngx_quill_1.QuillModule,
                ng2_dragula_1.DragulaModule,
                match_height_directive_1.MatchHeightModule
            ],
            declarations: [
                buttons_component_1.ButtonsComponent,
                lists_component_1.ListsComponent,
                alerts_component_1.AlertsComponent,
                sweet_alerts_component_1.SweetAlertsComponent,
                toastr_component_1.ToastrComponent,
                nouislider_component_1.NouiSliderComponent,
                badges_component_1.BadgesComponent,
                dropdowns_component_1.DropdownsComponent,
                input_groups_component_1.InputGroupsComponent,
                media_objects_component_1.MediaObjectsComponent,
                pagination_component_1.PaginationComponent,
                progress_component_1.ProgressBarsComponent,
                modals_component_1.ModalsComponent,
                collapse_component_1.CollapseComponent,
                accordion_component_1.AccordionComponent,
                carousel_component_1.CarouselComponent,
                datepicker_component_1.DatepickerComponent,
                popover_component_1.PopoverComponent,
                rating_component_1.RatingComponent,
                tabs_component_1.TabsComponent,
                timepicker_component_1.TimepickerComponent,
                tooltip_component_1.TooltipComponent,
                typeahead_component_1.TypeaheadComponent,
                modals_component_1.NgbdModalContent,
                ng_buttons_component_1.NgButtonsComponent,
                upload_component_1.UploadComponent,
                editor_component_1.EditorComponent,
                drag_drop_component_1.DragDropComponent,
                tour_component_1.TourComponent
            ],
            providers: [],
            entryComponents: [modals_component_1.NgbdModalContent]
        })
    ], UIComponentsModule);
    return UIComponentsModule;
}());
exports.UIComponentsModule = UIComponentsModule;
//# sourceMappingURL=ui-components.module.js.map