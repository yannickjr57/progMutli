import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecetteModifPageRoutingModule } from './recette-modif-routing.module';

import { RecetteModifPage } from './recette-modif.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecetteModifPageRoutingModule
  ],
  declarations: [RecetteModifPage]
})
export class RecetteModifPageModule {}
