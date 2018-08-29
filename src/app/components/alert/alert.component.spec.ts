import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Annonce } from '../../domain/annonce.model';

describe('AlertComponent', () => {
    let component: AlertComponent;
    let fixture: ComponentFixture<AlertComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AlertComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AlertComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
