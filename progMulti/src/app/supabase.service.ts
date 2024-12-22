import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import {
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Recette } from './models/recette.model';
import { Title } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  private ingredientsSubject = new BehaviorSubject<any[]>([]);
  ingredients$ = this.ingredientsSubject.asObservable()

  private recettesSubject = new BehaviorSubject<any[]>([]); 
  recettes$ = this.recettesSubject.asObservable(); 

  private favorisSubject = new BehaviorSubject<any[]>([]); 
  favoris$ = this.favorisSubject.asObservable(); 



  constructor(private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  // Fonction pour obtenir les recettes
  async getRecettes() {
    try{
      const { data, error } = await this.supabase.from('recettes').select('*');
      if (error) throw error;

     
      this.recettesSubject.next(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des recettes:', error);

    }

  }


  async getIngredients() {
    try{
      const { data, error } = await this.supabase
        .from("ingredients")
        .select('*')
      if(error) throw error;
      this.ingredientsSubject.next(data)
    }
    catch(error){
      console.error("erreur de la récuperation des ingrédients", error)
    }

  }


  async getFavoris() {
    try {
      const { data, error } = await this.supabase
        .from('recettes')
        .select('*')
        .eq('favoris', true);

      if (error) throw error;

 
      this.favorisSubject.next(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des favoris:', error);
    }
  }

  getRecetteById(id: string) {
    return this.supabase.from('recettes').select('*').eq('id', id);
  }


  getIngredientsByRecetteId(id: string) {
    return this.supabase
      .from('ingredient_recette')
      .select(`
        quantite,
        ingredients (
          id,
          nom_ingredient
        )
      `)
      .eq('id_recette', id);
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('images').download(path);
  }

  // Fonction pour uploader une image
  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('images').upload(filePath, file);
  }

  async getLastRecetteId() {
    try {
      const { data, error } = await this.supabase
        .from('recettes')
        .select('id')
        .order('id', { ascending: false })
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        return data[0].id;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'ID de la dernière recette:', error);
      return null;
    }
  }
  
  async setFavoris(id: string, favoris: boolean) {
    try {
      const { data, error } = await this.supabase
        .from('recettes')
        .update({ favoris })
        .eq('id', id);

      if (error) throw error;

     
      await this.getFavoris(); 
    } catch (error) {
      console.error('Erreur lors de la mise à jour du favori:', error);
    }
  }

  
  async createNotice(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 1500 });
    await toast.present();
  }

  async deleteRecette(id: string) {
    try{
      let { data: recette, error, status } = await this.getRecetteById(id);
      if(recette){
        const imagePath = recette[0].titre.trim().toLowerCase() + ".jpg";
        const { data: data3, error: error3 } = await this.supabase.storage
          .from('images')
          .remove([imagePath]);

      console.log("data3",data3);
    }}catch(error){
    
      console.log(error);
    }
    try {
      const { data, error } = await this.supabase
        .from('ingredient_recette')
        .delete()
        .eq('id_recette', id);
      const { data: data2, error: error2 } = await this.supabase
        .from('recettes')
        .delete()
        .eq('id', id);
        

      if (error || error2) throw error || error2;

 
      await this.getFavoris();
      await this.getRecettes();
      this.createNotice('Recette supprimée');
      
    } catch (error) {
      console.error('Erreur lors de la suppression de la recette:', error);
    }
  }

  async AddRecette(recette: Recette, ingredients : any[]) {
    const {data, error} = await this.supabase.from('recettes').insert(
      [
        {
          id : recette.id,
          titre : recette.titre,
          description : recette.description,
          image_url : recette.image_url,
          favoris : false,
          instructions : recette.instructions
        }
      ]
    )

    if(error) throw error;
    if(ingredients.length > 0){
      ingredients.forEach(async ingredient => {
        const {data, error} = await this.supabase.from('ingredient_recette').insert(
          [
            {
              id_recette : recette.id,
              id_ingredient : ingredient.id,
              quantite : ingredient.quantity
            }
          ]
        )
        console.log("data",data, error)
      })

      
    }
    else{
      console.log("no ingredients")
    }
  await this.getRecettes()
  }

  async updateRecette(recette: Recette, ingredients : any[]) {
    const {data, error} = await this.supabase.from('recettes').update(
      {
        id : recette.id,
        titre : recette.titre,
        description : recette.description,
        image_url : recette.image_url,
        favoris : recette.favoris,
        instructions : recette.instructions
      }
    ).eq('id', recette.id)

    if(error) throw error;

    if(ingredients.length > 0){
      await this.supabase.from('ingredient_recette').delete().eq('id_recette', recette.id);
      ingredients.forEach(async ingredient => {
        const {data, error} = await this.supabase.from('ingredient_recette').insert(
          [
            {
              id_recette : recette.id,
              id_ingredient : ingredient.id,
              quantite : ingredient.quantity
            }
          ]
        )
        console.log("data",data, error)
      })
    }
    else{
      console.log("no ingredients")
    }
    await this.getRecettes()
  }
    

 
  createLoader() {
    return this.loadingCtrl.create();
  }
}
