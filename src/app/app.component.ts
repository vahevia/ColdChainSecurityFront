import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './Services/authentication.service';
import { Role } from './models/role';
import { User } from './models/user'

import { Pages } from './interfaces/pages';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public appPages: Array<Pages>;
  currentUser: User;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.appPages = [
      {
        title: 'Home',
        url: '/home-results',
        direct: 'root',
        icon: 'home'
      },
      {
        title: 'Users',
        url: '/users',
        direct: 'forward',
        icon: 'people'
      },
      {
        title: 'Units',
        url: '/trucks',
        direct: 'forward',
        icon: 'car'
      },
      {
        title: 'Warehouses',
        url: '/warehouses',
        direct: 'forward',
        icon: 'home'
      },
      {
        title: 'Log Out',
        url: '/',
        direct: 'forward',
        icon: 'log-out'
      }
    ];

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    }).catch(() => {});
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.cargo === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
  }
}
