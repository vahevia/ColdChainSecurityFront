import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServicesService } from '../../Services/services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateConfigService } from '../../translate-config.service';
import { AuthenticationService } from '../../Services/authentication.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-create-areas',
  templateUrl: './create-areas.page.html',
  styleUrls: ['./create-areas.page.scss'],
})
export class CreateAreasPage implements OnInit {

  editando: Boolean;
  isDisabled: Boolean;
  selectedLanguage: any;
  name: String;
  type: String;
  min: Number;
  max: Number;
  compania: String;
  currentUser: User;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, private areaService: ServicesService, 
    private navCtrl: NavController, 
    private translateConfigService: TranslateConfigService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.editando = this.router.getCurrentNavigation().extras.state.editando;
        if (this.editando === true) {
          this.name = this.router.getCurrentNavigation().extras.state.id;
          this.isDisabled = true;
        }
      }
    })
   }

  ngOnInit() {
    if (this.editando === true) {
      this.areaService.getRubroByNameAndCompany(this.name)
      .subscribe(
        (area) => {
          this.name = area[0].rubro_nombre,
          this.type = area[0].rubro_tipo,
          this.min = area[0].rubro_min,
          this.max = area[0].rubro_max
        },
        (error) => {
          console.log(error)
        }
      )
    }

    this.getCurrentCompany()
  }

  getCurrentCompany(){
    this.compania = this.currentUser.id_comercio
    // this.areaService.getCompaniesByID()
    // .subscribe(
    //   (comp) => {
    //     this.compania = comp[0].comercio_nombre
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // )
  }

  createArea(event) {
    var rubro = {
      nombre: this.name,
      tipo: this.type,
      temp_min: this.min,
      temp_max: this.max,
      comercio: this.compania
    }
    if (this.editando) {
      this.areaService.updateRubro(rubro)
      .subscribe(
        (response) => {
          console.log(response)
          this.navCtrl.navigateRoot('/areas')
          this.editando = false;
        })
    } else {
    this.areaService.addRubro(rubro)
    .subscribe(
      (response) => {
        console.log(response)
        this.navCtrl.navigateRoot('/areas')
        this.editando = false;
      })
    }
  }

}
