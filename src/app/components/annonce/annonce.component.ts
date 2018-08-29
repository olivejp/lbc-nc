import { Component, OnInit, Input } from '@angular/core';
import { Annonce } from '../../domain/annonce.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css']
})
export class AnnonceComponent implements OnInit {

  constructor(private router: Router) { }

  @Input()
  annonce: Annonce;

  @Input()
  isList: boolean;

  ngOnInit() {
  }

  getPhotoUrl() {
    return (this.annonce && this.annonce.photoUrl && this.annonce.photoUrl.length > 0) ? this.annonce.photoUrl : "assets/test.svg";
  }

  goToDetail() {
    this.router.navigate(["/annonces", this.annonce.id])
  }

  inList(): boolean{
    return this.isList;
  }
}
