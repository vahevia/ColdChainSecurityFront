import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../Services/services.service';
import { Platform, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateConfigService } from '../../translate-config.service';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.page.html',
  styleUrls: ['./warehouses.page.scss'],
})
export class WarehousesPage implements OnInit {

  rows: Array<any>=[];
  tableStyle='material';
  nombre: string;
  cantUnid: number;
  direccion: string;
  selectedLanguage: string;
  constructor(
    private warehouseServices: ServicesService,
    public navCtrl: NavController,
    private router: Router,
    private translateConfigService: TranslateConfigService
    ) { }

  ngOnInit() {
    this.warehouseServices.getWareHouses()
    .subscribe(
      (warehouses) => {
        for(let data in warehouses){
          this.rows.push({
            nombre: warehouses[data].almacen_nombre,
            cantUnid: warehouses[data].almacen_cantidad_unidades,
            direccion: [warehouses[data].almacen_direccion_avenida, warehouses[data].almacen_direccion_calle, 
            warehouses[data].almacen_direccion_zona , warehouses[data].almacen_direccion_edificio ,
            warehouses[data].almacen_direccion_apartamento , warehouses[data].almacen_direccion_nro_apartamento ,
            warehouses[data].almacen_direccion_casa , warehouses[data].almacen_direccion_nro_casa ,
            warehouses[data].almacen_direccion_lugar_estado , warehouses[data].almacen_direccion_lugar_pais].filter(function (el) {return el != null && el != "";}),
            // direccion: warehouses[data].almacen_direccion_avenida +' '+ warehouses[data].almacen_direccion_calle +
            // ' '+ warehouses[data].almacen_direccion_zona +' '+ warehouses[data].almacen_direccion_edificio +' '+
            // warehouses[data].almacen_direccion_apartamento +' '+ warehouses[data].almacen_direccion_nro_apartamento +' '+
            // warehouses[data].almacen_direccion_casa +' '+ warehouses[data].almacen_direccion_nro_casa +'\n'+
            // warehouses[data].almacen_direccion_lugar_estado +'\n'+ warehouses[data].almacen_direccion_lugar_pais

            // direccion_avenida: warehouses[data].almacen_direccion_avenida,
            // direccion_calle: warehouses[data].almacen_direccion_calle,
            // direccion_zona: warehouses[data].almacen_direccion_zona,
            // direccion_edificio: warehouses[data].almacen_direccion_edificio,
            // direccion_apartamento: warehouses[data].almacen_direccion_apartamento,
            // direccion_nro_apartamento: warehouses[data].almacen_direccion_nro_apartamento,
            // direccion_casa: warehouses[data].almacen_direccion_casa,
            // direccion_nro_casa: warehouses[data].almacen_direccion_nro_casa,
            // direccion_lugar_estado: warehouses[data].almacen_direccion_lugar_estado,
            // direccion_lugar_pais: warehouses[data].almacen_direccion_lugar_pais
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

  createWareh(){
    this.navCtrl.navigateForward('create-warehouses');
  }

}
