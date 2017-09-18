import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LessonNaturalTsunamiPage } from './lesson-natural-tsunami';

@NgModule({
  declarations: [
    LessonNaturalTsunamiPage,
  ],
  imports: [
    IonicPageModule.forChild(LessonNaturalTsunamiPage),
  ],
  exports: [
    LessonNaturalTsunamiPage
  ]
})
export class LessonNaturalTsunamiPageModule {}
