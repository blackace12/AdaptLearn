import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';

@IonicPage()
@Component({
  selector: 'page-kinesthetic-learner-instruction',
  templateUrl: 'kinesthetic-learner-instruction.html',
})
export class KinestheticLearnerInstructionPage {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KinestheticLearnerInstructionPage');
  }

  SettingsPage() {
    this.navCtrl.push(SettingsPage)
  }

  public prev(): void {
    this.viewCtrl.dismiss();
  }

}
