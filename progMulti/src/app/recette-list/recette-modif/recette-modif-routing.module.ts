import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecetteModifPage } from './recette-modif.page';

const routes: Routes = [
  {
    path: '',
    component: RecetteModifPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecetteModifPageRoutingModule {}
