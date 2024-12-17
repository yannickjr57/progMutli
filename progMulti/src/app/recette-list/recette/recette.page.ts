import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recette } from 'src/app/models/recette.model';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-recette',
  templateUrl: './recette.page.html',
  styleUrls: ['./recette.page.scss'],
})
export class RecettePage implements OnInit {
  recette : any;
  ingredients : any[] = [];
  constructor(
      private readonly supabase: SupabaseService, private route: ActivatedRoute,
    ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if(!id){
      return;
    }
    this.getRecetteById(id);
    this.getIngredientsByRecetteId(id);

  }

  async getRecetteById(id:string) {
    try {
      let { data: recette, error, status } = await this.supabase.getRecetteById(id);
     
      if (recette) {
        this.recette = recette[0];
       
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  async getIngredientsByRecetteId(id:string) {
    try {
      let { data: ingredients, error, status } = await this.supabase.getIngredientsByRecetteId(id);
     
      if (ingredients) {
        this.ingredients = ingredients;
        
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  async toggleFavoris() {
    try {
      this.recette.favoris = !this.recette.favoris;
      await this.supabase.setFavoris(this.recette.id, this.recette.favoris);
      await this.supabase.createNotice('Recette mise en favoris');
    } catch (error: any) {
      alert(error.message);
    }
  }

  editRecette(){

  }

  deleteRecette(){

  }

}
