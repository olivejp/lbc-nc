import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../../services/annonces.service';
import { Annonce } from '../../domain/annonce.model';
import { IPagedResults } from '../../shared/interface';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-annonce-list',
  templateUrl: './annonce-list.component.html',
  styleUrls: ['./annonce-list.component.css']
})
export class AnnonceListComponent implements OnInit {

  annonces: Annonce[] = [];
  pageSize = 8;
  totalRecords = 0;

  constructor(private annonceService: AnnonceService,
    private logger: LoggerService) { }

  ngOnInit() {
    this.getAnnoncesPage(1);
  }

  getAnnoncesPage(page: number) {
    this.annonceService.getAnnoncesPage((page - 1) * this.pageSize, this.pageSize)
      .subscribe((response: IPagedResults<Annonce[]>) => {
        this.annonces = response.results;
        this.totalRecords = response.totalRecords;
      },
        (err: any) => this.logger.log(err),
        () => this.logger.log('getAnnoncesPage() retrieved annonces for page: ' + page));
  }

  pageChanged(page: number) {
    this.getAnnoncesPage(page);
  }
}
