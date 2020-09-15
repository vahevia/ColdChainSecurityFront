import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../Services/services.service';
import { Platform, NavController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { TranslateConfigService } from '../../translate-config.service';
import { AuthenticationService } from '../../Services/authentication.service';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.page.html',
  styleUrls: ['./areas.page.scss'],
})
export class AreasPage implements OnInit {

  rows: {};
  tableStyle='material';
  selectedLanguage: string;
  currentUser: User;
  auto: any;
  force: any;

  constructor(
    private areaServices: ServicesService,
    public navCtrl: NavController,
    private router: Router,
    private translateConfigService: TranslateConfigService,
    private authenticationService: AuthenticationService
  ) {
    this.translateConfigService.getDefaultLanguage();
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

   ngOnInit() {
    this.getAreas();
  }
  
  ionViewWillEnter() {
    this.getAreas();
  }

  getAreas(){
    this.areaServices.getAllRubrosByCompanyId()
    .subscribe(
      (trucks) => {
        this.rows = trucks
        console.log(this.rows);
    },
      (error) => {
        console.error(error);
      }
    )
  }

  createArea() {
    this.navCtrl.navigateForward('create-areas');
  }

  editArea(name){
    let navigationExtras: NavigationExtras = {
      state: {
        editando: true,
        id: name 
      }
    }
    this.router.navigate(['create-areas'], navigationExtras); 
  }

  deleteArea(value){
    this.areaServices.deleteRubro(value)
    .subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.error(error);
      }
    )
  }



}
