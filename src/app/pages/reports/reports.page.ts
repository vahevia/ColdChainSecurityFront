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
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  ColumnMode = ColumnMode;

  tableStyle='material';
  selectedLanguage: string;
  rows: Array<any>=[{}];
  rows1: {};
  almacenes: Array<any>=[{}];
  companias: {};
  unidades: {};
  alertMessage: any = {};
  dataArray: any = [{}];
  warehouse: string;
  company: string;
  unit: string;
  userCompany: string;
  auto: any;
  currentUser: User;
  isAdmin: boolean;
  isSuper: boolean;
  minDate: Date;
  iniDate: String;
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
        this.getWarehouses(),
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
          if (this.dataArray[i].Record.unidadAlmacen !== 'null'){
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
        this.rows = []
        for (let i in this.dataArray){
          if (this.dataArray[i].Record.unidadAlmacen !== 'null'){
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
        (wh: any) => {
          this.almacenes = []
          for (let i in wh){
            this.almacenes.push({
              nombre_almacen: wh[i].nombre_almacen
            })
          }
      },
        (error) => {
          console.error(error);
        }
      );
  }

  onChangeCompany(){
    if (this.company){
      this.reportService.getWarehouseByCompany(this.company)
        .subscribe(
          (wh: any) => {
            this.almacenes = []
            for (let i in wh){
              this.almacenes.push({
                nombre_almacen: wh[i].almacen_nombre
              })
            }
            this.almacenes = [...this.almacenes]
          },
          (error) => {
            console.error(error);
          }
        );
    }else {
      this.almacenes = null;   
    }
  }

  onChangeWarehouse() {
    if (this.warehouse){
      this.reportService.getStaticUnitByWarehouse(this.warehouse)
        .subscribe(
          (un) => {
            this.unidades = un;
            if (un == []){
              this.unidades = null
            }
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
    console.log(' CAMBIEEEEE')
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
          unidadAlmacen: this.dataArray[i].Record.unidad
        })
      }
    }
  }

  getReports(){
    this.reportService.getStaticUnitBySerialIDFromHLF(this.unit)
    .subscribe(
      (data1: any) => {
        this.dataArray = data1.data
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
              unidadAlmacen: this.dataArray[i].Record.unidad
            })
          }
        }
        this.rows=[...this.rows]
        this.rows1 = this.rows
      }
    )
  }


}
