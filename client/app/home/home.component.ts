import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import User from '../../../server/user/user';

@Component({
  selector: 're-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  private readonly auth: AuthService;
  user: User;

  constructor(auth: AuthService) {
    this.auth = auth;
  }

  ngOnInit() {
    this.auth.user.subscribe(
      user => this.user = user,
    );
  }

}
