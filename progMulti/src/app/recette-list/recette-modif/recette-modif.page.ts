import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recette } from 'src/app/models/recette.model';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-recette-modif',
  templateUrl: './recette-modif.page.html',
  styleUrls: ['./recette-modif.page.scss'],
})
export class RecetteModifPage implements OnInit {
  recette : Recette = new Recette();
  constructor(private supabase : SupabaseService, private route : ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(!id){
      throw new Error('ID de la recette non trouvée');
    }
    this.supabase.getRecetteById(id)
    
  }

}
