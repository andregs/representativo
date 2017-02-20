import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';

@Component({
  selector: 're-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Representativo';
  private readonly auth: AuthService;

  constructor(auth: AuthService) {
    this.auth = auth;
  }
}
