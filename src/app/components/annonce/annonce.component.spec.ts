import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceComponent } from './annonce.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Annonce } from '../../domain/annonce.model';

describe('AnnonceComponent', () => {
    let component: AnnonceComponent;
    let fixture: ComponentFixture<AnnonceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AnnonceComponent],
            imports: [RouterTestingModule.withRoutes([])]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AnnonceComponent);
        component = fixture.componentInstance;
        component.annonce = new Annonce();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
