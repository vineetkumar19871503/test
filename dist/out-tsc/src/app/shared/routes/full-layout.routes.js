"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Route for content layout with sidebar, navbar and footer.
exports.Full_ROUTES = [
    {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
    },
    {
        path: 'jobs',
        loadChildren: './jobs/jobs.module#JobModule'
    },
    {
        path: 'subjobs',
        loadChildren: './jobs/subjobs.module#SubJobModule'
    },
    {
        path: 'quotes',
        loadChildren: './quotes/quotes.module#QuoteModule'
    },
    {
        path: 'customers',
        loadChildren: './customers/customers.module#CustomerModule'
    },
    {
        path: 'calendar',
        loadChildren: './calendar/calendar.module#CalendarsModule'
    },
    {
        path: 'charts',
        loadChildren: './charts/charts.module#ChartsNg2Module'
    },
    {
        path: 'forms',
        loadChildren: './forms/forms.module#FormModule'
    },
    {
        path: 'maps',
        loadChildren: './maps/maps.module#MapsModule'
    },
    {
        path: 'tables',
        loadChildren: './tables/tables.module#TablesModule'
    },
    {
        path: 'datatables',
        loadChildren: './data-tables/data-tables.module#DataTablesModule'
    },
    {
        path: 'uikit',
        loadChildren: './ui-kit/ui-kit.module#UIKitModule'
    },
    {
        path: 'components',
        loadChildren: './components/ui-components.module#UIComponentsModule'
    },
    {
        path: 'pages',
        loadChildren: './pages/full-pages/full-pages.module#FullPagesModule'
    },
    {
        path: 'cards',
        loadChildren: './cards/cards.module#CardsModule'
    },
    {
        path: 'colorpalettes',
        loadChildren: './color-palette/color-palette.module#ColorPaletteModule'
    },
    {
        path: 'chat',
        loadChildren: './chat/chat.module#ChatModule'
    },
    {
        path: 'inbox',
        loadChildren: './inbox/inbox.module#InboxModule'
    },
    {
        path: 'taskboard',
        loadChildren: './taskboard/taskboard.module#TaskboardModule'
    },
    {
        path: 'player',
        loadChildren: './player/player.module#PlayerModule'
    },
    {
        path: 'bills',
        loadChildren: './bills/bills.module#BillModule'
    }
];
//# sourceMappingURL=full-layout.routes.js.map