import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizSolarsystemPage } from './quiz-solarsystem';

@NgModule({
  declarations: [
    QuizSolarsystemPage,
  ],
  imports: [
    IonicPageModule.forChild(QuizSolarsystemPage),
  ],
  exports: [
    QuizSolarsystemPage
  ]
})
export class QuizSolarsystemPageModule {}
