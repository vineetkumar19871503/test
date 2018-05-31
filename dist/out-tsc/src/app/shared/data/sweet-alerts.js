"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sweetalert2_1 = require("sweetalert2");
// Simple Alert
function basicAlert() {
    sweetalert2_1.default("Here's a message!").catch(sweetalert2_1.default.noop); // Use ".catch(swal.noop)" for overlay click close error.
}
exports.basicAlert = basicAlert;
// Alert with Title
function withTitle() {
    sweetalert2_1.default("Here's a message!", "It's pretty, isn't it?");
}
exports.withTitle = withTitle;
//  HTML Alert
function htmlAlert() {
    sweetalert2_1.default({
        title: 'HTML <small>Title</small>!',
        text: 'A custom <span style="color:#F6BB42">html<span> message.',
        html: true
    });
}
exports.htmlAlert = htmlAlert;
// Question Type Alert
function typeQuestion() {
    sweetalert2_1.default("Question", "Are You Sure?", "question");
}
exports.typeQuestion = typeQuestion;
// Success Type Alert
function typeSuccess() {
    sweetalert2_1.default("Good job!", "You clicked the button!", "success");
}
exports.typeSuccess = typeSuccess;
// Info Type Alert
function typeInfo() {
    sweetalert2_1.default("Info!", "You clicked the button!", "info");
}
exports.typeInfo = typeInfo;
// Warning Type Alert
function typeWarning() {
    sweetalert2_1.default("Warning!", "You clicked the button!", "warning");
}
exports.typeWarning = typeWarning;
// Error Type Alert
function typeError() {
    sweetalert2_1.default("Error!", "You clicked the button!", "error");
}
exports.typeError = typeError;
// Custom Icon 
function customIcon() {
    sweetalert2_1.default({ title: "Sweet!", text: "Here's a custom image.", imageUrl: "./assets/img/portrait/avatars/avatar-08.png" });
}
exports.customIcon = customIcon;
// Auto close timer
function autoClose() {
    sweetalert2_1.default({ title: "Auto close alert!", text: "I will close in 2 seconds.", timer: 2000, showConfirmButton: false });
}
exports.autoClose = autoClose;
// Allow Outside Click
function outsideClick() {
    sweetalert2_1.default({
        title: 'Click outside to close!',
        text: 'This is a cool message!',
        allowOutsideClick: true
    });
}
exports.outsideClick = outsideClick;
// Ajax Request
function ajaxRequest() {
    sweetalert2_1.default({
        title: 'Submit email to run ajax request',
        input: 'email',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return new Promise(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, 2000);
            });
        },
        allowOutsideClick: false
    }).then(function (email) {
        if (email) {
            sweetalert2_1.default({
                type: 'success',
                title: 'Ajax request finished!',
                html: 'Submitted email: ' + email
            });
        }
    });
}
exports.ajaxRequest = ajaxRequest;
// Button Options
function customButton() {
    sweetalert2_1.default({
        title: '<i>HTML</i> <u>example</u>',
        type: 'info',
        html: 'You can use <b>bold text</b>, ' +
            '<a href="//github.com">links</a> ' +
            'and other HTML tags',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
        cancelButtonText: '<i class="fa fa-thumbs-down"></i> Opps!'
    });
}
exports.customButton = customButton;
// Prompt Function
function promptFunction() {
    sweetalert2_1.default({
        title: "An input!",
        text: "Write something interesting:",
        input: "text",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "Write something"
    }).then(function (inputValue) {
        if (inputValue === false)
            return false;
        if (inputValue === "") {
            sweetalert2_1.default.showInputError("You need to write something!");
            return false;
        }
        sweetalert2_1.default("Nice!", "You wrote: " + inputValue, "success");
    });
}
exports.promptFunction = promptFunction;
// Confirm Button Action
function confirmText() {
    sweetalert2_1.default({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0CC27E',
        cancelButtonColor: '#FF586B',
        confirmButtonText: 'Text Changed',
        cancelButtonText: "No, cancel"
    }).then(function (isConfirm) {
        if (isConfirm) {
            sweetalert2_1.default('Changed!', 'Confirm button text was changed!!', 'success');
        }
    }).catch(sweetalert2_1.default.noop);
}
exports.confirmText = confirmText;
// Confirm & Cancel Button
function confirmCancelButton() {
    sweetalert2_1.default({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0CC27E',
        cancelButtonColor: '#FF586B',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonClass: 'btn btn-success btn-raised mr-5',
        cancelButtonClass: 'btn btn-danger btn-raised',
        buttonsStyling: false
    }).then(function () {
        sweetalert2_1.default('Deleted!', 'Your imaginary file has been deleted.', 'success');
    }, function (dismiss) {
        // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
        if (dismiss === 'cancel') {
            sweetalert2_1.default('Cancelled', 'Your imaginary file is safe :)', 'error');
        }
    });
}
exports.confirmCancelButton = confirmCancelButton;
// Chaining modals / Steps
function steps() {
    sweetalert2_1.default.setDefaults({
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        cancelButtonColor: '#FF586B',
        animation: false
    });
    var steps = [
        {
            title: 'Step 1',
            text: 'Chaining modals is easy with Step 1'
        },
        {
            title: 'Step 2',
            text: 'Chaining modals is easy with Step 2'
        },
        {
            title: 'Step 3',
            text: 'Chaining modals is easy with Step 3'
        },
    ];
    sweetalert2_1.default.queue(steps).then(function () {
        sweetalert2_1.default({
            title: 'All done!',
            text: 'Great job :)',
            confirmButtonText: 'Lovely!',
            showCancelButton: false
        });
    }).then(function () {
        sweetalert2_1.default.resetDefaults();
    }).catch(sweetalert2_1.default.noop);
}
exports.steps = steps;
//# sourceMappingURL=sweet-alerts.js.map