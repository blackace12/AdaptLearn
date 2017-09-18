import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizTsunamiPage } from './quiz-tsunami';

@NgModule({
  declarations: [
    QuizTsunamiPage,
  ],
  imports: [
    IonicPageModule.forChild(QuizTsunamiPage),
  ],
  exports: [
    QuizTsunamiPage
  ]
})
export class QuizTsunamiPageModule {}
