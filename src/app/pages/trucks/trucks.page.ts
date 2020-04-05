import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../Services/services.service';
import { Platform, NavController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { TranslateConfigService } from '../../translate-config.service';

@Component({
  selector: 'app-trucks',
  templateUrl: './trucks.page.html',
  styleUrls: ['./trucks.page.scss'],
})
export class TrucksPage implements OnInit {

  rows: Array<any>=[];
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

  constructor(
    private truckServices: ServicesService,
    public navCtrl: NavController,
    private router: Router,
    private translateConfigService: TranslateConfigService
    ) { 
      this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    }

  ngOnInit() {
    this.truckServices.getTrucks()
    .subscribe(
      (trucks) => {
        for(let data in trucks){
          this.rows.push({
            plate: trucks[data].unidad_placa,
            brand: trucks[data].unidad_marca,
            model: trucks[data].unidad_modelo,
            year: trucks[data].unidad_ano,
            capacity: trucks[data].unidad_capacidad,
            driver: trucks[data].unidad_conductor,
            route: trucks[data].unidad_ruta,
            warehouse: trucks[data].unidad_almacen
          });
          this.rows=[...this.rows]
      }
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
        console.log(response)
      },
      (error) => {
        console.error(error);
      }
    )
  }

}
