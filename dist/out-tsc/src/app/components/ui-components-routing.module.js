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
var routes = [
    {
        path: '',
        children: [
            {
                path: 'buttons',
                component: buttons_component_1.ButtonsComponent,
                data: {
                    title: 'Buttons'
                }
            },
            {
                path: 'lists',
                component: lists_component_1.ListsComponent,
                data: {
                    title: 'Lists'
                }
            },
            {
                path: 'alerts',
                component: alerts_component_1.AlertsComponent,
                data: {
                    title: 'Alerts'
                }
            },
            {
                path: 'sweetalerts',
                component: sweet_alerts_component_1.SweetAlertsComponent,
                data: {
                    title: 'Sweet Alerts'
                }
            },
            {
                path: 'toastr',
                component: toastr_component_1.ToastrComponent,
                data: {
                    title: 'Toastr'
                }
            },
            {
                path: 'nouislider',
                component: nouislider_component_1.NouiSliderComponent,
                data: {
                    title: 'NoUI Slider'
                }
            },
            {
                path: 'editor',
                component: editor_component_1.EditorComponent,
                data: {
                    title: 'Quill Editor'
                }
            },
            {
                path: 'upload',
                component: upload_component_1.UploadComponent,
                data: {
                    title: 'Upload'
                }
            },
            {
                path: 'dragndrop',
                component: drag_drop_component_1.DragDropComponent,
                data: {
                    title: 'Drag and Drop'
                }
            },
            {
                path: 'tour',
                component: tour_component_1.TourComponent,
                data: {
                    title: 'Tour'
                }
            },
            {
                path: 'badges',
                component: badges_component_1.BadgesComponent,
                data: {
                    title: 'Badges'
                }
            },
            {
                path: 'dropdowns',
                component: dropdowns_component_1.DropdownsComponent,
                data: {
                    title: 'Dropdowns'
                }
            },
            {
                path: 'inputgroups',
                component: input_groups_component_1.InputGroupsComponent,
                data: {
                    title: 'Input Groups'
                }
            },
            {
                path: 'media',
                component: media_objects_component_1.MediaObjectsComponent,
                data: {
                    title: 'Media Objects'
                }
            },
            {
                path: 'pagination',
                component: pagination_component_1.PaginationComponent,
                data: {
                    title: 'Pagination'
                }
            },
            {
                path: 'progress',
                component: progress_component_1.ProgressBarsComponent,
                data: {
                    title: 'Progress Bars'
                }
            },
            {
                path: 'models',
                component: modals_component_1.ModalsComponent,
                data: {
                    title: 'Models'
                }
            },
            {
                path: 'collapse',
                component: collapse_component_1.CollapseComponent,
                data: {
                    title: 'Collapse'
                }
            },
            {
                path: 'accordion',
                component: accordion_component_1.AccordionComponent,
                data: {
                    title: 'Accordion'
                }
            },
            {
                path: 'carousel',
                component: carousel_component_1.CarouselComponent,
                data: {
                    title: 'Carousel'
                }
            },
            {
                path: 'datepicker',
                component: datepicker_component_1.DatepickerComponent,
                data: {
                    title: 'Datepicker'
                }
            },
            {
                path: 'popover',
                component: popover_component_1.PopoverComponent,
                data: {
                    title: 'Popovers'
                }
            },
            {
                path: 'rating',
                component: rating_component_1.RatingComponent,
                data: {
                    title: 'Rating'
                }
            },
            {
                path: 'tabs',
                component: tabs_component_1.TabsComponent,
                data: {
                    title: 'Tabs'
                }
            },
            {
                path: 'timepicker',
                component: timepicker_component_1.TimepickerComponent,
                data: {
                    title: 'Timepicker'
                }
            },
            {
                path: 'tooltip',
                component: tooltip_component_1.TooltipComponent,
                data: {
                    title: 'Tooltips'
                }
            },
            {
                path: 'typeahead',
                component: typeahead_component_1.TypeaheadComponent,
                data: {
                    title: 'Typeahead'
                }
            },
            {
                path: 'ng-buttons',
                component: ng_buttons_component_1.NgButtonsComponent,
                data: {
                    title: 'Ngb-Bootstrap'
                }
            },
        ]
    }
];
var UIComponentsRoutingModule = (function () {
    function UIComponentsRoutingModule() {
    }
    UIComponentsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule],
        })
    ], UIComponentsRoutingModule);
    return UIComponentsRoutingModule;
}());
exports.UIComponentsRoutingModule = UIComponentsRoutingModule;
//# sourceMappingURL=ui-components-routing.module.js.map