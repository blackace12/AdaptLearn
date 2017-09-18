import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LessonNaturalLandslidePage } from './lesson-natural-landslide';

@NgModule({
  declarations: [
    LessonNaturalLandslidePage,
  ],
  imports: [
    IonicPageModule.forChild(LessonNaturalLandslidePage),
  ],
  exports: [
    LessonNaturalLandslidePage
  ]
})
export class LessonNaturalLandslidePageModule {}
