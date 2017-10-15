import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TriviaMitadaptPage } from './trivia-mitadapt';

@NgModule({
  declarations: [
    TriviaMitadaptPage,
  ],
  imports: [
    IonicPageModule.forChild(TriviaMitadaptPage),
  ],
  exports: [
    TriviaMitadaptPage
  ]
})
export class TriviaMitadaptPageModule {}
