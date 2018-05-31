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
var core_2 = require("videogular2/core");
var controls_1 = require("videogular2/controls");
var overlay_play_1 = require("videogular2/overlay-play");
var buffering_1 = require("videogular2/buffering");
var player_routing_module_1 = require("./player-routing.module");
var player_component_1 = require("./player.component");
var PlayerModule = (function () {
    function PlayerModule() {
    }
    PlayerModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                player_routing_module_1.PlayerRoutingModule,
                core_2.VgCoreModule,
                controls_1.VgControlsModule,
                overlay_play_1.VgOverlayPlayModule,
                buffering_1.VgBufferingModule
            ],
            declarations: [
                player_component_1.PlayerComponent
            ]
        })
    ], PlayerModule);
    return PlayerModule;
}());
exports.PlayerModule = PlayerModule;
//# sourceMappingURL=player.module.js.map