import { difficulte } from "./difficulte";

export class Evenement {
    idEvenement: number;
    nom: string;
    description: string;
    image: string;
    duree: number;
    nbeJoueurMax: number;
    prix: number;
    difficulte: difficulte;

    constructor(idEvenement: number, nom: string, description: string, image: string, duree: number, nbeJoueurMax: number, prix: number,
        difficulte: difficulte
    ) {
        this.idEvenement = idEvenement;
        this.nom = nom;
        this.description = description;
        this.image = image;
        this.nom = nom;
        this.duree = duree;
        this.nbeJoueurMax = nbeJoueurMax;
        this.prix = prix;
        this.difficulte = difficulte;
    }
}
