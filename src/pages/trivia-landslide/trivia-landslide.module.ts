import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TriviaLandslidePage } from './trivia-landslide';

@NgModule({
  declarations: [
    TriviaLandslidePage,
  ],
  imports: [
    IonicPageModule.forChild(TriviaLandslidePage),
  ],
  exports: [
    TriviaLandslidePage
  ]
})
export class TriviaLandslidePageModule {}
