import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { TranslateConfigService } from '../../translate-config.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public onLoginForm: FormGroup;
  selectedLanguage: String;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private translateConfigService: TranslateConfigService,
    private authService: AuthService
  ) { 
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  } 

  ngOnInit() {
  }

  iniciarSesion(form: NgForm) {
    this.navCtrl.navigateRoot('/home-results');
    // this.authService.login(form.value.user, form.value.password).subscribe(
    //   data => {
    //     console.log("Logged In");
    //   },
    //   error => {
    //     console.log(error);
    //   },
    //   () => {
    //     this.navCtrl.navigateRoot('/home-results');
    //   }
    // );
  }

}
