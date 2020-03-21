import { Component, OnInit } from '@angular/core';
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

  countries:  Array<any>=[];
  states:  Array<any>=[];
  country: String;
  state: String;
  selectedLanguage: any;
  
  constructor(
    private route: ActivatedRoute, 
    private router: Router, private warehouseService: ServicesService, 
    private navCtrl: NavController, private translateConfigService: TranslateConfigService
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
   }

  ngOnInit() {
    this.warehouseService.getCountries()
    .subscribe(
      (paises) => {
        for(let data in paises){
          this.countries.push({
            country: paises[data].lugar_nombre
          });
          this.countries=[...this.countries]
      }
      console.log(this.countries);
    },
      (error) => {
        console.error(error);
      }
    );

    this.warehouseService.getStateByCountry('Venezuela')
    .subscribe(
      (estados) => {
        for(let data in estados){
          this.states.push({
            state: estados[data].estado
          });
          this.states=[...this.states]
      }
      console.log(this.states);
    },
      (error) => {
        console.error(error);
      }
    );
  }

}
