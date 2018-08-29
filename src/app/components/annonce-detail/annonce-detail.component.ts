import { Component, OnInit } from '@angular/core';
import { Annonce } from '../../domain/annonce.model';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AnnonceService } from '../../services/annonces.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-annonce-detail',
  templateUrl: './annonce-detail.component.html',
  styleUrls: ['./annonce-detail.component.css']
})
export class AnnonceDetailComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private annonceService: AnnonceService, private router: Router) { }

  annonce: Annonce;
  annonce$: Observable<Annonce>;
  selectedId: number;

  ngOnInit() {
    console.log('je suis dans le ngOnInit');
    this.annonce$ = this.activeRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        console.log('je suis rentré');
        this.selectedId = +params.get('id');
        return this.annonceService.findAnnonce(this.selectedId);
      })
    );

    this.annonce$.subscribe(annonceReturned => {
      this.annonce = annonceReturned;
    });
  }

  getPhotoUrl() {
    return (this.annonce.photoUrl && this.annonce.photoUrl.length > 0) ? this.annonce.photoUrl : 'assets/test.svg';
  }
}
