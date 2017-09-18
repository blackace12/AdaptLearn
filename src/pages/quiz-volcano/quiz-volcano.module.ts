import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizVolcanoPage } from './quiz-volcano';

@NgModule({
  declarations: [
    QuizVolcanoPage,
  ],
  imports: [
    IonicPageModule.forChild(QuizVolcanoPage),
  ],
  exports: [
    QuizVolcanoPage
  ]
})
export class QuizVolcanoPageModule {}
