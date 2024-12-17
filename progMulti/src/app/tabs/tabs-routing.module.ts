import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'recette-list',
        children: [
          {
            path: '',
            loadChildren: () => import('../recette-list/recette-list.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'ajout',
        children: [
          {
            path: '',
            loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: 'favoris',
        children: [
          {
            path: '',
            loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/recette-list',
        pathMatch: 'full'
      }
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
