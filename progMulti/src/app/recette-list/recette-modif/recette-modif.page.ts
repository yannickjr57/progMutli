import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Ingredient } from 'src/app/models/ingredient.model';
import { IngredientWithQuantity } from 'src/app/models/ingredientWithQuantity.model';
import { Recette } from 'src/app/models/recette.model';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-recette-modif',
  templateUrl: './recette-modif.page.html',
  styleUrls: ['./recette-modif.page.scss'],
})
export class RecetteModifPage implements OnInit {
  ingredientS$ = this.supabase.ingredients$
  ingredients : IngredientWithQuantity[] = [];
  recette : Recette = new Recette();
  selectedIngredients: {
    isSelected: { [key: string]: boolean }; 
    quantity: { [key: string]: string };  
  } = {
    isSelected: {},
    quantity: {},

  };
  lastRecetteId: Promise<string> | undefined;
  NewInstruction ="";

  imageFile: File | null = null;
imagePreview: SafeResourceUrl | null = null;
  errors ="";
  constructor(private supabase : SupabaseService, private route : ActivatedRoute, private router : Router) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(!id){
      throw new Error('ID de la recette non trouvée');
    }
    await this.getRecetteById(id);
    await this.supabase.getIngredients()
    await this.getIngredientsByRecetteId(id);
    this.initSelectedIngredients();
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

  initSelectedIngredients() {
    this.ingredients.forEach((ingredient) => {
      this.selectedIngredients.isSelected[ingredient.ingredient.id] = true;
      this.selectedIngredients.quantity[ingredient.ingredient.id] = ingredient.quantite;
    })
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

  async addRecette(){
    const loader = await this.supabase.createLoader();
    try{
      loader.present();
      this.checkErrors()
      if(this.errors != ""){ 
        this.supabase.createNotice(this.errors);
        return
      }
      if(this.imageFile){
        const date = new Date().getTime().toString();
        await this.supabase.uploadAvatar(date+"_.jpg", this.imageFile!)
        this.recette.image_url ="https://uoyasvknlbqbrhuvmvms.supabase.co/storage/v1/object/public/images/"+date+"_.jpg"
      }
      await this.supabase.updateRecette(this.recette, this.getIngredientsWithQuantity())
      await this.supabase.getRecettes();
      this.supabase.createNotice("Recette modifiée");
      this.router.navigate(['/recette-list']);
    }
    finally{
      await loader.dismiss();
    }
  }


  async handleCamera() {
    const photo = await Camera.getPhoto({ resultType: CameraResultType.DataUrl });
    const blob = await fetch(photo.dataUrl || '').then((res) => res.blob());
    const file = new File([blob], 'my-file', { type: `image/${photo.format}` });
    this.imageFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string; 
    };
    reader.readAsDataURL(this.imageFile); 
  }

  checkErrors(){
    
    if(this.recette.instructions.length == 0){
      this.errors = "Veuillez entrer des instructions"
    }
    if(this.recette.description.length == 0){
      this.errors = "Veuillez entrer une description"
    }
    if(this.imageFile  == null && this.recette.image_url == null){
      this.errors = "Veuillez prendre une photo"
    }
    if(this.recette.titre.length == 0){
      this.errors = 'Veuillez entrer un titre'
    }
    
    
    
  }

}
