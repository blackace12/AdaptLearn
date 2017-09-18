import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AudioLearnerInstructionPage } from './audio-learner-instruction';

@NgModule({
  declarations: [
    AudioLearnerInstructionPage,
  ],
  imports: [
    IonicPageModule.forChild(AudioLearnerInstructionPage),
  ],
  exports: [
    AudioLearnerInstructionPage
  ]
})
export class AudioLearnerInstructionPageModule {}
