import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddQuoteComponent } from './add/add-quote.component';
import { EditQuoteComponent } from './edit/edit-quote.component';
import { ViewQuoteComponent } from './view/view-quote.component';
import { QuotesListComponent } from './list/quotes-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'add',
        component: AddQuoteComponent,
        data: {
          title: 'Add quote'
        }
      },
      {
        path: 'edit/:id',
        component: EditQuoteComponent,
        data: {
          title: 'Add quote'
        }
      },
      {
        path: 'view/:id',
        component: ViewQuoteComponent,
        data: {
          title: 'View quote'
        }
      },
      {
        path: 'list',
        component: QuotesListComponent,
        data: {
          title: 'Quotes List'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotesRoutingModule { }
