import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';import { Ingredient } from 'src/app/models/ingredient.model';
;
import { IngredientWithQuantity } from 'src/app/models/ingredientWithQuantity.model';
import { Recette } from 'src/app/models/recette.model';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-recette',
  templateUrl: './recette.page.html',
  styleUrls: ['./recette.page.scss'],
})
export class RecettePage implements OnInit {
  recette : Recette = new Recette();
  ingredients : IngredientWithQuantity[] = [];
  constructor(
      private readonly supabase: SupabaseService, private route: ActivatedRoute, private alertController: AlertController, private router : Router 
    ) {}

  async ngOnInit() {
    const loader = await this.supabase.createLoader();
    try{
      const id = this.route.snapshot.paramMap.get('id');
      console.log(id);
      if(!id){
        return;
      }
      await this.getRecetteById(id);
      await this.getIngredientsByRecetteId(id);
    }
    catch(error){
      console.error(error);
    }
    finally{
      loader.dismiss();
    }
    

  }

  async  getRecetteById(id:string) {
    try {
      let { data: recette, error, status } = await this.supabase.getRecetteById(id);
      console.log("recette",recette);
      if (recette) {
        console.log("recette",recette[0]);
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
        this.ingredients = ingredients.map((ingredient : any) => new IngredientWithQuantity(ingredient.ingredients, ingredient.quantite));
        
      }
    
    } catch (error: any) {
      alert(error.message);
    }
  }

  async toggleFavoris() {
    try {
      this.recette.favoris = !this.recette.favoris;
      await this.supabase.setFavoris(this.recette.id, this.recette.favoris);
      if(this.recette.favoris){
        this.supabase.createNotice("Recette ajoutée aux favoris");
      }
      else{
        this.supabase.createNotice("Recette retirée des favoris");
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  editRecette(){
    this.router.navigate(['/recette-modif', this.recette.id]);
  }

  async deleteRecette(){
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Etes-vous certain de vouloir supprimer cette recette ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.supabase.deleteRecette(this.recette.id);
            this.router.navigate(['/recette-list']);
          },
        },
      ],
    })

    await alert.present();
    
  }

}
