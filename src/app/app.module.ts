import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { AnnonceListComponent } from './components/annonce-list/annonce-list.component';
import { LoginComponent } from './components/login/login.component';
import { CreateAnnonceComponent } from './components/create-annonce/create-annonce.component';
import { AnnonceComponent } from './components/annonce/annonce.component';
import { SearchComponent } from './components/search/search.component';
import { AnnonceService } from './services/annonces.service';
import { AuthenticationService } from './services/authentication.service';
import { BackendService } from './services/backend.service';
import { HttpClientModule } from '@angular/common/http';
import { AnnonceDetailComponent } from './components/annonce-detail/annonce-detail.component';
import { CreateAnnonceGuard } from './guard/create-annonce.guard';
import { NonAuthorizedComponent } from './components/non-authorized/non-authorized.component';
import { BidonComponent } from './bidon/bidon.component';
import { BiduleComponent } from './bidule/bidule.component';
import { LoggerService } from './services/logger.service';
import { PaginationModule } from './shared/pagination/pagination.module';
import { AnnonceRoutingModule } from './components/annonce-detail/annonce-routing.module';
import { AlertComponent } from './components/alert/alert.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'annonces', component: AnnonceListComponent },
  { path: 'annonces/:id', component: AnnonceDetailComponent },
  { path: 'create-annonce', component: CreateAnnonceComponent, canActivate: [CreateAnnonceGuard] },
  { path: 'search', component: SearchComponent },
  { path: 'non-authorized', component: NonAuthorizedComponent },
  { path: '**', redirectTo: '/annonces' },
  {
    path: '',
    redirectTo: '/annonces',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AnnonceListComponent,
    LoginComponent,
    CreateAnnonceComponent,
    AnnonceComponent,
    SearchComponent,
    AnnonceDetailComponent,
    NonAuthorizedComponent,
    BidonComponent,
    BiduleComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    PaginationModule,
    AnnonceRoutingModule,
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true,
        useHash: true
      }
    )
  ],
  exports: [HttpClientModule],
  providers: [
    AnnonceService,
    AuthenticationService,
    BackendService,
    LoggerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
