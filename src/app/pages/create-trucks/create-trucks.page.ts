import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServicesService } from '../../Services/services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateConfigService } from '../../translate-config.service';
import { AuthenticationService } from '../../Services/authentication.service';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-create-trucks',
  templateUrl: './create-trucks.page.html',
  styleUrls: ['./create-trucks.page.scss'],
})
export class CreateTrucksPage implements OnInit {

  editando: boolean = false;
  selectedLanguage: string;
  plate: string;
  brand: number;
  model: string;
  year: string;
  capacity: string;
  driver: string;
  routee: string;
  company: string;
  rubro: string;
  companias: {};
  rubros: {};
  isdisabled: boolean = false;
  currentUser: User;
  isAdmin: boolean;
  isSuper: boolean;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, private truckService: ServicesService, 
    private navCtrl: NavController, private translateConfigService: TranslateConfigService,
    private authenticationService: AuthenticationService) {
      this.translateConfigService.getDefaultLanguage();
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.isAdmin = this.currentUser.rol === Role.Admin
      this.isSuper = this.currentUser.rol === Role.super
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.editando = this.router.getCurrentNavigation().extras.state.editando;
          if (this.editando === true) {
            this.plate = this.router.getCurrentNavigation().extras.state.id;
            this.isdisabled = true;
          }
      }
    })
   }

  ngOnInit() {
    if (this.editando === true) {
      this.truckService.getTruckByPlate(this.plate)
      .subscribe(
        (truck) => {
          this.brand = truck[0].unidad_marca,
          this.model = truck[0].unidad_modelo,
          this.year = truck[0].unidad_ano,
          this.capacity = truck[0].unidad_capacidad,
          this.driver = truck[0].unidad_conductor,
          this.routee = truck[0].unidad_ruta,
          this.company = truck[0].unidad_comercio
        },
        (error) => {
          console.log(error)
        }
      )
    } else {
      this.getCurrentUserCompanyName()
    }

    this.truckService.getCompaniesNames()
      .subscribe(
        (comp) => {
          this.companias = comp
          console.log(this.companias)
      },
        (error) => {
          console.error(error);
        }
      );

      this.getRubros()
  }

  getCurrentUserCompanyName(){
    this.truckService.getCompaniesByID()
    .subscribe(
      (nombre) => {
        this.company = nombre[0].comercio_nombre
      }
    )
  }

  getRubros(){
    this.truckService.getAllRubrosByCompanyId()
    .subscribe(
      (ru) => {
        this.rubros = ru
      },
      (error) => {
        console.error(error)
      }
    )
  }

  createTruck(){
      var truck = {
        marca: this.brand,
        capacidad: this.capacity,
        conductor: this.driver,
        modelo: this.model,
        placa: this.plate,
        ruta: this.routee,
        nombreComercio: this.company,
        ano: this.year,
        rubro: this.rubro
      }
      if (this.editando === true) {
        this.truckService.updateTruck(truck)
        .subscribe(
          (response) => {
            this.navCtrl.navigateRoot('/trucks')
            console.log(truck)
            console.log(response)
            this.editando = false;
          })
      } else {
      this.truckService.addNewTruck(truck)
      .subscribe(
        (response) => {
          this.navCtrl.navigateRoot('/trucks')
          console.log(truck)
          console.log(response)
        })
      }
      this.editando = false;     
  }

}
