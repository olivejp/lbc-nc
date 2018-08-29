import { Component, OnInit } from '@angular/core';
import { Annonce } from '../../domain/annonce.model';
import { AnnonceService } from '../../services/annonces.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CategorieService } from '../../services/categories.service';
import { Categorie } from '../../domain/categorie.model';

@Component({
  selector: 'app-create-annonce',
  templateUrl: './create-annonce.component.html',
  styleUrls: ['./create-annonce.component.css']
})
export class CreateAnnonceComponent implements OnInit {

  annonce: Annonce;
  categories: Categorie[] = [];
  selectedCategorie: any;

  constructor(private annonceService: AnnonceService,
    private authService: AuthenticationService,
    private categorieService: CategorieService,
    private router: Router) {
  }

  ngOnInit() {
    this.categorieService.retrieveFromServerCategories().subscribe(
      categoriesReturned => {
        this.categories = categoriesReturned;
        this.selectedCategorie = categoriesReturned[0];
      }
    );

    this.annonce = new Annonce();
    this.annonce.photoUrl = 'https://picsum.photos/200/200?image=' + Math.floor(Math.random() * Math.floor(450));
  }

  selectChange(args) {
    this.selectedCategorie = this.categories.find((categorieLook) => { return categorieLook.titre == args.target.value });
  }

  postAnnonce() {
    this.annonce.author = this.authService.getUserName();
    this.annonce.datePublication = Date.now();
    this.annonce.categorie = this.selectedCategorie;
    this.annonceService.addAnnonce(this.annonce).then(
      annonce => {
        this.annonce = new Annonce();
        this.router.navigate(['/annonces']);
      }
    );
  }
}
