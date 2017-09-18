import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LogicalLearnerInstructionPage } from './logical-learner-instruction';

@NgModule({
  declarations: [
    LogicalLearnerInstructionPage,
  ],
  imports: [
    IonicPageModule.forChild(LogicalLearnerInstructionPage),
  ],
  exports: [
    LogicalLearnerInstructionPage
  ]
})
export class LogicalLearnerInstructionPageModule {}
