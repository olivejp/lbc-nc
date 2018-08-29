import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceListComponent } from './annonce-list.component';
import { AnnonceService } from '../../services/annonces.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoggerService } from '../../services/logger.service';
import { AnnonceComponent } from '../annonce/annonce.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';

describe('AnnonceListComponent', () => {
    let component: AnnonceListComponent;
    let fixture: ComponentFixture<AnnonceListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AnnonceListComponent, AnnonceComponent, PaginationComponent],
            imports: [
                FormsModule,
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                AnnonceService,
                LoggerService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AnnonceListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
