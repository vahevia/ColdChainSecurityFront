import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServicesService } from '../../Services/services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateConfigService } from '../../translate-config.service';

@Component({
  selector: 'app-create-trucks',
  templateUrl: './create-trucks.page.html',
  styleUrls: ['./create-trucks.page.scss'],
})
export class CreateTrucksPage implements OnInit {

  selectedLanguage: any;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, private truckService: ServicesService, 
    private navCtrl: NavController, private translateConfigService: TranslateConfigService
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
   }

  ngOnInit() {
  }

}
