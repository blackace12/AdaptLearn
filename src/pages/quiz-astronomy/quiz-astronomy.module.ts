import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizAstronomyPage } from './quiz-astronomy';

@NgModule({
  declarations: [
    QuizAstronomyPage,
  ],
  imports: [
    IonicPageModule.forChild(QuizAstronomyPage),
  ],
  exports: [
    QuizAstronomyPage
  ]
})
export class QuizAstronomyPageModule {}
