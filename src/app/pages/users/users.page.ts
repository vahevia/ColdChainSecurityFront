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
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  ColumnMode = ColumnMode;

  rows: Array<any>=[];
  tableStyle='material';
  nombre: string;
  apellido: string;
  cedula: number;
  cargo: string;
  username: string;
  password: string;
  selectedLanguage: string;
  update: boolean;
  currentUser: User;
  isAdmin: boolean;
  isSuper: boolean;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: ServicesService, 
    public navCtrl: NavController,
    private router: Router,
    private translateConfigService: TranslateConfigService,
    private authenticationService: AuthenticationService) {
      this.translateConfigService.getDefaultLanguage();
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.isAdmin = this.currentUser.rol === Role.Admin
      this.isSuper = this.currentUser.rol === Role.super
  }

  ngOnInit() {
    this.getUsers();
  }

  ionViewWillEnter() {
    this.getUsers();
  }

  getUsers(){
    this.usuarioService.getUsers()
    .subscribe(
      (users) => {
        this.rows = users
        this.rows=[...this.rows]
      console.log(this.rows);
    },
      (error) => {
        console.error(error);
      }
    );
  }

  createUser() {
    this.navCtrl.navigateForward('create-users');
  }

  editUser(cedula) {
    let navigationExtras: NavigationExtras = {
      state: {
        editando: true,
        id: cedula 
      }
    }
    this.router.navigate(['create-users'], navigationExtras); 
    this.getUsers();
  }

  deleteUser(value){
    console.log('cedula a borrar', value)
    this.usuarioService.deleteUser(value)
    .subscribe(
      (response) => {
        console.log(response)
        this.getUsers();
      },
      (error) => {
        console.error(error);
      }
    )
  }

}
