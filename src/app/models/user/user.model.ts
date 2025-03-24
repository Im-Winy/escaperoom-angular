import { authorization } from "./authorization";

export class User {
    idUser: number;
    username: string;
    password: string;
    authorization: authorization;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    adresse: string;
    ville: string;
    pays: string;


    constructor(id: number, username: string, password: string, authorization: authorization, nom: string, prenom: string, email: string,
        telephone: string, adresse: string, ville: string, pays: string
    ) {
        this.idUser = id;
        this.username = username;
        this.password = password;
        this.authorization = authorization;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.telephone = telephone;
        this.adresse = adresse;
        this.ville = ville;
        this.pays = pays;
    }

}
