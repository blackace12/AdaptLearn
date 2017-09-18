import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SolitaryLearnerInstructionPage } from './solitary-learner-instruction';

@NgModule({
  declarations: [
    SolitaryLearnerInstructionPage,
  ],
  imports: [
    IonicPageModule.forChild(SolitaryLearnerInstructionPage),
  ],
  exports: [
    SolitaryLearnerInstructionPage
  ]
})
export class SolitaryLearnerInstructionPageModule {}
