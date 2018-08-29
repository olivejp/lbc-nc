import { Categorie } from "./categorie.model";

export class Annonce {
  id: number;
  titre: string;
  description: string;
  prix: number;
  author: string;
  photoUrl: string;
  datePublication: number;
  categorie: Categorie;
}