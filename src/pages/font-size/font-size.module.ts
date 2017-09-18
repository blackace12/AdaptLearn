import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FontSizePage } from './font-size';

@NgModule({
  declarations: [
    FontSizePage,
  ],
  imports: [
    IonicPageModule.forChild(FontSizePage),
  ],
  exports: [
    FontSizePage
  ]
})
export class FontSizePageModule {}
