import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SettingsPage} from '../settings/settings';

/**
 * Generated class for the SocialLearnerInstructionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-social-learner-instruction',
  templateUrl: 'social-learner-instruction.html',
})
export class SocialLearnerInstructionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialLearnerInstructionPage');
  }
  
  SettingsPage(){
    this.navCtrl.push(SettingsPage)
  }

  public prev(): void {
    this.viewCtrl.dismiss();
  }

}
