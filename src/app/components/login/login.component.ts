import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthenticationService, private router: Router) { }

  userName: string;
  password: string;

  ngOnInit() {
    this.userName = "";
    this.password = "";
  }

  authenticate() {
    this.authService.setUserName(this.userName).toPromise().then(isAuth => {
      this.router.navigate(['/annonces']);
    });
  }
}
