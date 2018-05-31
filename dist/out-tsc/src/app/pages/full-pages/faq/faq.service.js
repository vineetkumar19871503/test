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
var faq_model_1 = require("./faq.model");
var FaqService = (function () {
    function FaqService() {
        this.faqs = [
            new faq_model_1.FAQ(1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?', "Aenean eget leo vel lorem tincidunt tempor sit amet non ex.\n             Aenean porta, velit ut efficitur fringilla, enim est suscipit augue, in porta ex nisi quis est.\n             Phasellus ut odio in dolor eleifend tincidunt eget id tellus."),
            new faq_model_1.FAQ(2, 'Vestibulum hendrerit eros id finibus fermentum?', "Nam tincidunt rhoncus dolor nec imperdiet. Ut ut mauris tortor. Nulla cursus mattis elit, sed egestas augue laoreet id.\n             Etiam eu velit felis. Duis at vehicula ligula, et suscipit nunc."),
            new faq_model_1.FAQ(3, 'Nunc maximus turpis et vulputate euismod?', "Aenean eget leo vel lorem tincidunt tempor sit amet non ex.\n            Aenean porta, velit ut efficitur fringilla, enim est suscipit augue, in porta ex nisi quis est.\n            Phasellus ut odio in dolor eleifend tincidunt eget id tellus."),
            new faq_model_1.FAQ(4, 'Vivamus pulvinar diam at viverra sagittis?', "Nam tincidunt rhoncus dolor nec imperdiet. Ut ut mauris tortor. Nulla cursus mattis elit, sed egestas augue laoreet id. Etiam eu velit felis.\n             Duis at vehicula ligula, et suscipit nunc."),
            new faq_model_1.FAQ(5, 'Sed elementum nisl ac lectus luctus viverra?', "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. \n            Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."),
            new faq_model_1.FAQ(6, 'Nulla ut tortor et arcu porttitor sollicitudin a a odio?', "Sed sit amet feugiat mi. Morbi dui dui, ultrices id commodo in, commodo ut erat. Ut vitae condimentum lorem. Cras eu viverra metus, fringilla tincidunt est. Aenean cursus,\n             lacus ut posuere convallis, est dolor tincidunt nunc, nec viverra justo lorem a enim."),
            new faq_model_1.FAQ(7, 'Phasellus imperdiet eros vitae mi malesuada consectetur?', "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. \n            Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."),
            new faq_model_1.FAQ(8, 'Duis at metus eleifend, elementum mauris eu, tincidunt du?', "Sed sit amet feugiat mi. Morbi dui dui, ultrices id commodo in, commodo ut erat. Ut vitae condimentum lorem. Cras eu viverra metus, fringilla tincidunt est.\n             Aenean cursus, lacus ut posuere convallis, est dolor tincidunt nunc, nec viverra justo lorem a enim"),
            new faq_model_1.FAQ(9, 'Sed sit amet lacus sagittis, viverra ex at, volutpat leo?', "Vivamus eu consectetur dui. Pellentesque eu mi et lacus mollis tempor. Etiam sed lobortis sapien. Mauris ultrices bibendum elit, at egestas felis elementum vitae.\n             Mauris viverra nulla vitae pulvinar sollicitudin. Morbi non iaculis tortor. In hac habitasse platea dictumst"),
            new faq_model_1.FAQ(10, 'Proin facilisis magna congue mattis mattis?', "Integer ornare elementum augue, in scelerisque magna efficitur non. Suspendisse laoreet purus nec augue malesuada auctor. Donec mollis eleifend auctor. Aliquam arcu erat, aliquam placerat risus at, fermentum efficitur nibh.\n             Ut sed viverra neque, nec hendrerit tortor. "),
            new faq_model_1.FAQ(11, 'Suspendisse eget nibh ut urna tincidunt efficitur?', "Vivamus eu consectetur dui. Pellentesque eu mi et lacus mollis tempor. Etiam sed lobortis sapien. Mauris ultrices bibendum elit, at egestas felis elementum vitae. Mauris viverra nulla vitae pulvinar sollicitudin.\n             Morbi non iaculis tortor. In hac habitasse platea dictumst"),
            new faq_model_1.FAQ(12, 'Fusce sed velit ut nibh blandit posuere?', "Integer ornare elementum augue, in scelerisque magna efficitur non. Suspendisse laoreet purus nec augue malesuada auctor. Donec mollis eleifend auctor. Aliquam arcu erat, aliquam placerat risus at, fermentum efficitur nibh.\n             Ut sed viverra neque, nec hendrerit tortor. "),
            new faq_model_1.FAQ(13, 'Etiam auctor nisi non sollicitudin aliquet?', "Aenean eget leo vel lorem tincidunt tempor sit amet non ex.\n            Aenean porta, velit ut efficitur fringilla, enim est suscipit augue, in porta ex nisi quis est.\n            Phasellus ut odio in dolor eleifend tincidunt eget id tellus."),
            new faq_model_1.FAQ(14, 'Donec sit amet orci sit amet tellus laoreet tempus?', "Integer ornare elementum augue, in scelerisque magna efficitur non. Suspendisse laoreet purus nec augue malesuada auctor. Donec mollis eleifend auctor. Aliquam arcu erat, aliquam placerat risus at, fermentum efficitur nibh.\n             Ut sed viverra neque, nec hendrerit tortor. "),
            new faq_model_1.FAQ(15, 'Nullam consequat urna ac nunc lobortis ullamcorper?', "Aenean eget leo vel lorem tincidunt tempor sit amet non ex.\n            Aenean porta, velit ut efficitur fringilla, enim est suscipit augue, in porta ex nisi quis est.\n            Phasellus ut odio in dolor eleifend tincidunt eget id tellus."),
        ];
    }
    FaqService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], FaqService);
    return FaqService;
}());
exports.FaqService = FaqService;
//# sourceMappingURL=faq.service.js.map