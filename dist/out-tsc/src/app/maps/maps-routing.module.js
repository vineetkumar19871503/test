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
var full_screen_map_component_1 = require("./full-screen-map/full-screen-map.component");
var google_map_component_1 = require("./google-map/google-map.component");
var routes = [
    {
        path: '',
        children: [
            {
                path: 'fullscreen',
                component: full_screen_map_component_1.FullScreenMapComponent,
                data: {
                    title: 'Full Screen Map'
                }
            },
            {
                path: 'google',
                component: google_map_component_1.GoogleMapComponent,
                data: {
                    title: 'Google Map'
                }
            }
        ]
    }
];
var MapsRoutingModule = (function () {
    function MapsRoutingModule() {
    }
    MapsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule],
        })
    ], MapsRoutingModule);
    return MapsRoutingModule;
}());
exports.MapsRoutingModule = MapsRoutingModule;
//# sourceMappingURL=maps-routing.module.js.map