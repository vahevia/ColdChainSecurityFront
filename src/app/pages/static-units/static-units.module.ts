import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { StaticUnitsPage } from './static-units.page';

const routes: Routes = [
  {
    path: '',
    component: StaticUnitsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    HttpClientModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes)
  ],
  declarations: [StaticUnitsPage]
})
export class StaticUnitsPageModule {}
