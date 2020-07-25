import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input, ChangeDetectorRef, } from '@angular/core';
import { ServicesService } from '../../Services/services.service';
import { Platform, NavController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { TranslateConfigService } from '../../translate-config.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AuthenticationService } from '../../Services/authentication.service';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  ColumnMode = ColumnMode;

  rows = [
    {
    'lat': 66,
    'lon': 77,
    'date': '24-07-20 10:02',
    'temp': 22
    },
    {
      'lat': 66.22,
      'lon': 77.56,
      'date': '24-07-20 10:07',
      'temp': 22
      },
  ]
  tableStyle='material';
  selectedLanguage: string;
  //rows: Array<any>=[];
  almacenes: {};
  companias: {};
  unidades: {};
  warehouse: string;
  company: string;
  unit: string;
  auto: any;
  currentUser: User;
  isAdmin: boolean;
  isSuper: boolean;

  constructor(private reportService: ServicesService, 
    public navCtrl: NavController,
    private router: Router,
    private translateConfigService: TranslateConfigService,
    private authenticationService: AuthenticationService
    ) {
      this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.isAdmin = this.currentUser.rol === Role.Admin
      this.isSuper = this.currentUser.rol === Role.super
    }

  ngOnInit() {
    this.isAdmin ?  
      this.getCompanies()
      :
      this.getWarehouses()

  }

  getCompanies(){
    this.reportService.getCompaniesNames()
      .subscribe(
        (co) => {
          this.companias = co
      },
        (error) => {
          console.error(error);
        }
      );
  }

  getWarehouses(){
    this.reportService.getWareHousesNames()
      .subscribe(
        (wh) => {
          this.almacenes = wh
      },
        (error) => {
          console.error(error);
        }
      );
  }

  // onChangeCompany(){
  //   if (this.company){
  //     this.reportService.getWarehouseByCompany(this.company)
  //       .subscribe(
  //         (wh) => {
  //           this.almacenes = wh; 
  //         },
  //         (error) => {
  //           console.error(error);
  //         }
  //       );
  //   }else {
  //     this.almacenes = null;   
  //   }
  // }

//   onChangeWarehouse() {
//     if (this.warehouse){
//       this.reportService.getUnitsByWarehouse(this.warehouse)
//         .subscribe(
//           (un) => {
//             this.unidades = un;
//           },
//           (error) => {
//             console.error(error);
//           }
//         );
//     }else {
//       this.unidades = null;
//     }
//  }

getReports(){
  console.log('holis')
}


}
