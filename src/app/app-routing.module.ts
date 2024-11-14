import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuessComponent } from './components/guess/guess.component';

const routes: Routes = [
  {
    path: '',
    component: GuessComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
