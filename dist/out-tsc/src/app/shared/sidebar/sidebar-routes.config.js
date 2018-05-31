"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Sidebar menu Routes and data
exports.ROUTES = [
    { path: '/dashboard', title: 'Dashboard', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    {
        path: '', title: 'Estimate', icon: 'ft-file-text', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
            { path: '/quotes/list', title: 'Quotes', icon: 'ft-align-justify', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/jobs/list', title: 'Jobs', icon: 'ft-align-justify', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
        ]
    },
    { path: '/jobs/dispatch', title: 'Dispatch', icon: 'ft-navigation', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
];
//# sourceMappingURL=sidebar-routes.config.js.map