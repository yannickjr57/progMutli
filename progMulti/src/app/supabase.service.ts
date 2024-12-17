import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import {
  AuthChangeEvent,
  createClient,
  Session,
  SupabaseClient,
} from '@supabase/supabase-js';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

 

 get Recettes() {
    return this.supabase.from('recettes').select('*');
  }

  get Ingredients() {
    return this.supabase.from('ingredients').select('*');
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

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('images').upload(filePath, file);
  }

  async createNotice(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 5000 });
    await toast.present();
  }

  createLoader() {
    return this.loadingCtrl.create();
  }
}
