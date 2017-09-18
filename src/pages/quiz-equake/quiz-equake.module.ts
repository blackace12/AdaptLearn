import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizEquakePage } from './quiz-equake';

@NgModule({
  declarations: [
    QuizEquakePage,
  ],
  imports: [
    IonicPageModule.forChild(QuizEquakePage),
  ],
  exports: [
    QuizEquakePage
  ]
})
export class QuizEquakePageModule {}
