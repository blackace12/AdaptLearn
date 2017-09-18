import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizLslidePage } from './quiz-lslide';

@NgModule({
  declarations: [
    QuizLslidePage,
  ],
  imports: [
    IonicPageModule.forChild(QuizLslidePage),
  ],
  exports: [
    QuizLslidePage
  ]
})
export class QuizLslidePageModule {}
