import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { IngredientWithQuantity } from 'src/app/models/ingredientWithQuantity.model';
import { Recette } from 'src/app/models/recette.model';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-recette-new',
  templateUrl: './recette-new.page.html',
  styleUrls: ['./recette-new.page.scss'],
})
export class RecetteNewPage implements OnInit {
  ingredientS$ = this.supabase.ingredients$
  recette : Recette = new Recette();
  selectedIngredients: {
    isSelected: { [key: string]: boolean }; // Statut sélectionné pour chaque ingrédient
    quantity: { [key: string]: string };   // Quantité associée pour chaque ingrédient      // Nom de l'ingrédient pour chaque id
  } = {
    isSelected: {},
    quantity: {},

  };
  NewInstruction ="";
  
  constructor(private supabase : SupabaseService) { }

  ngOnInit() {
    this.supabase.getIngredients()
    console.log(this.ingredientS$)

  }

  getIngredientsWithQuantity(){
    let ingredientsWithQuantity: {id:string, quantity:string}[] = [];
    for (const id in this.selectedIngredients.isSelected) {
      if (this.selectedIngredients.isSelected[id]) {
        const quantity = this.selectedIngredients.quantity[id];
        ingredientsWithQuantity = [...ingredientsWithQuantity, {id, quantity}];
      }
    }
    return ingredientsWithQuantity
  }

  addInstruction(){
    this.recette.instructions = [...this.recette.instructions, this.NewInstruction]
    this.NewInstruction = "";
  }
  removeInstruction(index : number){
    this.recette.instructions.splice(index, 1);
  }

  addRecette(){
    this.supabase.AddRecette(this.recette, this.getIngredientsWithQuantity())
  }

  log(){
    console.log(this.selectedIngredients)
    console.log(this.getIngredientsWithQuantity())
    console.log(this.recette)
  }
}
