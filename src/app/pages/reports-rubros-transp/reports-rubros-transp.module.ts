import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { ReportsRubrosTranspPage } from './reports-rubros-transp.page';

const routes: Routes = [
  {
    path: '',
    component: ReportsRubrosTranspPage
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
  declarations: [ReportsRubrosTranspPage]
})
export class ReportsRubrosTranspPageModule {}
