import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ProfileModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile-modal',
  templateUrl: 'profile-modal.html',
})
export class ProfileModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController) {
  }

  Reset(){
    let alert = this.alertCtrl.create({
      title: 'Reset Confirmation',
      message: 'Do you want to reset your Learning Style?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
          }
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('No clicked');
          }
        }

      ]
    });
    alert.present();
  }

  changePassword(){
    let alert = this.alertCtrl.create({
      title: 'Change Password',
      inputs: [
        {
          name: 'oldPassword',
          placeholder: 'Current Password'
        },
        {
          name: 'newPassword',
          placeholder: 'New Password',
          type: 'password'
        },
        {
          name: 'confPassword',
          placeholder: 'Confirm New Password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Change Password',
       /*    handler: data => {
            if (User.isValid(data.username, data.password)) {
              // logged in!
            } else {
              // invalid login
              return false;
            }
          } */
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileModalPage');
  }

}
