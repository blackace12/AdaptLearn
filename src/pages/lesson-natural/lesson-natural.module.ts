import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LessonNaturalPage } from './lesson-natural';

@NgModule({
  declarations: [
    LessonNaturalPage,
  ],
  imports: [
    IonicPageModule.forChild(LessonNaturalPage),
  ],
  exports: [
    LessonNaturalPage
  ]
})
export class LessonNaturalPageModule {}
