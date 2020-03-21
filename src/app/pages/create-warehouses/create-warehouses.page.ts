import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServicesService } from '../../Services/services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateConfigService } from '../../translate-config.service';

@Component({
  selector: 'app-create-warehouses',
  templateUrl: './create-warehouses.page.html',
  styleUrls: ['./create-warehouses.page.scss'],
})
export class CreateWarehousesPage implements OnInit {

  selectedLanguage: any;
  
  constructor(
    private route: ActivatedRoute, 
    private router: Router, private usuarioService: ServicesService, 
    private navCtrl: NavController, private translateConfigService: TranslateConfigService
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
   }

  ngOnInit() {
  }

}
