import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServicesService } from '../../Services/services.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { TranslateConfigService } from '../../translate-config.service';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.page.html',
  styleUrls: ['./create-users.page.scss'],
})
export class CreateUsersPage implements OnInit {

  nombre: string;
  apellido: string;
  cedula: string = '';
  cargo: string;
  username: string;
  password: string;
  editando: boolean;
  selectedLanguage: string;
  

  constructor(private route: ActivatedRoute, 
    private router: Router, private usuarioService: ServicesService, 
    private navCtrl: NavController, private translateConfigService: TranslateConfigService) {
      this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.editando = this.router.getCurrentNavigation().extras.state.editando;
          if (this.editando === true) {
            this.cedula = this.router.getCurrentNavigation().extras.state.id;
          }
        }
      })
    }

  ngOnInit() {
    console.log('edit', this.editando)
    if (this.editando === true) {
      this.usuarioService.getUserbyId(this.cedula)
      .subscribe(
        (user) => {
          console.log('USER', user);
          this.nombre = user[0].usu_nombre,
          this.apellido = user[0].usu_apellido,
          this.cargo = user[0].usu_cargo,
          this.username = user[0].usu_usuario,
          this.password = user[0].usu_contrasena
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }

  crearUsuario(event){
    var usuario = {
      nombre: this.nombre,
      apellido: this.apellido,
      cedula: this.cedula,
      cargo: this.cargo,
      username: this.username,
      password: this.password
    }
    if (this.editando === true) {
      this.usuarioService.updateUser(usuario)
      .subscribe(
        (response) => {
          console.log(response)
          this.navCtrl.navigateRoot('/users')
          console.log(usuario)
        },
        (error) => {
          console.log(error)
        }
      )
    } else {
      this.usuarioService.addNewUser(usuario)
      .subscribe(
        (response) => {
          console.log(response)
          this.navCtrl.navigateRoot('/users')
          console.log(usuario)
        },
        (error) => {
          console.log(error)
        }
      )
    }
    this.editando = false;
  }

}
