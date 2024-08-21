import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionFormComponent } from './components/action-form/action-form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: ActionFormComponent },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
