import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase.service';
@Component({
  selector: 'app-recette-list',
  templateUrl: 'recette-list.page.html',
  styleUrls: ['recette-list.page.scss']
})
export class Tab1Page implements OnInit {

  

  recettes :any= [];

  

  constructor(
    private readonly supabase: SupabaseService,
  ) {}
  ngOnInit() {
    this.getRecette();
    
  }

  async getRecette() {
    try {
      let { data: recettes, error, status } = await this.supabase.Recettes;
      console.log(recettes, error, status);
      if (recettes) {
        this.recettes = recettes;
        console.log(this.recettes);
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  
}
