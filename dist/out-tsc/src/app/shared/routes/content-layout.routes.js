"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...
exports.CONTENT_ROUTES = [
    {
        path: 'pages',
        loadChildren: './pages/content-pages/content-pages.module#ContentPagesModule'
    },
    {
        path: 'users',
        loadChildren: './users/users.module#UserModule'
    }
];
//# sourceMappingURL=content-layout.routes.js.map