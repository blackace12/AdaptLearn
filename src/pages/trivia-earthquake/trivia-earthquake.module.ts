import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TriviaEarthquakePage } from './trivia-earthquake';

@NgModule({
  declarations: [
    TriviaEarthquakePage,
  ],
  imports: [
    IonicPageModule.forChild(TriviaEarthquakePage),
  ],
  exports: [
    TriviaEarthquakePage
  ]
})
export class TriviaEarthquakePageModule {}
