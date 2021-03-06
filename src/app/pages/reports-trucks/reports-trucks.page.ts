import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ServicesService } from '../../Services/services.service';
import { Platform, NavController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { TranslateConfigService } from '../../translate-config.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AuthenticationService } from '../../Services/authentication.service';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-reports-trucks',
  templateUrl: './reports-trucks.page.html',
  styleUrls: ['./reports-trucks.page.scss'],
})
export class ReportsTrucksPage implements OnInit {

  ColumnMode = ColumnMode;

  tableStyle='material';
  selectedLanguage: string;
  rows: Array<any>=[{}];
  rows1: {};
  almacenes: {};
  companias: {};
  unidades: {};
  alertMessage: any = {};
  dataArray: any = [{}];
  company: string;
  unit: string;
  userCompany: string;
  auto: any;
  currentUser: User;
  isAdmin: boolean;
  isSuper: boolean;
  minDate: Date;
  iniDate: string;
  finDate: String;
  maxDate: String;

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
      this.maxDate = new Date().toJSON().split('T')[0]
    }

  ngOnInit() {
    
    this.isSuper ?  
      (
        this.getCompanies(), 
        this.getAllReports()
      )
      :
      (
        this.getTrucks(),
        this.getCurrentUserCompanyName()
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

  getAllReports(){
    this.reportService.getAllDataFromHLF()
    .subscribe(
      (data1: any) => {
        this.dataArray = data1.data
        this.rows = []
        for (let i in this.dataArray){
          if (this.dataArray[i].Record.unidad !== 'null'){
            this.rows.push({
              id: this.dataArray[i].Record.id,
              almacen: this.dataArray[i].Record.almacen,
              comercio: this.dataArray[i].Record.comercio,
              fecha: this.dataArray[i].Record.fecha,
              latitud: this.dataArray[i].Record.latitud,
              longitud: this.dataArray[i].Record.longitud,
              temperatura: this.dataArray[i].Record.temperatura,
              unidad: this.dataArray[i].Record.unidad,
              unidadAlmacen: this.dataArray[i].Record.unidadAlmacen
            })
          }
        }
        this.rows1 = this.rows
      }
    )
  }

  getCurrentUserCompanyName(){
    this.reportService.getCompaniesByID()
    .subscribe(
      (nombre) => {
        this.userCompany = nombre[0].comercio_nombre
        this.getAllCompanyReports(this.userCompany)
      }
    )
  }

  getAllCompanyReports(compania){
    this.reportService.getDataFromHLFByCommerce(compania)
    .subscribe(
      (data1: any) => {
        this.dataArray = data1.data
        this.rows = [];
        for (let i in this.dataArray){
          if (this.dataArray[i].Record.unidad !== 'null'){
            this.rows.push({
              id: this.dataArray[i].Record.id,
              almacen: this.dataArray[i].Record.almacen,
              comercio: this.dataArray[i].Record.comercio,
              fecha: this.dataArray[i].Record.fecha,
              latitud: this.dataArray[i].Record.latitud,
              longitud: this.dataArray[i].Record.longitud,
              temperatura: this.dataArray[i].Record.temperatura,
              unidad: this.dataArray[i].Record.unidad
            })
          }
        }
        this.rows1 = this.rows
      }
    )
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

  getTrucks(){
    this.reportService.getTrucks()
    .subscribe(
      (T) => {
        this.unidades = T
      },
      (error) => {
        console.error(error);
      }
    )
  }

  filterByDate(data){
    var iniDia = Number(this.iniDate.split('-')[2])
    var iniMes = Number(this.iniDate.split('-')[1])
    var iniYear = Number(this.iniDate.split('-')[0])
    var finDia = Number(this.finDate.split('-')[2])
    var finMes = Number(this.finDate.split('-')[1])
    var finYear = Number(this.finDate.split('-')[0])
    for (let i in data){
      var fechaData = new Date(data[i].Record.fecha)
      var iniFecha = new Date(iniYear+'/'+iniMes+'/'+iniDia)
      var finFecha = new Date(finYear+'/'+finMes+'/'+finDia)
    if ( iniFecha <= fechaData && fechaData <= finFecha ){
        this.rows.push({
          almacen: this.dataArray[i].Record.almacen,
          comercio: this.dataArray[i].Record.comercio,
          fecha: this.dataArray[i].Record.fecha,
          latitud: this.dataArray[i].Record.latitud,
          longitud: this.dataArray[i].Record.longitud,
          temperatura: this.dataArray[i].Record.temperatura,
          unidad: this.dataArray[i].Record.unidad
        })
      }
    }
  }

  getReports(){
    this.reportService.geTruckUnitByPlateFromHLF(this.unit)
    .subscribe(
      (data1: any) => {
        console.log('DATA', data1)
        this.dataArray = data1.data
        console.log('DATAARRAY!!', this.dataArray)
        this.rows=[]
        if( this.iniDate != undefined ) {
          this.filterByDate(this.dataArray)
        }
        for (let i in this.dataArray){
          if (this.dataArray[i].Record.unidad !== 'null'){
            this.rows.push({
              almacen: this.dataArray[i].Record.almacen,
              comercio: this.dataArray[i].Record.comercio,
              fecha: this.dataArray[i].Record.fecha,
              latitud: this.dataArray[i].Record.latitud,
              longitud: this.dataArray[i].Record.longitud,
              temperatura: this.dataArray[i].Record.temperatura,
              unidad: this.dataArray[i].Record.unidad
            })
          }
        }
        this.rows=[...this.rows]
        this.rows1 = this.rows
      }
    )
  }


}
