import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServicesService } from '../../Services/services.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { TranslateConfigService } from '../../translate-config.service';
import { AuthenticationService } from '../../Services/authentication.service';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.page.html',
  styleUrls: ['./create-users.page.scss'],
})
export class CreateUsersPage implements OnInit {

  nombre: string;
  apellido: string;
  cedula: string = '';
  cedulaOriginal: string;
  cargo: string;
  horario: string;
  compania: string;
  roles: {};
  horarios: {};
  companias: {};
  username: string;
  password: string;
  passwordCambio: string = '';
  editando: boolean;
  selectedLanguage: string;
  isdisabled: boolean = false;
  currentUser: User;
  isAdmin: boolean;
  isSuper: boolean;
  

  constructor(private route: ActivatedRoute, 
    private router: Router, private usuarioService: ServicesService, 
    private navCtrl: NavController, private translateConfigService: TranslateConfigService,
    private authenticationService: AuthenticationService) {
      this.translateConfigService.getDefaultLanguage();
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.isAdmin = this.currentUser.rol === Role.Admin
      this.isSuper = this.currentUser.rol === Role.super
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.editando = this.router.getCurrentNavigation().extras.state.editando;
          if (this.editando === true) {
            this.cedula = this.router.getCurrentNavigation().extras.state.id;
            this.isdisabled = true;
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
    }

    this.usuarioService.getAllRoles()
      .subscribe(
        (rol) => {
        this.roles = rol
        },
        (error) => {
          console.error(error);
        }
      );

    this.usuarioService.getAllEmployeeSchedule()
      .subscribe(
        (horario) => {
        this.horarios = horario
        },
        (error) => {
          console.error(error);
        }
      ); 

  
      this.usuarioService.getCompanies()
        .subscribe(
          (comp) => {
          this.companias = comp
          },
          (error) => {
            console.error(error);
          }
        ) 
      
        if (this.isAdmin) {
          this.getCurrentCompany()
        }

  }

  getCurrentCompany(){
    this.usuarioService.getCompaniesByID()
    .subscribe(
      (comp) => {
        this.compania = comp[0].comercio_nombre
      },
      (error) => {
        console.error(error);
      }
    )
  }

  crearUsuario(){
    if (this.editando === true) {
      var usuarioE = {
        nombre: this.nombre,
        apellido: this.apellido,
        cedulaOriginal: this.cedulaOriginal,
        cedula: this.cedula,
        cargo: this.cargo, 
        username: this.username,
        password: (this.passwordCambio === '' ? this.password :  this.passwordCambio),
        horario: this.horario,
        comercio: this.compania
      }
      this.usuarioService.updateUser(usuarioE)
      .subscribe(
        (response) => {
          console.log(response)
          this.navCtrl.navigateRoot('/users')
          console.log(usuarioE)
        },
        (error) => {
          console.log(error)
        }
      )
    } else {
      var usuario = {
        nombre: this.nombre,
        apellido: this.apellido,
        cedula: this.cedulaOriginal,
        cargo: this.cargo, 
        username: this.username,
        password: this.passwordCambio,
        horario: this.horario,
        comercio: this.compania
      }
      console.log(usuario)
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
      this.editando = false;
    }
  }

}
