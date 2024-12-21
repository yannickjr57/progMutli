export class Recette {
    id: string;
    titre: string;
    image_url: string;
    favoris: boolean;
    description: string;
    instructions: Array<string>;

    constructor(){
        this.id = '';
        this.titre = '';
        this.image_url = '';
        this.favoris = false;
        this.description = '';
        this.instructions = [];
    }
}