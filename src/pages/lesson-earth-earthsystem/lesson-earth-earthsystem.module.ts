import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LessonEarthEarthsystemPage } from './lesson-earth-earthsystem';

@NgModule({
  declarations: [
    LessonEarthEarthsystemPage,
  ],
  imports: [
    IonicPageModule.forChild(LessonEarthEarthsystemPage),
  ],
  exports: [
    LessonEarthEarthsystemPage
  ]
})
export class LessonEarthEarthsystemPageModule {}
