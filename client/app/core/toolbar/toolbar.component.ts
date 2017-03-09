import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 're-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {

  readonly auth: AuthService;
  readonly router: Router;

  constructor(auth: AuthService, router: Router) {
    this.auth = auth;
    this.router = router;
  }

  goToProfile() {
    this.router.navigate(['perfil']);
  }

}
