import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { SettingsPage} from '../settings/settings';

@IonicPage()
@Component({
  selector: 'page-audio-learner-instruction',
  templateUrl: 'audio-learner-instruction.html',
})
export class AudioLearnerInstructionPage {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AudioLearnerInstructionPage');
  }

  SettingsPage(){
    this.navCtrl.push(SettingsPage)
  }

  public prev(): void {
    this.viewCtrl.dismiss();
  }

}
