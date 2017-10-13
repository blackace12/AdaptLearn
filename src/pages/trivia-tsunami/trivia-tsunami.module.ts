import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TriviaTsunamiPage } from './trivia-tsunami';

@NgModule({
  declarations: [
    TriviaTsunamiPage,
  ],
  imports: [
    IonicPageModule.forChild(TriviaTsunamiPage),
  ],
  exports: [
    TriviaTsunamiPage
  ]
})
export class TriviaTsunamiPageModule {}
