import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SettingsPage} from '../settings/settings';

/**
 * Generated class for the SolitaryLearnerInstructionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-solitary-learner-instruction',
  templateUrl: 'solitary-learner-instruction.html',
})
export class SolitaryLearnerInstructionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolitaryLearnerInstructionPage');
  }
  
  SettingsPage(){
    this.navCtrl.push(SettingsPage)
  }

  public prev(): void {
    this.viewCtrl.dismiss();
  }

}
