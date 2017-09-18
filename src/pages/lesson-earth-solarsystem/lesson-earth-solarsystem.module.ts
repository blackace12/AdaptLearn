import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LessonEarthSolarsystemPage } from './lesson-earth-solarsystem';

@NgModule({
  declarations: [
    LessonEarthSolarsystemPage,
  ],
  imports: [
    IonicPageModule.forChild(LessonEarthSolarsystemPage),AudioTrack
  ],
  exports: [
    LessonEarthSolarsystemPage
  ]
})
export class LessonEarthSolarsystemPageModule {}
