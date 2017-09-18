import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisualLearnerInstructionPage } from './visual-learner-instruction';

@NgModule({
  declarations: [
    VisualLearnerInstructionPage,
  ],
  imports: [
    IonicPageModule.forChild(VisualLearnerInstructionPage),
  ],
  exports: [
    VisualLearnerInstructionPage
  ]
})
export class VisualLearnerInstructionPageModule {}
