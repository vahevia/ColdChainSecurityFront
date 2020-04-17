import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../../Services/authentication.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateConfigService } from '../../translate-config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  selectedLanguage: any;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private translateConfigService: TranslateConfigService
  ) { 
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    // redirect to home if already logged in
  //   if (this.authenticationService.currentUserValue) { 
  //     this.router.navigate(['/home-results']);
  // }
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
        .subscribe(
            data => {
              console.log('you did it!')
              this.router.navigate(['/home-results']);
            },
            error => {
              console.log(error);
              this.error = error;
              this.loading = false;
            });
  }


}
