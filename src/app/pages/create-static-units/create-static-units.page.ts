import { Component, OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServicesService } from '../../Services/services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateConfigService } from '../../translate-config.service';
import { AuthenticationService } from '../../Services/authentication.service';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-create-static-units',
  templateUrl: './create-static-units.page.html',
  styleUrls: ['./create-static-units.page.scss'],
})
export class CreateStaticUnitsPage implements OnInit {

  id: String;
  tipo: String;
  descripcion: String;
  almacen: String;
  almacenNuevo: String;
  rubro: String;
  almacenes: {};
  rubros: {};
  editando: Boolean;
  selectedLanguage: any;
  isdisabled: boolean = false;
  currentUser: User;
  isSuper: boolean;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, private staticUnitsServices: ServicesService, 
    private navCtrl: NavController, 
    private translateConfigService: TranslateConfigService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.isSuper = this.currentUser.rol === Role.super
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.editando = this.router.getCurrentNavigation().extras.state.editando;
        if (this.editando === true) {
          this.id = this.router.getCurrentNavigation().extras.state.id;
          this.isdisabled = true;
        }
      }
    })
   }

  ngOnInit() {
    this.getWareHouses();
    this.getRubros();

    if (this.editando === true) {
      this.staticUnitsServices.getStaticUnitByID(this.id)
      .subscribe(
        (su) => {
          this.id = su[0].eslabon_serial_id,
          this.tipo = su[0].eslabon_tipo,
          this.descripcion = su[0].eslabon_descripcion, 
          this.almacen = su[0].eslabon_almacen, 
          console.log(su);
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }

  getWareHouses(){
    this.staticUnitsServices.getWareHousesNames()
    .subscribe(
      (wh) => {
        this.almacenes = wh;
    },
      (error) => {
        console.error(error);
      }
    );
  }

  getRubros(){
    this.staticUnitsServices.getAllRubrosByCompanyId()
    .subscribe(
      (ru) => {
        this.rubros = ru
      },
      (error) => {
        console.error(error)
      }
    )
  }

  createsStaticUnit(event) {
    var staticUnit = {
      serialId: this.id,
      tipo: this.tipo,
      descripcion: this.descripcion,
      nombreAlmacen: this.almacen,
      rubro: this.rubro,
      comercio: this.currentUser.id_comercio,
      comercioL: null
    }
    this.staticUnitsServices.addNewStaticUnit(staticUnit)
    .subscribe(
      (response) => {
        console.log(response)
        this.navCtrl.navigateRoot('/static-units')
        this.editando = false;
      })    
  }

  updateStaticUnit(){
    var staticUnit = {
      serialId: this.id,
      nombreAlmacenActual: this.almacen,
      nombreAlmacenEnviar: this.almacenNuevo
    }
    this.staticUnitsServices.updateWareHouse(staticUnit)
      .subscribe(
        (response) => {
          console.log(response)
          this.navCtrl.navigateRoot('/static-units')
          this.editando = false;
        })
  }


}
