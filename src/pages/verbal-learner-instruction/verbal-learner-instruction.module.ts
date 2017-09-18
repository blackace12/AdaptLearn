import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerbalLearnerInstructionPage } from './verbal-learner-instruction';

@NgModule({
  declarations: [
    VerbalLearnerInstructionPage,
  ],
  imports: [
    IonicPageModule.forChild(VerbalLearnerInstructionPage),
  ],
  exports: [
    VerbalLearnerInstructionPage
  ]
})
export class VerbalLearnerInstructionPageModule {}
