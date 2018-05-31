"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//interface ends
var Counter = (function () {
    function Counter(quill, options) {
        var _this = this;
        this.quill = quill;
        this.options = options;
        var container = document.querySelector(this.options.container);
        this.quill.on('text-change', function () {
            var length = _this.calculate();
            container.innerHTML = length + ' ' + _this.options.unit + 's';
        });
    }
    //caculate words typed
    Counter.prototype.calculate = function () {
        var text = this.quill.getText().trim();
        if (this.options.unit === 'word') {
            return !text ? 0 : text.split(/\s+/).length;
        }
        return text.length;
    };
    return Counter;
}());
exports.default = Counter;
//# sourceMappingURL=counter.js.map