import { Routes } from '@angular/router';

import { GuessComponent } from './components/guess/guess.component';

export const routes: Routes = [
  {
    path: '',
    component: GuessComponent
  },
  { path: '**', redirectTo: '/' }
];
