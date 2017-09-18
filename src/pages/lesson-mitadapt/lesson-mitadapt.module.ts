import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LessonMitadaptPage } from './lesson-mitadapt';

@NgModule({
  declarations: [
    LessonMitadaptPage,
  ],
  imports: [
    IonicPageModule.forChild(LessonMitadaptPage),
  ],
  exports: [
    LessonMitadaptPage
  ]
})
export class LessonMitadaptPageModule {}
