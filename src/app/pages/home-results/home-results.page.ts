import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController } from '@ionic/angular';

// Modals
import { SearchFilterPage } from '../../pages/modal/search-filter/search-filter.page';
import { ImagePage } from './../modal/image/image.page';
// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from './../../components/notifications/notifications.component';
declare var google;

@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss']
})


export class HomeResultsPage implements AfterContentInit {

  map;
  @ViewChild('mapElement') mapElement;
  
  searchKey = '';
  yourLocation = '123 Test Street';
  themeCover = 'assets/img/ionic4-Start-Theme-cover.jpg';

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
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController
  ) {

  }

  ngAfterContentInit(): void {
    const pos = {
      lat: 10.482390, lng: -66.818895
    }
    this.map = new google.maps.Map(
        this.mapElement.nativeElement,
        {
          center: pos,
          zoom: 15
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
            "name":"2 pm",
            "value": 27
          },
          {
            "name":"3 pm",
            "value": 28
          },
          {
          "name":"4 pm",
          "value": 29
        }
        ]
      },
      {
      "name":"Unidad 2",
      "series": [
        {
          "name":"2 pm",
          "value": 25
        },
        {
          "name":"3 pm",
          "value": 24
        },
        {
          "name":"4 pm",
          "value": 23
        }
      ]
    },
    {
      "name":"Unidad 3",
      "series": [
        {
          "name":"2 pm",
          "value": 22
        },
        {
          "name":"3 pm",
          "value": 21
        },
        {
          "name":"4 pm",
          "value": 20
        }
      ]
    },
    ];
  view: any[] = [100,100];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
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

  async alertLocation() {
    const changeLocation = await this.alertCtrl.create({
      header: 'Change Location',
      message: 'Type your Address.',
      inputs: [
        {
          name: 'location',
          placeholder: 'Enter your new Location',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Change',
          handler: async (data) => {
            console.log('Change clicked', data);
            this.yourLocation = data.location;
            const toast = await this.toastCtrl.create({
              message: 'Location was change successfully',
              duration: 3000,
              position: 'top',
              closeButtonText: 'OK',
              showCloseButton: true
            });

            toast.present();
          }
        }
      ]
    });
    changeLocation.present();
  }

  

  async presentImage(image: any) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { value: image }
    });
    return await modal.present();
  }

  

}
