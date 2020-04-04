import { Component, OnInit, ViewEncapsulation, } from '@angular/core';
import { ServicesService } from '../../Services/services.service';
import { Platform, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateConfigService } from '../../translate-config.service';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersPage implements OnInit {

  ColumnMode = ColumnMode;

  rows: Array<any>=[];
  tableStyle='material';
  hide: boolean;
  nombre: string;
  apellido: string;
  cedula: number;
  cargo: string;
  username: string;
  password: string;
  selectedLanguage: string;

  constructor(
    private usuarioService: ServicesService, 
    public navCtrl: NavController,
    private router: Router,
    private translateConfigService: TranslateConfigService) {
      this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    }

  ngOnInit() {
    this.usuarioService.getUsers()
    .subscribe(
      (users) => {
        for(let data in users){
          this.rows.push({
            nombre: users[data].usu_nombre,
            apellido: users[data].usu_apellido,
            cedula: users[data].usu_cedula,
            cargo: users[data].usu_cargo,
            usuario: users[data].usu_usuario,
            contrasena: users[data].usu_contrasena
          });
          this.rows=[...this.rows]
      }
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

  deleteUser(value){
    console.log('cedula a borrar', value)
    this.usuarioService.deleteUser(value)
    .subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.error(error);
      }
    )
  }

}
