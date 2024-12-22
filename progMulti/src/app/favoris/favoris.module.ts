import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavorisPage } from './favoris.page';


import { FavorisPageRoutingModule } from './favoris-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FavorisPageRoutingModule
  ],
  declarations: [FavorisPage]
})
export class FavorisPageModule {}
