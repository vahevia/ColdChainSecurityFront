import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { AreasPage } from './areas.page';

const routes: Routes = [
  {
    path: '',
    component: AreasPage
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
  declarations: [AreasPage]
})
export class AreasPageModule {}
