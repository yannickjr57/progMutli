import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { IngredientWithQuantity } from 'src/app/models/ingredientWithQuantity.model';
import { Recette } from 'src/app/models/recette.model';
import { SupabaseService } from 'src/app/supabase.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

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
  lastRecetteId: Promise<string> | undefined;
  NewInstruction ="";

  imageFile: File | null = null;
  imagePreview: SafeResourceUrl | null = null;
  errors ="";


 
  
  constructor(private supabase : SupabaseService, private router : Router) { }

  ngOnInit() {
    this.supabase.getIngredients()
    console.log(this.ingredientS$)
    this.getLastRecetteId().then(
      (lastRecetteId) => {
        lastRecetteId = lastRecetteId+1
        this.recette.id = lastRecetteId
      }
    )
   
  }

  async getLastRecetteId() {
    return this.supabase.getLastRecetteId();
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
    if(this.NewInstruction == ""){return}
    this.recette.instructions = [...this.recette.instructions, this.NewInstruction]
    this.NewInstruction = "";
  }
  removeInstruction(index : number){
    this.recette.instructions.splice(index, 1);
  }

  addRecette(){
    this.recette.image_url ="https://uoyasvknlbqbrhuvmvms.supabase.co/storage/v1/object/public/images/"+this.recette.titre.trim().toLowerCase()+"_.jpg"
    
    this.checkErrors()
    if(this.errors != ""){ 
      this.supabase.createNotice(this.errors);
      return
    }
    if(this.imageFile){
      this.supabase.uploadAvatar(this.recette.titre.trim().toLowerCase()+"_.jpg", this.imageFile!)
    }
    console.log("recette",this.recette)
    this.supabase.AddRecette(this.recette, this.getIngredientsWithQuantity())
    this.supabase.getRecettes();
    this.supabase.createNotice("Recette ajoutée");
    this.router.navigate(['/recette-list']);
  }


  async handleCamera() {
    const photo = await Camera.getPhoto({ resultType: CameraResultType.DataUrl });
    const blob = await fetch(photo.dataUrl || '').then((res) => res.blob());
    const file = new File([blob], 'my-file', { type: `image/${photo.format}` });
    this.imageFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string; // URL de l'image
    };
    reader.readAsDataURL(this.imageFile); // Convertir le fichier en DataURL
  }

  checkErrors(){
    
    if(this.recette.instructions.length == 0){
      this.errors = "Veuillez entrer des instructions"
    }
    const ingredientsWithQuantity = this.getIngredientsWithQuantity();
    if(ingredientsWithQuantity.length == 0){
      this.errors = "Veuillez choisir au moins un ingrediente"
    } 
    
    if(this.recette.description.length == 0){
      this.errors = "Veuillez entrer une description"
    }
    if(this.imageFile == null){
      this.errors = "Veuillez prendre une photo"
    }
    if(this.recette.titre.length == 0){
      this.errors = 'Veuillez entrer un titre'
    }
    
    
    
  }
}
