import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AnnonceService } from './annonces.service';
import { LoggerService } from './logger.service';
import { BackendService } from './backend.service';
import { Annonce } from '../domain/annonce.model';
import { Categorie } from '../domain/categorie.model';
import { CategorieService } from './categories.service';
import { of } from 'rxjs';

describe('AnnoncesService', () => {

  let httpController: HttpTestingController;

  let fakeDataToSave: Annonce = {
    "id": null,
    "titre": "le titre",
    "description": "ma description",
    "categorie": { "titre": "Immobilier" },
    "author": "OLIVE",
    "prix": 123,
    "photoUrl": "kjsdfkl",
    "datePublication": 132789546
  };

  let fakeDataFromServer: Annonce = {
    "id": 1,
    "titre": "le titre",
    "description": "ma description",
    "categorie": { "titre": "Immobilier" },
    "author": "OLIVE",
    "prix": 123,
    "photoUrl": "kjsdfkl",
    "datePublication": 132789546
  };

  let fakeCategorieArray: Categorie[] = [{ "titre": "Automobile" }, { "titre": "Immobilier" }];

  beforeEach(() => {

    const categorieService = jasmine.createSpyObj('CategorieService', ['retrieveFromServerCategories']);
    categorieService.retrieveFromServerCategories.and.returnValue(of(fakeCategorieArray));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AnnonceService, LoggerService, BackendService, { provide: CategorieService, useValue: categorieService }]
    });

    httpController = TestBed.get(HttpTestingController);
  });



  it('should test categorie array', inject([CategorieService], (service: CategorieService) => {
    service.retrieveFromServerCategories().subscribe((tableau) => {
      expect(tableau).toEqual(fakeCategorieArray);
    });
  }));



  it('should insert into annonces server', inject([AnnonceService, BackendService], (service: AnnonceService, serviceBackend: BackendService) => {
    // On envoie la requête HTTP
    service.insertAnnonce(fakeDataToSave).then(result => {
      expect(result).toEqual(fakeDataFromServer);
    });

    let postAnnonceRequest = httpController.expectOne(serviceBackend.getBackendUrl() + '/api/annonces');
    expect(postAnnonceRequest.request.method).toEqual('POST');
    postAnnonceRequest.flush(fakeDataFromServer);
    httpController.verify();
  }));



  it('should get first annonce from server', inject([AnnonceService, BackendService], (service: AnnonceService, serviceBackend: BackendService) => {
    // On envoie la requête HTTP
    service.findAnnonce(1)
      .then(result => {
        expect(result).toEqual(fakeDataFromServer);
      }).catch(error => {
        expect(false).toBeTruthy();
      });

    // On mocke la réponse
    let getAnnonceRequest = httpController.expectOne(serviceBackend.getBackendUrl() + '/api/annonces/1');
    expect(getAnnonceRequest.request.method).toEqual('GET');
    getAnnonceRequest.flush(fakeDataFromServer, { status: 201, statusText: 'Insertion réussie' });
    httpController.verify();
  }));



  it('should get first annonce from server', inject([AnnonceService, BackendService], (service: AnnonceService, serviceBackend: BackendService) => {
    // On envoie la requête HTTP
    service.findAnnonce(1)
      .then(result => {
        expect(result).toEqual(fakeDataFromServer);
      }).catch(error => {
        expect(false).toBeTruthy();
      });

    // On mocke la réponse
    let getAnnonceRequest = httpController.expectOne(serviceBackend.getBackendUrl() + '/api/annonces/1');
    expect(getAnnonceRequest.request.method).toEqual('GET');
    getAnnonceRequest.flush(fakeDataFromServer, { status: 201, statusText: 'Insertion réussie' });
    httpController.verify();
  }));
});
