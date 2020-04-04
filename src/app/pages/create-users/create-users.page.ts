import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServicesService } from '../../Services/services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateConfigService } from '../../translate-config.service';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.page.html',
  styleUrls: ['./create-users.page.scss'],
})
export class CreateUsersPage implements OnInit {

  nombre: string;
  apellido: string;
  cedula: number;
  cargo: string;
  username: string;
  password: string;
  editando: boolean;
  selectedLanguage: string;

  constructor(private route: ActivatedRoute, 
    private router: Router, private usuarioService: ServicesService, 
    private navCtrl: NavController, private translateConfigService: TranslateConfigService) {
      this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
     }

  ngOnInit() {
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
    if (this.editando) {
      this.usuarioService.updateUser(usuario)
      .subscribe(
        (response) => {
          console.log(response)
        })
    } else {
    this.usuarioService.addNewUser(usuario)
    .subscribe(
      (response) => {
        console.log(response)
      })
    }
    this.editando = false;
    console.log('editando ', this.editando)
    this.navCtrl.navigateRoot('/users')
    console.log(usuario)
  }

}
