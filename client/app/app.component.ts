import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';

@Component({
  selector: 're-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Representativo';
  private readonly auth: AuthService;

  constructor(auth: AuthService) {
    this.auth = auth;
  }

  ngOnInit() {
    this.auth.tryAutomaticLogin();
  }
}
