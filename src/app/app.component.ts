import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './Services/authentication.service';
import { Role } from './models/role';
import { User } from './models/user';
import { TranslateConfigService } from './translate-config.service';

import { Pages } from './interfaces/pages';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public appPages: Array<Pages>;
  currentUser: User;
  selectedLanguage: any;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    private router: Router,
    private authenticationService: AuthenticationService,
    private translateConfigService: TranslateConfigService
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.appPages = [
      {
        title: 'MENU.home',
        url: '/home-results',
        direct: 'root',
        icon: 'home'
      },
      {
        title: 'MENU.users',
        url: '/users',
        direct: 'forward',
        icon: 'people'
      },
      {
        title: 'MENU.units',
        url: '/trucks',
        direct: 'forward',
        icon: 'car'
      },
      {
        title: 'MENU.warehouses',
        url: '/warehouses',
        direct: 'forward',
        icon: 'home'
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
    console.log('el que tal')
    this.authenticationService.logout();
    this.router.navigate(['/'])
  }
}
