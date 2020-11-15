import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServicesService } from '../../Services/services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateConfigService } from '../../translate-config.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.page.html',
  styleUrls: ['./create-company.page.scss'],
})
export class CreateCompanyPage implements OnInit {

  editando: Boolean;
  rif: String;
  nombre: String;
  nombreCambiar: String;
  descripcion: String;
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
  horarios: {};
  horario: string;
  pais: string;
  estado: String;
  ciudad: string;
  selectedLanguage: any;
  isdisabled: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, private companyService: ServicesService, 
    private navCtrl: NavController, 
    private translateConfigService: TranslateConfigService,
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.editando = this.router.getCurrentNavigation().extras.state.editando;
        if (this.editando === true) {
          this.rif = this.router.getCurrentNavigation().extras.state.id;
          this.isdisabled = true;
        }
      }
    })
   }

  ngOnInit() {

    this.companyService.getCountries()
    .subscribe(
      (paises) => {
        this.countries = paises;
    },
      (error) => {
        console.error(error);
      }
    );

    this.companyService.getCompaniesSchedules()
    .subscribe(
      (sc) => {
        this.horarios = sc
      }
    )

    if (this.editando === true) {
      this.companyService.getCompanyByRIF(this.rif)
      .subscribe(
        (company) => {
          this.nombre = company[0].comercio_nombre,
          this.nombreCambiar = company[0].comercio_nombre,
          this.rif = company[0].comercio_rif,
          this.descripcion = company[0].comercio_descripcion,
          this.avenida = company[0].comercio_direccion_avenida, 
          this.calle = company[0].comercio_direccion_calle, 
          this.zona = company[0].comercio_direccion_zona, 
          this.edificio = company[0].comercio_direccion_edificio,
          this.apartamento = company[0].comercio_direccion_apartamento, 
          this.nroApartamento = company[0].comercio_direccion_nro_apartamento,
          this.casa = company[0].comercio_direccion_casa, 
          this.nroCasa = company[0].comercio_direccion_nro_casa,
          this.estado = company[0].comercio_direccion_estado, 
          this.pais = company[0].comercio_direccion_pais; 
          console.log(company);
        },
        (error) => {
          console.log(error)
        }
      )
    }

  }

  onChangeCountry(){
    console.log('COUNTRY', this.pais)
    if (this.pais){
      this.companyService.getStateByCountry(this.pais)
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

  createCompany(event) {
    console.log('NOMBRE', this.nombre)
    var company = {
      nombre: this.nombre,
      nombreCambiar: this.nombreCambiar,
      rif: this.rif,
      descripcion: this.descripcion,
      avenida: this.avenida,
      calle: this.calle,
      zona: this.zona,
      edificio: this.edificio,
      apartamento: this.apartamento,
      nro_apartamento: this.nroApartamento,
      casa: this.casa,
      nro_casa: this.nroCasa,
      lugar: this.estado,
      horario: this.horario
    }
    if (this.editando) {
      this.companyService.updateCompany(company)
      .subscribe(
        (response) => {
          console.log(response)
          this.navCtrl.navigateRoot('/company')
          this.editando = false;
        })
    } else {
    this.companyService.addNewCompany(company)
    .subscribe(
      (response) => {
        console.log(response)
        this.navCtrl.navigateRoot('/company')
        this.editando = false;
      })
    }
    
  }


}
