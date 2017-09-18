import { QuizEarthsytemPage } from './quiz-earthsystem';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    QuizEarthsytemPage,
  ],
  imports: [
    IonicPageModule.forChild(QuizEarthsytemPage),
  ],
  exports: [
    QuizEarthsytemPage
  ]
})
export class QuizEarthsytemPageModule {}
