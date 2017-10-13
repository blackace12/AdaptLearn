import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TriviaAstronomyPage } from './trivia-astronomy';

@NgModule({
  declarations: [
    TriviaAstronomyPage,
  ],
  imports: [
    IonicPageModule.forChild(TriviaAstronomyPage),
  ],
  exports: [
    TriviaAstronomyPage
  ]
})
export class TriviaAstronomyPageModule {}
