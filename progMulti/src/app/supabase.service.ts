import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import {
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  private favorisSubject = new BehaviorSubject<any[]>([]); // Pour gérer l'état des favoris
  favoris$ = this.favorisSubject.asObservable(); // Observable pour s'abonner aux changements de favoris

  constructor(private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  // Fonction pour obtenir les recettes
  get Recettes() {
    return this.supabase.from('recettes').select('*');
  }

  // Fonction pour obtenir les ingrédients
  get Ingredients() {
    return this.supabase.from('ingredients').select('*');
  }

  // Fonction pour obtenir les favoris
  async getFavoris() {
    try {
      const { data, error } = await this.supabase
        .from('recettes')
        .select('*')
        .eq('favoris', true);

      if (error) throw error;

      // Mettre à jour le BehaviorSubject avec les nouveaux favoris
      this.favorisSubject.next(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des favoris:', error);
    }
  }

  // Fonction pour récupérer une recette par ID
  getRecetteById(id: string) {
    return this.supabase.from('recettes').select('*').eq('id', id);
  }

  // Fonction pour obtenir les ingrédients par ID de recette
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

  // Fonction pour télécharger une image à partir de Supabase Storage
  downLoadImage(path: string) {
    return this.supabase.storage.from('images').download(path);
  }

  // Fonction pour uploader une image
  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('images').upload(filePath, file);
  }

  // Fonction pour mettre à jour un favori
  async setFavoris(id: string, favoris: boolean) {
    try {
      const { data, error } = await this.supabase
        .from('recettes')
        .update({ favoris })
        .eq('id', id);

      if (error) throw error;

      // Mettre à jour la liste des favoris après modification
      await this.getFavoris(); // Rafraîchir la liste des favoris
    } catch (error) {
      console.error('Erreur lors de la mise à jour du favori:', error);
    }
  }

  // Fonction pour créer une notification Toast
  async createNotice(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 5000 });
    await toast.present();
  }

  // Fonction pour créer un loader
  createLoader() {
    return this.loadingCtrl.create();
  }
}
