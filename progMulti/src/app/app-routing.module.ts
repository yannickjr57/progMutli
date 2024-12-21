import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'recette-list',
    loadChildren: () => import('./recette-list/recette/recette.module').then( m => m.RecettePageModule)
  },
  {
    path: 'recette/:id',
    loadChildren: () => import('./recette-list/recette/recette.module').then( m => m.RecettePageModule)
  },
  {
    path: 'recette-new',
    loadChildren: () => import('./recette-list/recette-new/recette-new.module').then( m => m.RecetteNewPageModule)
  },
  {
    path: 'recette-modif',
    loadChildren: () => import('./recette-list/recette-modif/recette-modif.module').then( m => m.RecetteModifPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
