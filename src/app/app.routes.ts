import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './app/components/page-not-found/page-not-found.component';
import { GuessComponent } from './components/guess/guess.component';

export const routes: Routes = [
  {
    path: '',
    component: GuessComponent
  },
  { path: '**', component: PageNotFoundComponent }
];
