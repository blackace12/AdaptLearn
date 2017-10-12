import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TriviaUniversePage } from './trivia-universe';

@NgModule({
  declarations: [
    TriviaUniversePage,
  ],
  imports: [
    IonicPageModule.forChild(TriviaUniversePage),
  ],
  exports: [
    TriviaUniversePage
  ]
})
export class TriviaUniversePageModule {}
