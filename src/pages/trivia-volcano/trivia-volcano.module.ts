import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TriviaVolcanoPage } from './trivia-volcano';

@NgModule({
  declarations: [
    TriviaVolcanoPage,
  ],
  imports: [
    IonicPageModule.forChild(TriviaVolcanoPage),
  ],
  exports: [
    TriviaVolcanoPage
  ]
})
export class TriviaVolcanoPageModule {}
