import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TriviaEarthsystemPage } from './trivia-earthsystem';

@NgModule({
  declarations: [
    TriviaEarthsystemPage,
  ],
  imports: [
    IonicPageModule.forChild(TriviaEarthsystemPage),
  ],
  exports: [
    TriviaEarthsystemPage
  ]
})
export class TriviaEarthsystemPageModule {}
