import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LessonEarthPage } from './lesson-earth';

@NgModule({
  declarations: [
    LessonEarthPage,
  ],
  imports: [
    IonicPageModule.forChild(LessonEarthPage),
  ],
  exports: [
    LessonEarthPage
  ]
})
export class LessonEarthPageModule {}
