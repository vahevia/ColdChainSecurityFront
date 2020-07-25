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
  descripcion: String;
  rif: String;
  avenida: String;
  calle: String;
  zona: String;
  edificio: String;
  apartamento: String;
  nroApartamento: String;
  casa: String;
  nroCasa: String;
  lugar: String;
  horario: String;
  cantUnid: number;
  direccion: string;
  selectedLanguage: string;
  currentUser: User;
  isSuper: boolean;
  auto: any;

  constructor(private companyServices: ServicesService,
    public navCtrl: NavController,
    private router: Router,
    private translateConfigService: TranslateConfigService
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
              direccion: [company[data].comercio_direccion_avenida, company[data].comercio_direccion_calle, 
              company[data].comercio_direccion_zona , company[data].comercio_direccion_edificio ,
              company[data].comercio_direccion_apartamento , company[data].comercio_direccion_nro_apartamento ,
              company[data].comercio_direccion_casa , company[data].comercio_direccion_nro_casa ,
              company[data].comercio_direccion_estado , company[data].comercio_direccion_pais].filter(function (el) {return el != null && el != "";})
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
  
    editCompany(rif){
      let navigationExtras: NavigationExtras = {
        state: {
          editando: true,
          id: rif 
        }
      }
      this.router.navigate(['create-company'], navigationExtras);
    }
  
    deleteCompany(rif){
      this.companyServices.deleteCompany(rif)
      .subscribe(
        (response) => {
          this.getCompanies();
          console.log(response)
        },
        (error) => {
          console.error(error);
        }
      )
    }

}
