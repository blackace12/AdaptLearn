import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizMitadaptPage } from './quiz-mitadapt';

@NgModule({
  declarations: [
    QuizMitadaptPage,
  ],
  imports: [
    IonicPageModule.forChild(QuizMitadaptPage),
  ],
  exports: [
    QuizMitadaptPage
  ]
})
export class QuizMitadaptPageModule {}
