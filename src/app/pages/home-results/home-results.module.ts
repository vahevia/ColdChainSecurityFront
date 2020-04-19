import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TranslateModule } from '@ngx-translate/core';


import { HomeResultsPage } from './home-results.page';

const routes: Routes = [
  {
    path: '',
    component: HomeResultsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxChartsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes)
  ],
  declarations: [HomeResultsPage]
})
export class HomeResultsPageModule {}
