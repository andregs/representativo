import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 're-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Representativo';
  private readonly auth: AuthService;
  private readonly router: Router;

  constructor(auth: AuthService, router: Router) {
    this.auth = auth;
    this.router = router;
  }

  ngOnInit() {
    this.auth.tryAutomaticLogin();
    this.auth.onLogout()
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
