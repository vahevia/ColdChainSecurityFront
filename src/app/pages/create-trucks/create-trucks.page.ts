import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServicesService } from '../../Services/services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateConfigService } from '../../translate-config.service';

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
  warehouse: string;
  almacenes: Array<any>=[];

  constructor(
    private route: ActivatedRoute, 
    private router: Router, private truckService: ServicesService, 
    private navCtrl: NavController, private translateConfigService: TranslateConfigService
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.editando = this.router.getCurrentNavigation().extras.state.editando;
        if (this.editando === true) {
          this.plate = this.router.getCurrentNavigation().extras.state.id;
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
          this.warehouse = truck[0].unidad_almacen
        },
        (error) => {
          console.log(error)
        }
      )
    }

    this.truckService.getWareHousesNames()
      .subscribe(
        (wh) => {
          for(let data in wh){
            this.almacenes.push({
              nombre: wh[data].almacen_nombre
            });
            this.almacenes=[...this.almacenes]
        }
      },
        (error) => {
          console.error(error);
        }
      );

  }

  createTruck(){
      var truck = {
        marca: this.brand,
        capacidad: this.capacity,
        conductor: this.driver,
        modelo: this.model,
        placa: this.plate,
        ruta: this.routee,
        nombreAlmacen: this.warehouse,
        ano: this.year
      }
      if (this.editando === true) {
        this.truckService.updateTruck(truck)
        .subscribe(
          (response) => {
            this.navCtrl.navigateRoot('/trucks')
            console.log(truck)
            console.log(response)
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
