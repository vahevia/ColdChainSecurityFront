import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../Services/services.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateConfigService } from '../../translate-config.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AuthenticationService } from '../../Services/authentication.service';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-reports-rubros-storage',
  templateUrl: './reports-rubros-storage.page.html',
  styleUrls: ['./reports-rubros-storage.page.scss'],
})
export class ReportsRubrosStoragePage implements OnInit {

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

  constructor(private reportService: ServicesService, 
    public navCtrl: NavController,
    private router: Router,
    private translateConfigService: TranslateConfigService,
    private authenticationService: AuthenticationService
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
        this.getWarehouses()
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

  getWarehouses(){
    this.reportService.getWareHousesNames()
      .subscribe(
        (wh: any) => {
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
    this.reportService.getRubroByStaticUnit(this.unit)
    .subscribe(
      (data: any) => {
        this.rubro = data[0].rubro_nombre,
        this.tmax = data[0].rubro_max,
        this.tmin = data[0].rubro_min
        console.log(this.rubro)
      }
    )
  }

  getReports(){
    this.reportService.getStaticUnitBySerialIDFromHLF(this.unit)
    .subscribe(
      (data1: any) => {
        this.dataArray = data1.data
        this.rows=[]
        for (let i in this.dataArray){
          this.rows.push({
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


}
