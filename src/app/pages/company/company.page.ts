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
  selector: 'app-company',
  templateUrl: './company.page.html',
  styleUrls: ['./company.page.scss'],
})
export class CompanyPage implements OnInit {

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
  auto: any;

  constructor(private companyServices: ServicesService,
    public navCtrl: NavController,
    private router: Router,
    private translateConfigService: TranslateConfigService,
    ) {
      this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
     }

     ngOnInit() {
      this.getCompanies();
  
    }
  
    ionViewWillEnter() {
      this.getCompanies();
    }
  
    getCompanies(){
      this.companyServices.getCompanies()
      .subscribe(
        (company) => {
          this.rows = company
          for(let data in company){
            this.aux.push({
              direccion: [company[data].almacen_direccion_avenida, company[data].almacen_direccion_calle, 
              company[data].almacen_direccion_zona , company[data].almacen_direccion_edificio ,
              company[data].almacen_direccion_apartamento , company[data].almacen_direccion_nro_apartamento ,
              company[data].almacen_direccion_casa , company[data].almacen_direccion_nro_casa ,
              company[data].almacen_direccion_lugar_estado , company[data].almacen_direccion_lugar_pais].filter(function (el) {return el != null && el != "";})
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
  
    createCompany(){
      this.navCtrl.navigateForward('create-company');
    }
  
    editCompany(name){
      let navigationExtras: NavigationExtras = {
        state: {
          editando: true,
          id: name 
        }
      }
      this.router.navigate(['create-company'], navigationExtras);
    }
  
    // deleteCompany(name){
    //   this.companyServices.deleteCompany(name)
    //   .subscribe(
    //     (response) => {
    //       this.getCompanies();
    //       console.log(response)
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   )
    // }

}
