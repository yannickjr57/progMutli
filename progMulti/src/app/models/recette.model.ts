export class Recette {
    id: string;
    titre: string;
    image_url: string;
    description: string;
    ingredients: string;
    instructions: string;

    constructor(){
        this.id = '';
        this.titre = '';
        this.image_url = '';
        this.description = '';
        this.ingredients = '';
        this.instructions = '';
    }
}