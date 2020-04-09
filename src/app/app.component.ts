import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Pages } from './interfaces/pages';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public appPages: Array<Pages>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    private authService: AuthService
  ) {
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
      this.authService.getToken();
    }).catch(() => {});
  }

  logout() {
    this.authService.logout().subscribe(
      data => {
        //this.alertService.presentToast(data['message']);        
      },
      error => {
        console.log(error);
      },
      () => {
        this.navCtrl.navigateRoot('/');
      }
    );
  }
}
