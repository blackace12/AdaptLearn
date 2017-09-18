import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LessonEarthUniversePage } from './lesson-earth-universe';

@NgModule({
  declarations: [
    LessonEarthUniversePage,
  ],
  imports: [
    IonicPageModule.forChild(LessonEarthUniversePage),
  ],
  exports: [
    LessonEarthUniversePage
  ]
})
export class LessonEarthUniversePageModule {}
