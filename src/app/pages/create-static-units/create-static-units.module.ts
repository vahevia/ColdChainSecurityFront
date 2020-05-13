import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateStaticUnitsPage } from './create-static-units.page';

const routes: Routes = [
  {
    path: '',
    component: CreateStaticUnitsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateStaticUnitsPage]
})
export class CreateStaticUnitsPageModule {}
