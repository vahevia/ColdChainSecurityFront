import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input, ChangeDetectorRef, } from '@angular/core';
import { ServicesService } from '../../Services/services.service';
import { Platform, NavController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { TranslateConfigService } from '../../translate-config.service';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  ColumnMode = ColumnMode;

  rows: Array<any>=[];
  almacenes: Array<any>=[];
  tableStyle='material';
  selectedLanguage: string;
  warehouse: string;
  auto: any;

  constructor(private reportService: ServicesService, 
    public navCtrl: NavController,
    private router: Router,
    private translateConfigService: TranslateConfigService) {
      this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    }

  ngOnInit() {
    this.reportService.getWareHousesNames()
      .subscribe(
        (wh) => {
          for(let data in wh){
            this.almacenes.push({
              nombre: wh[data].almacen_nombre
            });
            this.almacenes=[...this.almacenes]
        }
        console.log('ALMACENES', this.almacenes);
      },
        (error) => {
          console.error(error);
        }
      );
  }

}
