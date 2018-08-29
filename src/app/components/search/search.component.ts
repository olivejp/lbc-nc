import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnonceService } from '../../services/annonces.service';
import { Annonce } from '../../domain/annonce.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private annonces: Annonce[];
  private keyword: string;

  constructor(private activatedRoute: ActivatedRoute, private annonceService: AnnonceService) { }

  ngOnInit() {
    this.keyword = this.activatedRoute.snapshot.params['keyword'];
    this.annonces = this.annonceService.search(this.keyword);
  }
}
