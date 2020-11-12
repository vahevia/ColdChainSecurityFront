import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../Services/services.service';
import { Platform, NavController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { TranslateConfigService } from '../../translate-config.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AuthenticationService } from '../../Services/authentication.service';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-static-units',
  templateUrl: './static-units.page.html',
  styleUrls: ['./static-units.page.scss'],
})
export class StaticUnitsPage implements OnInit {

  ColumnMode = ColumnMode;
  rows: {};
  aux: Array<any> = [];
  tableStyle='material';
  nombre: string;
  cantUnid: number;
  direccion: string;
  selectedLanguage: string;
  currentUser: User;
  isAdmin: boolean;
  isSuper: boolean;
  auto: any;

  constructor(
    private staticUnitsServices: ServicesService,
    public navCtrl: NavController,
    private router: Router,
    private translateConfigService: TranslateConfigService,
    private authenticationService: AuthenticationService
    ) {
      this.translateConfigService.getDefaultLanguage();
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.isAdmin = this.currentUser.rol === Role.Admin;
      this.isSuper = this.currentUser.rol === Role.super;
     }

  ngOnInit() {
    this.getStaticUnits();

  }

  ionViewWillEnter() {
    this.getStaticUnits();
  }

  getStaticUnits(){
    this.staticUnitsServices.getStaticUnits()
    .subscribe(
      (su) => {
        this.rows = su
        console.log(this.rows);
      },
      (error) => {
        console.error(error);
      }
    )
  }

  createStaticUnit(){
    this.navCtrl.navigateForward('create-static-units');
  }

  editStaticUnit(id){
    let navigationExtras: NavigationExtras = {
      state: {
        editando: true,
        id: id 
      }
    }
    this.router.navigate(['create-static-units'], navigationExtras);
  }

  deleteStaticUnit(id){
    this.staticUnitsServices.deleteStaticUnit(id)
    .subscribe(
      (response) => {
        this.getStaticUnits();
        console.log(response)
      },
      (error) => {
        console.error(error);
      }
    )
  }

}
