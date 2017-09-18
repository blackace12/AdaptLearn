import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KinestheticLearnerInstructionPage } from './kinesthetic-learner-instruction';

@NgModule({
  declarations: [
    KinestheticLearnerInstructionPage,
  ],
  imports: [
    IonicPageModule.forChild(KinestheticLearnerInstructionPage),
  ],
  exports: [
    KinestheticLearnerInstructionPage
  ]
})
export class KinestheticLearnerInstructionPageModule {}
