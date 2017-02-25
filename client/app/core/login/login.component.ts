import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 're-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  auth0Redirect = true;
  auth0Remember = true;

  private readonly auth: AuthService;
  private readonly router: Router;

  constructor(auth: AuthService, router: Router) {
    this.auth = auth;
    this.router = router;
  }

  ngOnInit() {
    if (!this.auth.authenticated) {
      this.auth.displayLoginForm('login', this.auth0Redirect, this.auth0Remember);
    }
    this.auth.user.subscribe(() => this.router.navigate(['/']));
  }

}
