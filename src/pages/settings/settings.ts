import { AuthProvider } from './../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { SettingsProvider } from "../../providers/settings/settings";
import {
  AngularFireDatabase,
} from 'angularfire2/database';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  password:any;
  selectedTheme:String;
  title:String;
  public userProfile:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, af:AngularFireDatabase,afAuth:AngularFireAuth, public alertCtrl:AlertController, private settings: SettingsProvider, public auth:AuthProvider) {



    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    if(this.selectedTheme === 'day-theme'){
      this.title = "Enable Night Mode";
    } else{
      this.title = "Disable Night Mode";
    }
  }



  toggleAppTheme(){
    if(this.selectedTheme === 'day-theme'){
      this.settings.setActiveTheme('night-theme');
      this.title = "Disable Night Mode";
    } else{
      this.settings.setActiveTheme('day-theme');
      this.title = "Enable Night Mode";
    }
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


  updatePassword(){
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'oldPassword',
          placeholder: 'Old password',
          type: 'password'
        },
        {
          name: 'newPassword',
          placeholder: 'New password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
          this.settings.updatePassword(data.newPassword, data.oldPassword);
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
