import { Injectable } from '@angular/core';
import { Annonce } from '../domain/annonce.model';
import { HttpClient } from '@angular/common/http';
import { BackendService } from './backend.service';
import { Categorie } from '../domain/categorie.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private categorieBaseUrl = "/api/categories"
  private categorieConcatUrl: string;

  constructor(private http: HttpClient, private backEndService: BackendService) {
    this.categorieConcatUrl = this.backEndService.getBackendUrl().concat(this.categorieBaseUrl);
  }

  retrieveFromServerCategories(): Observable<Categorie[]> {
    return this.http.get<Annonce[]>(this.categorieConcatUrl);
  }
}
