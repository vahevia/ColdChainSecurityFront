import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../Services/services.service';
import { Platform, NavController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { TranslateConfigService } from '../../translate-config.service';
import { AuthenticationService } from '../../Services/authentication.service';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-trucks',
  templateUrl: './trucks.page.html',
  styleUrls: ['./trucks.page.scss'],
})
export class TrucksPage implements OnInit {

  rows: {};
  tableStyle='material';
  plate: string;
  brand: number;
  model: string;
  year: string;
  capacity: string;
  driver: string;
  route: string;
  warehouse: string;
  selectedLanguage: string;
  currentUser: User;
  isAdmin: boolean;
  isSuper: boolean;
  auto: any;
  force: any;

  constructor(
    private truckServices: ServicesService,
    public navCtrl: NavController,
    private router: Router,
    private translateConfigService: TranslateConfigService,
    private authenticationService: AuthenticationService
    ) { 
      this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.isAdmin = this.currentUser.rol === Role.Admin;
      this.isSuper = this.currentUser.rol === Role.super;
    }

  ngOnInit() {
    this.getTrucks();
  }
  
  ionViewWillEnter() {
    this.getTrucks();
  }

  getTrucks(){
    this.truckServices.getTrucks()
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

  createTruck() {
    this.navCtrl.navigateForward('create-trucks');
  }

  editTruck(plate){
    let navigationExtras: NavigationExtras = {
      state: {
        editando: true,
        id: plate 
      }
    }
    this.router.navigate(['create-trucks'], navigationExtras); 
  }

  deleteTruck(value){
    this.truckServices.deleteTruck(value)
    .subscribe(
      (response) => {
        this.getTrucks();
        console.log(response)
      },
      (error) => {
        console.error(error);
      }
    )
  }

}
