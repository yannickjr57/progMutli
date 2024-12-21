import { Ingredient } from "./ingredient.model";

export class IngredientWithQuantity {
    constructor(public ingredient: Ingredient, public quantite: string) {}
  }