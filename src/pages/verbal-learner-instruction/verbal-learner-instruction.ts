import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SettingsPage} from '../settings/settings';

/**
 * Generated class for the VerbalLearnerInstructionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-verbal-learner-instruction',
  templateUrl: 'verbal-learner-instruction.html',
})
export class VerbalLearnerInstructionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerbalLearnerInstructionPage');
  }
  
  SettingsPage(){
    this.navCtrl.push(SettingsPage)
  }

  public prev(): void {
    this.viewCtrl.dismiss();
  }

}
