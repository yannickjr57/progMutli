export class Ingredient {
    id:string;
    nom_ingredient:string;
    constructor() {
        this.id="";
        this.nom_ingredient="";
    }
    getId():string{
        return this.id;
    }
    getNom():string{
        return this.nom_ingredient;
    }
}