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
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';

declare var google;

@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss']
})


export class HomeResultsPage implements OnInit {

  map;
  //@ViewChild("lineCanvas") lineCanvas: ElementRef;
  @ViewChild('mapElement') mapElement;
  @ViewChild('lineCanvas') lineCanvas;
  
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
  //graphicData = {};
  graphData = { labels: [], values: [] };
  promArray: Array<any> = [];
  marks: Array<any> = [];
  commerce: string;
  activeUnits = 0;
  activeTransportUnits = 0;
  activeStaticUnits = 0;
  avgUnit = 0;
  compania: string;
  isSuper: boolean;
  currentUser: User;
  graphDataExist: boolean = false;

  //canva graph
  bars: any;
  colorArray: any;

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
    //this.isSuper = this.currentUser.rol === Role.super
  }

  ngOnInit(): void {

    //this.getMapsInfo();
    //this.getGraphicValues();
    this.getActiveUnits();
    !this.isSuper && this.getCurrentCompany();    
  }

  createBarChart() {
    this.bars = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      //data: this.graphData,
      data: {
        labels: this.graphData.labels,
        datasets: [{
          label: 'Temperatura promedio',
          data: this.graphData.values,
          backgroundColor: 'rgba(0,0,0,0)', // array should have same number of elements as number of dataset
          borderColor: 'rgba(96, 175, 254)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              suggestedMin: -10,
              beginAtZero: false
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
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
    this.getGraphicValues();
    this.getAvg();
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
    console.log(' tempArray ', tempArray)
    console.log( ' ocurrencyArray', ocurrencyArray)

    var labels = Object.keys(tempArray)
    console.log(' labels ', labels) 
    var values = [];
    labels.forEach(index => {
      values.push(tempArray[index]/ocurrencyArray[index]) 
    })
    console.log(' values ', values)
   
    if (labels && values){
      this.graphData.labels = labels;
      this.graphData.values = values;
    }
    console.log(this.graphData)
    
    this.createBarChart()
  }

  getCurrentCompany(){
    this.services.getCompaniesByID()
    .subscribe(
      (comp) => {
        this.compania = comp[0].comercio_nombre
      },
      (error) => {
        console.error(error);
      }
    )
  }

  getAvg() {
    this.isTruck ?
    this.services.geTruckUnitByPlateFromHLF(this.unit)
    .subscribe((registers: any) => {
      var aux = registers.data;
      var acumT = 0, countT = 0
      for (let i in aux){
        acumT += Number(aux[i].Record.temperatura)
        countT++
      }
      this.avgUnit = acumT/countT
    })
    :
    this.services.getStaticUnitBySerialIDFromHLF(this.unit)
    .subscribe(
      (registers: any) => {
        var aux = registers.data;
        var acumS = 0, countS = 0
        for (let i in aux){
          acumS += Number(aux[i].Record.temperatura)
          countS++
        }
        this.avgUnit = acumS/countS
      }
    )
  }

  getGraphicValues(){

    this.isTruck ?
    this.services.geTruckUnitByPlateFromHLF(this.unit)
    .subscribe(
      (data1: any) => {
        let aux = data1.data
        this.promArray = []
        for (let i in aux) {
          this.promArray.push({
            temp: Number(aux[i].Record.temperatura),
            date: new Date(aux[i].Record.fecha)
          })
        }
        this.calculateAvg(this.promArray);
      }
    )
    :
    this.services.getStaticUnitBySerialIDFromHLF(this.unit)
    .subscribe(
      (data1: any) => {
        let aux = data1.data
        this.promArray = []
        for (let i in aux) {
          this.promArray.push({
            temp: Number(aux[i].Record.temperatura),
            date: new Date(aux[i].Record.fecha)
          })
        }
        this.calculateAvg(this.promArray);
      }
    )

  }

  getActiveUnits(){
    this.services.getStaticUnits()
    .subscribe((n) => {
      this.activeUnits = Object.keys(n).length
      this.activeStaticUnits = Object.keys(n).length
    })

    this.services.getTrucks()
    .subscribe((c)=> {
      this.activeUnits += Object.keys(c).length
      this.activeTransportUnits = Object.keys(c).length
    })
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
