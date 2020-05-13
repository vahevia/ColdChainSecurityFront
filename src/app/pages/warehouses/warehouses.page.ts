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
  selector: 'app-warehouses',
  templateUrl: './warehouses.page.html',
  styleUrls: ['./warehouses.page.scss'],
})
export class WarehousesPage implements OnInit {

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
    private warehouseServices: ServicesService,
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
    this.getWarehouses();

  }

  ionViewWillEnter() {
    this.getWarehouses();
  }

  getWarehouses(){
    this.warehouseServices.getWareHouses()
    .subscribe(
      (warehouses) => {
        this.rows = warehouses
        for(let data in warehouses){
          this.aux.push({
            direccion: [warehouses[data].almacen_direccion_avenida, warehouses[data].almacen_direccion_calle, 
            warehouses[data].almacen_direccion_zona , warehouses[data].almacen_direccion_edificio ,
            warehouses[data].almacen_direccion_apartamento , warehouses[data].almacen_direccion_nro_apartamento ,
            warehouses[data].almacen_direccion_casa , warehouses[data].almacen_direccion_nro_casa ,
            warehouses[data].almacen_direccion_lugar_estado , warehouses[data].almacen_direccion_lugar_pais].filter(function (el) {return el != null && el != "";})
          });
          this.rows[data].direccion = this.aux[data].direccion
        }
        this.aux = [];
      console.log(this.rows);
      },
      (error) => {
        console.error(error);
      }
    )
  }

  createWareh(){
    this.navCtrl.navigateForward('create-warehouses');
  }

  editWareh(name){
    let navigationExtras: NavigationExtras = {
      state: {
        editando: true,
        id: name 
      }
    }
    this.router.navigate(['create-warehouses'], navigationExtras);
  }

  deleteWareh(name){
    this.warehouseServices.deleteWareHouse(name)
    .subscribe(
      (response) => {
        this.getWarehouses();
        console.log(response)
      },
      (error) => {
        console.error(error);
      }
    )
  }

}
