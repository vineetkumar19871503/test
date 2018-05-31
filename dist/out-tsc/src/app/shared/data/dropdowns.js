"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Basic
exports.basicData = [
    {
        id: 'basic1',
        text: 'Basic 1'
    },
    {
        id: 'basic2',
        text: 'Basic 2'
    },
    {
        id: 'basic3',
        text: 'Basic 3'
    },
    {
        id: 'basic4',
        text: 'Basic 4'
    }
];
//Basic with disable option
exports.basicDisableData = [
    {
        id: 'basic1',
        text: 'Basic 1'
    },
    {
        id: 'basic2',
        disabled: true,
        text: 'Basic 2'
    },
    {
        id: 'basic3',
        text: 'Basic 3'
    },
    {
        id: 'basic4',
        text: 'Basic 4'
    }
];
//options
exports.optionsData = [
    {
        id: 'opt1',
        text: 'Options 1'
    },
    {
        id: 'opt2',
        text: 'Options 2'
    },
    {
        id: 'opt3',
        text: 'Options 3'
    },
    {
        id: 'opt4',
        text: 'Options 4'
    }
];
exports.options = {
    multiple: true,
    theme: 'classic',
    closeOnSelect: false
};
//Cstom search data
exports.customSearchOptions = {
    matcher: function (term, text) {
        return text.toUpperCase().indexOf(term.toUpperCase()) == 0;
    }
};
exports.customSearchData = [
    {
        id: 'AK',
        text: 'Alaska'
    },
    {
        id: 'HI',
        text: 'Hawaii'
    },
    {
        id: 'CA',
        text: 'California'
    },
    {
        id: 'NV',
        text: 'Nevada'
    },
    {
        id: 'OR',
        text: 'Oregon'
    },
    {
        id: 'WA',
        text: 'Washington'
    },
    {
        id: 'AZ',
        text: 'Arizona'
    },
    {
        id: 'CO',
        text: 'Colorado'
    }
];
//Multiple Value
exports.multipleValueData = [
    {
        id: 'multiple1',
        text: 'Multiple 1'
    },
    {
        id: 'multiple2',
        text: 'Multiple 2'
    },
    {
        id: 'multiple3',
        text: 'Multiple 3'
    },
    {
        id: 'multiple4',
        text: 'Multiple 4'
    }
];
exports.value = ['multiple2', 'multiple4'];
exports.multipleValueOptions = {
    multiple: true
};
//# sourceMappingURL=dropdowns.js.map