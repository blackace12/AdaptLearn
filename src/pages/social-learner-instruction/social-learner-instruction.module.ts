import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialLearnerInstructionPage } from './social-learner-instruction';

@NgModule({
  declarations: [
    SocialLearnerInstructionPage,
  ],
  imports: [
    IonicPageModule.forChild(SocialLearnerInstructionPage),
  ],
  exports: [
    SocialLearnerInstructionPage
  ]
})
export class SocialLearnerInstructionPageModule {}
