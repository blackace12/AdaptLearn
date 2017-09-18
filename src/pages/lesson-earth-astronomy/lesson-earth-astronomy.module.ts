import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LessonEarthAstronomyPage } from './lesson-earth-astronomy';

@NgModule({
  declarations: [
    LessonEarthAstronomyPage,
  ],
  imports: [
    IonicPageModule.forChild(LessonEarthAstronomyPage),
  ],
  exports: [
    LessonEarthAstronomyPage
  ]
})
export class LessonEarthAstronomyPageModule {}
