import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 're-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private readonly auth: AuthService;

  constructor(auth: AuthService) {
    this.auth = auth;
  }

  ngOnInit() {
    this.auth.displayLoginForm('login');
  }

}
