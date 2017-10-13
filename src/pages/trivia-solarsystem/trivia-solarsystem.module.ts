import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TriviaSolarsystemPage } from './trivia-solarsystem';

@NgModule({
  declarations: [
    TriviaSolarsystemPage,
  ],
  imports: [
    IonicPageModule.forChild(TriviaSolarsystemPage),
  ],
  exports: [
    TriviaSolarsystemPage
  ]
})
export class TriviaSolarsystemPageModule {}
