import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceDetailComponent } from './annonce-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AnnonceComponent } from '../annonce/annonce.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BackendService } from '../../services/backend.service';
import { Annonce } from '../../domain/annonce.model';

describe('AnnonceDetailComponent', () => {
    let component: AnnonceDetailComponent;
    let fixture: ComponentFixture<AnnonceDetailComponent>;
    let httpController: HttpTestingController;
    let backendService: BackendService;

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

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AnnonceDetailComponent, AnnonceComponent],
            imports: [
                FormsModule,
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [{
                provide: ActivatedRoute,
                useValue: {
                    paramMap: of({ id: 1 })
                }
            }, BackendService]
        }).compileComponents();

        httpController = TestBed.get(HttpTestingController);
        backendService = TestBed.get(BackendService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AnnonceDetailComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // it('should route to the right annonce', () => {
    //     component.ngOnInit();

    //     // On mocke la réponse
    //     let getAnnonceRequest = httpController.expectOne(backendService.getBackendUrl() + '/api/annonces/1');
    //     expect(getAnnonceRequest.request.method).toEqual('GET');
    //     getAnnonceRequest.flush(fakeDataFromServer);

    //     httpController.verify();
    // });
});
