import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServicesService } from '../../Services/services.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { TranslateConfigService } from '../../translate-config.service';
import { AuthenticationService } from '../../Services/authentication.service';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  nombre: string;
  apellido: string;
  cedulaOriginal: string;
  cedula: string = '';
  horario: string;
  horarios: {};
  username: string;
  password: string;
  cargo: string;
  compania: string;
  passwordCambio: string = '';
  selectedLanguage: string;
  currentUser: User;
  isAdmin: boolean;
  isSuper: boolean;
  

  constructor( private usuarioService: ServicesService, 
    private navCtrl: NavController, private translateConfigService: TranslateConfigService,
    private authenticationService: AuthenticationService) {
      this.translateConfigService.getDefaultLanguage();
      this.authenticationService.currentUser.subscribe(x => {this.currentUser = x; console.log(x)});
      this.isAdmin = this.currentUser.rol === Role.Admin
      this.isSuper = this.currentUser.rol === Role.super
      this.cedulaOriginal = this.currentUser.cedula_usuario
    }

  ngOnInit() {
    console.log(this.currentUser.cedula_usuario)
    console.log(this.cedulaOriginal)
    this.usuarioService.getUserbyId(this.cedulaOriginal)
    .subscribe(
      (user) => {
        console.log('USER', user);
        this.cedulaOriginal = user[0].usuario_cedula
        this.nombre = user[0].usuario_nombre
        this.apellido = user[0].usuario_apellido
        this.cargo = user[0].usuario_rol
        this.username = user[0].usuario_usuario
        this.password = user[0].usuario_contrasena
        this.horario = user[0].hor_emp_descripcion
        this.compania = user[0].usuario_comercio
      },
      (error) => {
        console.log(error)
      }
    )

    this.usuarioService.getAllEmployeeSchedule()
      .subscribe(
        (horario) => {
        this.horarios = horario
        },
        (error) => {
          console.error(error);
        }
      ); 

  }

  salvarCambios(event){
    var usuario = {
      nombre: this.nombre,
      apellido: this.apellido,
      cedulaOriginal: this.cedulaOriginal,
      cedula: (this.cedula === '' ? null : this.cedula),
      cargo: this.cargo, 
      username: this.username,
      password: (this.passwordCambio === '' ? this.password :  this.passwordCambio),
      horario: this.horario,
    }
    this.usuarioService.updateUser(usuario)
    .subscribe(
      (response) => {
        console.log(response)
        this.navCtrl.navigateRoot('/home-results')
        console.log(usuario)
      },
      (error) => {
        console.log(error)
      }
    )
  }

}

