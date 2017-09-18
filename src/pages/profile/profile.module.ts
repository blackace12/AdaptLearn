import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { ChartModule } from 'angular2-highcharts';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage), ChartModule.forRoot('highcharts')
  ],
  exports: [
    ProfilePage,
  ]
})
export class ProfilePageModule {}
