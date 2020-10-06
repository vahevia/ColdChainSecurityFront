import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ServicesService } from '../../Services/services.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateConfigService } from '../../translate-config.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AuthenticationService } from '../../Services/authentication.service';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-reports-rubros-transp',
  templateUrl: './reports-rubros-transp.page.html',
  styleUrls: ['./reports-rubros-transp.page.scss'],
})
export class ReportsRubrosTranspPage implements OnInit {

  ColumnMode = ColumnMode;

  tableStyle='material';
  selectedLanguage: string;
  rows: Array<any>=[{}];
  rows1: {};
  almacenes: Array<any>=[{}];
  companias: {};
  unidades: {};
  dataArray: any = [{}];
  warehouse: string;
  company: string;
  unit: string;
  auto: any;
  currentUser: User;
  isAdmin: boolean;
  isSuper: boolean;
  status: string;
  rubro: string;
  tmin: number;
  tmax: number;
  alertMessage: any = {};


  constructor(private reportService: ServicesService, 
    public navCtrl: NavController,
    private router: Router,
    private translateConfigService: TranslateConfigService,
    private authenticationService: AuthenticationService,
    public alertController: AlertController
    ) {
      this.translateConfigService.getDefaultLanguage();
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.isAdmin = this.currentUser.rol === Role.Admin
      this.isSuper = this.currentUser.rol === Role.super
    }

  ngOnInit() {
    
    this.isSuper ?  
      (
        this.getCompanies()
      )
      :
      (
        this.getTrucks()
      )

  }

  getCompanies(){
    this.reportService.getCompaniesNames()
      .subscribe(
        (co) => {
          console.log(co)
          this.companias = co
      },
        (error) => {
          console.error(error);
        }
      );
  }

  getTrucks(){
    this.reportService.getTrucks()
    .subscribe(
      (T) => {
        this.unidades = T
        console.log(T)
      },
      (error) => {
        console.error(error);
      }
    )
  }

  onChangeCompany(){
    if (this.company){
      this.reportService.getTrucksByCompany(this.company)
        .subscribe(
          (un) => {
            this.unidades = un; 
          },
          (error) => {
            console.error(error);
          }
        );
    }else {
      this.unidades = null;   
    }
  }

  onChangeUnit() {
    console.log(this.unit)
    this.reportService.getRubroByTransportUnit(this.unit)
    .subscribe(
      (data: any) => {
        console.log('data', data)
        this.rubro = data[0].rubro_nombre,
        this.tmax = data[0].rubro_max,
        this.tmin = data[0].rubro_min
        console.log(this.rubro)
      },
      (error) => {
        console.error(error);
      }
    )
  }

  getReports(){
    this.reportService.geTruckUnitByPlateFromHLF(this.unit)
    .subscribe(
      (data1: any) => {
        this.dataArray = data1.data
        this.rows=[]
        for (let i in this.dataArray){
          this.rows.push({
            id: this.dataArray[i].Record.id,
            almacen: this.dataArray[i].Record.almacen,
            comercio: this.dataArray[i].Record.comercio,
            fecha: this.dataArray[i].Record.fecha,
            latitud: this.dataArray[i].Record.latitud,
            longitud: this.dataArray[i].Record.longitud,
            temperatura: this.dataArray[i].Record.temperatura,
            unidadAlmacen: this.dataArray[i].Record.unidad,
            estatus: this.tmin <= parseFloat(this.dataArray[i].Record.temperatura) && parseFloat(this.dataArray[i].Record.temperatura) <= this.tmax ? 'normal' : (this.tmin > parseFloat(this.dataArray[i].Record.temperatura) ? 'bajo' : 'alto')
          })
        }
        this.rows=[...this.rows]
        this.rows1 = this.rows
      }
    )
  }

  async presentAlert(value) {
    this.reportService.getDataFromHLFByID(value)
    .subscribe(
      async (data: any) => {
        this.alertMessage = data.data[0]
        const alert = await this.alertController.create({
          cssClass: 'alertClass',
          header: 'Info',
          message: '<b>'+'Transaction ID: '+'</b>'+this.alertMessage.TxId +'</br>'+'<b>'+'TimeStamp: '+'</b>'+ this.alertMessage.Timestamp,
          buttons: ['OK']
        });
        await alert.present();
      }
    )
    this.alertMessage = {}
  }

}
