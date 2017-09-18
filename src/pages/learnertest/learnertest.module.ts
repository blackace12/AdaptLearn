import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LearnertestPage } from './learnertest';

@NgModule({
  declarations: [
    LearnertestPage,
  ],
  imports: [
    IonicPageModule.forChild(LearnertestPage),
  ],
  exports: [
    LearnertestPage
  ]
})
export class LearnertestPageModule {}
