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

  marks: Array<any>=[
    {
      lat: 10.482390, 
      lng: -66.818895
    },
    {
      lat: 10.482546,
      lng: -66.819021
    },
    {
      lat: 10.482979, 
      lng: -66.819080
    }
  ]

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

  // ngOnInit(){
  //   this.lineChart = new Chart(this.lineCanvas.nativeElement, {
  //     type: "line",
  //     data: {
  //       labels: ["January", "February", "March", "April", "May", "June", "July"],
  //       datasets: [
  //         {
  //           label: "My First dataset",
  //           fill: false,
  //           lineTension: 0.1,
  //           backgroundColor: "rgba(75,192,192,0.4)",
  //           borderColor: "rgba(75,192,192,1)",
  //           borderCapStyle: "butt",
  //           borderDash: [],
  //           borderDashOffset: 0.0,
  //           borderJoinStyle: "miter",
  //           pointBorderColor: "rgba(75,192,192,1)",
  //           pointBackgroundColor: "#fff",
  //           pointBorderWidth: 1,
  //           pointHoverRadius: 5,
  //           pointHoverBackgroundColor: "rgba(75,192,192,1)",
  //           pointHoverBorderColor: "rgba(220,220,220,1)",
  //           pointHoverBorderWidth: 2,
  //           pointRadius: 1,
  //           pointHitRadius: 10,
  //           data: [65, 59, 80, 81, 56, 55, 40],
  //           spanGaps: false
  //         }
  //       ]
  //     }
  //   });
  // }

  ngOnInit(): void {
    this.services.getTrucks()
    .subscribe(
      (unidades) => {
        for(let data in unidades){
          this.units.push({
            name: unidades[data].unidad_placa,
          });
          this.units=[...this.units]
      }
      console.log('unidades', this.units);
    },
      (error) => {
        console.error(error);
      }
    );

    const pos = {
      lat: 10.482390, lng: -66.818895
    }
    this.map = new google.maps.Map(
        this.mapElement.nativeElement,
        {
          center: pos,
          zoom: 20
        });
        const marker = new google.maps.Marker({
          position: pos,
          map: this.map
        });
  }

   // Grafica

  multi: any[] = [
      {
        "name":"Unidad 1",
        "series": [
          {
            "name":"12 pm",
            "value": 22
          },
          {
            "name":"12:10 pm",
            "value": 23
          },
          {
            "name":"12:20 pm",
            "value": 28
          },
          {
            "name":"12:30 pm",
            "value": 26
          },
          {
            "name":"12:40 pm",
            "value": 27
          },
          {
            "name":"12:50 pm",
            "value": 29
          },
          {
            "name":"1 pm",
            "value": 27
          },
          {
            "name":"1:10 pm",
            "value": 23
          },
          {
            "name":"1:20 pm",
            "value": 28
          },
          {
            "name":"1:30 pm",
            "value": 26
          },
          {
            "name":"1:40 pm",
            "value": 27
          },
          {
            "name":"1:50 pm",
            "value": 29
          },
          {
            "name":"2 pm",
            "value": 27
          }
        ]
      },
      {
      "name":"Unidad 2",
      "series": [
        {
          "name":"12 pm",
          "value": 22
        },
        {
          "name":"12:10 pm",
          "value": 24
        },
        {
          "name":"12:20 pm",
          "value": 23
        },
        {
          "name":"12:30 pm",
          "value": 24
        },
        {
          "name":"12:40 pm",
          "value": 25
        },
        {
          "name":"12:50 pm",
          "value": 28
        },
        {
          "name":"1 pm",
          "value": 22
        },
        {
          "name":"1:10 pm",
          "value": 24
        },
        {
          "name":"1:20 pm",
          "value": 23
        },
        {
          "name":"1:30 pm",
          "value": 24
        },
        {
          "name":"1:40 pm",
          "value": 25
        },
        {
          "name":"1:50 pm",
          "value": 28
        },
        {
          "name":"2 pm",
          "value": 29
        }
      ]
    },
    {
      "name":"Unidad 3",
      "series": [
        {
          "name":"12 pm",
          "value": 20
        },
        {
          "name":"12:10 pm",
          "value": 22
        },
        {
          "name":"12:20 pm",
          "value": 21
        },
        {
          "name":"12:30 pm",
          "value": 23
        },
        {
          "name":"12:40 pm",
          "value": 25
        },
        {
          "name":"12:50 pm",
          "value": 24
        },
        {
          "name":"1 pm",
          "value": 20
        },
        {
          "name":"1:10 pm",
          "value": 22
        },
        {
          "name":"1:20 pm",
          "value": 21
        },
        {
          "name":"1:30 pm",
          "value": 23
        },
        {
          "name":"1:40 pm",
          "value": 25
        },
        {
          "name":"1:50 pm",
          "value": 24
        },
        {
          "name":"2 pm",
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
