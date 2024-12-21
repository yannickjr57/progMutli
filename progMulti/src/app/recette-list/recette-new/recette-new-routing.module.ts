import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecetteNewPage } from './recette-new.page';

const routes: Routes = [
  {
    path: '',
    component: RecetteNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecetteNewPageRoutingModule {}
