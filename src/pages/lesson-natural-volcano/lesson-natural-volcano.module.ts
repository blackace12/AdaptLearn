import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LessonNaturalVolcanoPage } from './lesson-natural-volcano';

@NgModule({
  declarations: [
    LessonNaturalVolcanoPage,
  ],
  imports: [
    IonicPageModule.forChild(LessonNaturalVolcanoPage),
  ],
  exports: [
    LessonNaturalVolcanoPage
  ]
})
export class LessonNaturalVolcanoPageModule {}
