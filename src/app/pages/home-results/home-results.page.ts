import { AfterContentInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController } from '@ionic/angular';
import { TranslateConfigService } from '../../translate-config.service';
import { ServicesService } from '../../Services/services.service';
import { Chart } from 'chart.js';


declare var google;

@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss']
})


export class HomeResultsPage implements OnInit {

  map;
  @ViewChild("lineCanvas") lineCanvas: ElementRef;
  @ViewChild('mapElement') mapElement;
  
  private lineChart: Chart;

  selectedLanguage: any;
  searchKey = '';
  yourLocation = '123 Test Street';
  themeCover = 'assets/img/ionic4-Start-Theme-cover.jpg';
  units: Array<any> = [];
  unit: string;
  trucks: Array<any> = [];
  isTruck: boolean;
  aux = {};
  dataArray: any = [{}];
  graphicData: Array<any> = [];
  graphData: Array<any> = [];
  promArray: Array<any> = [];
  marks: Array<any> = [];
  commerce: string;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    private services: ServicesService,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private translateConfigService: TranslateConfigService
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }

  getStaticUnits() {
    this.services.getStaticUnits()
    .subscribe(
      (unidades) => {
        this.units = [];
        for(let data in unidades){
          this.units.push({
            id: unidades[data].eslabon_serial_id,
          });
      }
      this.isTruck = false;
    },
      (error) => {
        console.error(error);
      }
    );
  }

  getTrucks(){
    this.services.getTrucks()
    .subscribe(
      (camiones) => {
        this.units = [];
        for(let data in camiones){
          this.units.push({
            id: camiones[data].unidad_placa,
          });
      }
      this.isTruck = true;
    },
      (error) => {
        console.error(error);
      }
    );
  }

  getMapsInfo(){

    this.isTruck ?
    this.services.geTruckUnitByPlateFromHLF(this.unit)
    .subscribe(
      (registers: any) => {
        this.aux = registers.data;
        this.displayGoogleMap(this.aux[0].Record.latitud, this.aux[0].Record.longitud)
        for (let i in this.aux){
          this.addMarkersToMap(this.aux[i].Record.latitud, this.aux[i].Record.longitud)
          this.marks.push({
            lat: this.aux[i].Record.latitud,
            lon: this.aux[i].Record.longitud
          })
        }
        console.log('MARKS', this.marks)
      }
    )
    :
    this.services.getStaticUnitBySerialIDFromHLF(this.unit)
    .subscribe(
      (registers: any) => {
        this.aux = registers.data;
        this.displayGoogleMap(this.aux[0].Record.latitud, this.aux[0].Record.longitud)
        for (let i in this.aux){
          this.addMarkersToMap(this.aux[i].Record.latitud, this.aux[i].Record.longitud)
          this.marks.push({
            lat: this.aux[i].Record.latitud,
            lon: this.aux[i].Record.longitud
          })
        }
        console.log('MARKS', this.marks)
      }
    )
  }

  displayGoogleMap(lat, lon){
    const latLon = new google.maps.LatLng(lat,lon)
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      {
        center: latLon,
        zoom: 20
      });
  }

  addMarkersToMap(lat, lon){
    const position = new google.maps.LatLng(lat, lon);
    const museumMarker = new google.maps.Marker({position});
    museumMarker.setMap(this.map);
  }

  calculateAvg(arreglo){
    var ocurrencyArray: Array<any> = arreglo.reduce(
      (counter, record) => {
        var acum: {} = counter
        acum[record.date.getHours()] = (acum[record.date.getHours()] || 0) + 1
        return acum
      }, {}
    )

    var tempArray: Array<any> = arreglo.reduce(
      (counter, record) => {
        var acum: {} = counter
        acum[record.date.getHours()] = (acum[record.date.getHours()] || 0) + record.temp
        return acum
      }, {}
    )
    
    for(let i in tempArray){
      this.graphData.push({
        name: i,
        value: tempArray[i] / ocurrencyArray[i]
      })
    }

  }

  getGraphicValues(){

    // this.isTruck ?
    this.services.geTruckUnitByPlateFromHLF(this.unit)
    .subscribe(
      (data1: any) => {
        let aux = data1.data
        for (let i in aux) {
          this.promArray.push({
            temp: Number(aux[i].Record.temperatura),
            date: new Date(aux[i].Record.fecha)
          })
        }
        this.calculateAvg(this.promArray);
      }
    )
    // :
    // this.services.getStaticUnitBySerialIDFromHLF(this.unit)
    // .subscribe(
    //   (data: any) => {
    //     console.log('DATA UNIT', data)
    //   }
    // )

    this.services.getDataFromHLFByCommerce('Plumrose')
    .subscribe(
      (data1: any) => {
        this.dataArray = data1.data
        console.log('dataArray', this.dataArray)
        // for (let i in this.dataArray){
        //   this.graphicData.push({
        //     name: this.dataArray[i].Record.unidadAlmacen,
        //     series: [{
        //       name: this.dataArray[i].Record.fecha,
        //       value: Number(this.dataArray[i].Record.temperatura)
        //     }] 
        //   })
        // }
        // console.log('DATAARRAY', this.graphicData)
        // console.log('MULTI', this.multi)
      }
    )
  }

  ngOnInit(): void {

    this.getMapsInfo();
    this.getGraphicValues();
    
  }

  onTypeChange(value) {
    value == 1 ?
    this.getTrucks()
    :
    this.getStaticUnits()
  }

  
   // Grafica

  multi: any[] = [
      {
        "name":"Unidad 1",
        "series": [
          {
            "name":"12",
            "value": 22
          },
          {
            "name":"12:10",
            "value": 23
          },
          {
            "name":"12:20",
            "value": 28
          },
          {
            "name":"12:30",
            "value": 26
          },
          {
            "name":"12:40 ",
            "value": 27
          },
          {
            "name":"12:50 ",
            "value": 29
          },
          {
            "name":"13 ",
            "value": 27
          },
          {
            "name":"13:10 ",
            "value": 23
          },
          {
            "name":"13:20 ",
            "value": 28
          },
          {
            "name":"13:30 ",
            "value": 26
          },
          {
            "name":"13:40 ",
            "value": 27
          },
          {
            "name":"13:50 ",
            "value": 29
          },
          {
            "name":"14 ",
            "value": 27
          }
        ]
      },
      {
      "name":"Unidad 2",
      "series": [
        {
          "name":"12 ",
          "value": 22
        },
        {
          "name":"12:10 ",
          "value": 24
        },
        {
          "name":"12:20 ",
          "value": 23
        },
        {
          "name":"12:30 ",
          "value": 24
        },
        {
          "name":"12:40 ",
          "value": 25
        },
        {
          "name":"12:50 ",
          "value": 28
        },
        {
          "name":"13 ",
          "value": 22
        },
        {
          "name":"13:10 ",
          "value": 24
        },
        {
          "name":"13:20 ",
          "value": 23
        },
        {
          "name":"13:30 ",
          "value": 24
        },
        {
          "name":"13:40 ",
          "value": 25
        },
        {
          "name":"13:50 ",
          "value": 28
        },
        {
          "name":"14 ",
          "value": 29
        }
      ]
    },
    {
      "name":"Unidad 3",
      "series": [
        {
          "name":"12 ",
          "value": 20
        },
        {
          "name":"12:10 ",
          "value": 22
        },
        {
          "name":"12:20 ",
          "value": 21
        },
        {
          "name":"12:30 ",
          "value": 23
        },
        {
          "name":"12:40 ",
          "value": 25
        },
        {
          "name":"12:50 ",
          "value": 24
        },
        {
          "name":"13 ",
          "value": 20
        },
        {
          "name":"13:10 ",
          "value": 22
        },
        {
          "name":"13:20 ",
          "value": 21
        },
        {
          "name":"13:30 ",
          "value": 23
        },
        {
          "name":"13:40 ",
          "value": 25
        },
        {
          "name":"13:50 ",
          "value": 24
        },
        {
          "name":"14 ",
          "value": 26
        }
      ]
    },
    ];
  

  
  // options
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  timeline: boolean = true;
  xAxisLabel: string;
  yAxisLabel: string;


  colorScheme = {
    domain: ['#3073CA', '#3D5C86', '#0554BA', '#0E6DE9', '#558CD4', '#2E65AE']
  };
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  settings() {
    this.navCtrl.navigateForward('settings');
  }


}
