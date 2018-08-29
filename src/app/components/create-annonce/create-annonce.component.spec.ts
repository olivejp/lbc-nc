import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnnonceComponent } from './create-annonce.component';
import { AuthenticationService } from '../../services/authentication.service';
import { AnnonceService } from '../../services/annonces.service';
import { CategorieService } from '../../services/categories.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';


describe('CreateAnnonceComponent', () => {
  let component: CreateAnnonceComponent;
  let fixture: ComponentFixture<CreateAnnonceComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAnnonceComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        AnnonceService,
        AuthenticationService,
        CategorieService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAnnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
