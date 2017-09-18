import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { SettingsPage} from '../settings/settings';

/**
 * Generated class for the KinestheticLearnerInstructionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-kinesthetic-learner-instruction',
  templateUrl: 'kinesthetic-learner-instruction.html',
})
export class KinestheticLearnerInstructionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KinestheticLearnerInstructionPage');
  }
  
  SettingsPage(){
    this.navCtrl.push(SettingsPage)
  }

  public prev(): void {
    this.viewCtrl.dismiss();
  }

}
