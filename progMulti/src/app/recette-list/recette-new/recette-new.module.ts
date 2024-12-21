import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecetteNewPageRoutingModule } from './recette-new-routing.module';

import { RecetteNewPage } from './recette-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecetteNewPageRoutingModule
  ],
  declarations: [RecetteNewPage]
})
export class RecetteNewPageModule {}
