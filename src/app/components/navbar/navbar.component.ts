import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { CategorieService } from '../../services/categories.service';
import { Categorie } from '../../domain/categorie.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private keyword: string;
  private listCategorie: Categorie[];

  constructor(private router: Router, private authenticationService: AuthenticationService, private categorieService: CategorieService) {
    this.keyword = "";
  }

  ngOnInit() {
    this.getAllCategorie();
  }

  isUserAuth() {
    return this.authenticationService.isUserAuth();
  }

  signOut() {
    this.authenticationService.signOut();
  }

  search() {
    if (this.keyword && this.keyword.length > 0) {
      this.router.navigate(['/search', { keyword: this.keyword }]);
    } else {
      this.router.navigate(['/annocnes']);
    }
  }

  getUserName() {
    return this.authenticationService.getUserName();
  }

  getAllCategorie(){
    this.categorieService.retrieveFromServerCategories().subscribe(listReturned=>{
      this.listCategorie = listReturned;
    });
  }
}