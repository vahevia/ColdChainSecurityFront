import { Component, OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServicesService } from '../../Services/services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateConfigService } from '../../translate-config.service';

@Component({
  selector: 'app-create-warehouses',
  templateUrl: './create-warehouses.page.html',
  styleUrls: ['./create-warehouses.page.scss'],
})
export class CreateWarehousesPage implements OnInit {

  editando: Boolean;
  nombre: String;
  nuevoNombre: String;
  avenida: String;
  calle: String;
  zona: String;
  edificio: String;
  apartamento: String;
  nroApartamento: String;
  casa: String;
  nroCasa: String;
  countries: {};
  states: {};
  cities: {};
  pais: string;
  estado: String;
  ciudad: string;
  selectedLanguage: any;
  isdisabled: boolean = false;
  companias: {};
  compania: String;
  
  constructor(
    private route: ActivatedRoute, 
    private router: Router, private warehouseService: ServicesService, 
    private navCtrl: NavController, 
    private translateConfigService: TranslateConfigService
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.editando = this.router.getCurrentNavigation().extras.state.editando;
        if (this.editando === true) {
          this.nombre = this.router.getCurrentNavigation().extras.state.id;
          this.isdisabled = true;
        }
      }
    })
   }

  ngOnInit() {
    this.warehouseService.getCountries()
    .subscribe(
      (paises) => {
        this.countries = paises;
    },
      (error) => {
        console.error(error);
      }
    );


    if (this.editando === true) {
      this.warehouseService.getWareHouseByName(this.nombre)
      .subscribe(
        (warehouse) => {
          this.nombre = warehouse[0].almacen_nombre,
          this.nuevoNombre = warehouse[0].almacen_nombre,
          this.avenida = warehouse[0].almacen_direccion_avenida, 
          this.calle = warehouse[0].almacen_direccion_calle, 
          this.zona = warehouse[0].almacen_direccion_zona , 
          this.edificio = warehouse[0].almacen_direccion_edificio ,
          this.apartamento = warehouse[0].almacen_direccion_apartamento , 
          this.nroApartamento = warehouse[0].almacen_direccion_nro_apartamento ,
          this.casa = warehouse[0].almacen_direccion_casa , 
          this.nroCasa = warehouse[0].almacen_direccion_nro_casa ,
          this.estado = warehouse[0].almacen_direccion_lugar_estado , 
          this.pais = warehouse[0].almacen_direccion_lugar_pais;
          console.log(warehouse);
        },
        (error) => {
          console.log(error)
        }
      )
    }

    this.warehouseService.getCompanies()
        .subscribe(
          (comp) => {
          this.companias = comp
          },
          (error) => {
            console.error(error);
          }
        ) 
  }


  onChangeCountry(){
    console.log('COUNTRY', this.pais)
    if (this.pais){
      this.warehouseService.getStateByCountry(this.pais)
        .subscribe(
          (estados) => {
            this.states = estados;
            this.cities = null;
          },
          (error) => {
            console.error(error);
          }
        );
    }else {
      this.states = null;
      this.cities = null;
    }
  }

  onChangeState() {
    console.log('STATE', this.estado)
    // if (this.estado){
    //   this.warehouseService.getCitiesByState(this.estado)
    //     .subscribe(
    //       (ciudades) => {
    //         this.cities = ciudades;
    //         console.log('ciudades', this.cities);
    //       },
    //       (error) => {
    //         console.error(error);
    //       }
    //     );
    // }else {
    //   this.cities = null;
    // }
  }

  createWareHouse(event) {
    console.log('NOMBRE', this.nombre)
    var warehouse = {
      nombre: this.nombre,
      avenida: this.avenida,
      calle: this.calle,
      zona: this.zona,
      edificio: this.edificio,
      apartamento: this.apartamento,
      nro_apartamento: this.nroApartamento,
      casa: this.casa,
      nro_casa: this.nroCasa,
      lugar: this.estado,
      nombreNuevo: this.nuevoNombre
    }
    if (this.editando) {
      this.warehouseService.updateWareHouse(warehouse)
      .subscribe(
        (response) => {
          console.log(response)
          this.navCtrl.navigateRoot('/warehouses')
          this.editando = false;
        })
    } else {
    this.warehouseService.addNewWarehouse(warehouse)
    .subscribe(
      (response) => {
        console.log(response)
        this.navCtrl.navigateRoot('/warehouses')
        this.editando = false;
      })
    }
    
  }

}
