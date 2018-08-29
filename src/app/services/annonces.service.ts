import { Injectable } from '@angular/core';
import { Annonce } from '../domain/annonce.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BackendService } from './backend.service';
import { Observable, zip } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PagedResults } from '../domain/paged.model';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  private annonceBaseUrl = "/api/annonces"
  private annoncesConcatUrl: string;
  private listAnnonce: Annonce[];

  constructor(private http: HttpClient, private backEndService: BackendService, private loggerService: LoggerService) {
    this.annoncesConcatUrl = this.backEndService.getBackendUrl().concat(this.annonceBaseUrl);
  }

  retrieveFromServerListAnnonce(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(this.annoncesConcatUrl);
  }

  findAnnonce(id: number): Promise<Annonce> {
    console.log('Recherche de l\'id suivante'  + id)
    return this.http.get<Annonce>(this.annoncesConcatUrl + "/" + id).toPromise();
  }

  getListAnnonce(): Annonce[] {
    return this.listAnnonce;
  }

  addAnnonce(annonce: Annonce): Promise<Annonce> {
    if (!this.listAnnonce) {
      this.listAnnonce = [];
    }
    this.listAnnonce.push(annonce);
    return this.insertAnnonce(annonce);
  }

  search(keyword: string): Annonce[] {
    const listAnnonceSearch: Annonce[] = [];
    if (this.listAnnonce) {
      this.listAnnonce.forEach(function (annonce) {
        if (annonce.description.indexOf(keyword) >= 0 || annonce.titre.indexOf(keyword) >= 0) {
          listAnnonceSearch.push(annonce);
        }
      }
      );
    }
    return listAnnonceSearch;
  }

  insertAnnonce(annonce: Annonce): Promise<Annonce> {
    return this.http.post<Annonce>(this.annoncesConcatUrl, annonce).toPromise();
  }

  getAnnoncesPage(page: number, pageSize: number): Observable<PagedResults<Annonce>> {
    return zip(
      this.getAnnoncesCount(),
      this.getAnnoncesPerPage(page, pageSize),
      (total: number, annonces: Annonce[]) => {
        return new PagedResults<Annonce>(annonces, total);
      }
    );
  }

  getAnnoncesCount(): Observable<number> {
    return this.http.get<number>(`${this.annoncesConcatUrl}count`);
  }

  getAnnoncesPerPage(page: number, pageSize: number): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.annoncesConcatUrl}/page/${page}/${pageSize}`, { observe: 'response' })
      .pipe(
        map(res => {
          return res.body as Annonce[];
        }),
        catchError(this.handleError)
      );
  }

  // Callback qui permet de récupérer les erreurs
  private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      this.loggerService.logError(errMessage);
    }
    return Observable.throw(error || 'Grosse erreur');
  }
}
