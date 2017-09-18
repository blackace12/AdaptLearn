import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LessonNaturalEarthquakePage } from './lesson-natural-earthquake';

@NgModule({
  declarations: [
    LessonNaturalEarthquakePage,
  ],
  imports: [
    IonicPageModule.forChild(LessonNaturalEarthquakePage),
  ],
  exports: [
    LessonNaturalEarthquakePage
  ]
})
export class LessonNaturalEarthquakePageModule {}
