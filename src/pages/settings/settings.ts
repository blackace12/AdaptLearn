import { LoginPage } from './../login/login';
import { LearnertestPage } from './../learnertest/learnertest';
import { AuthProvider } from './../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { SettingsProvider } from "../../providers/settings/settings";
import {
  AngularFireDatabase,
  FirebaseListObservable
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
  currentUser: any;
  userChecker: any;
  learningStyles: FirebaseListObservable<any>;
  quiz: FirebaseListObservable<any>;
  userProgress: FirebaseListObservable<any>;
  userStyle: FirebaseListObservable<any>;
  password: any;
  selectedTheme: String;
  title: String;
  public userProfile: any;
  public loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFireDatabase, afAuth: AngularFireAuth, public alertCtrl: AlertController, private settings: SettingsProvider, public auth: AuthProvider, public loadingCtrl: LoadingController) {


    this.currentUser = afAuth.auth.currentUser.uid;
    console.log(this.currentUser);

    this.learningStyles = af.list('/LearningStyle/' + this.currentUser + '/');
    console.log(this.learningStyles);

    this.userChecker = af.list('/Users/' + this.currentUser);
    console.log(this.userChecker);

    this.quiz = af.list('/Quiz/');
    console.log(this.quiz);

    this.userProgress = af.list('/UserProgress/' + this.currentUser + '/');
    console.log(this.userProgress);

    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    if (this.selectedTheme === 'day-theme') {
      this.title = "Enable Night Mode";
    } else {
      this.title = "Disable Night Mode";
    }
  }

  toggleAppTheme() {
    if (this.selectedTheme === 'day-theme') {
      this.settings.setActiveTheme('night-theme');
      this.title = "Disable Night Mode";
    } else {
      this.settings.setActiveTheme('day-theme');
      this.title = "Enable Night Mode";
    }
  }

  Reset() {
    let alert = this.alertCtrl.create({
      title: 'Reset Confirmation',
      message: 'Do you want to reset your Learning Style?',
      buttons: [
        {
          text: 'Yes',
          handler: data => {
            this.userChecker.update({ Checker: "true" });
            this.userProgress.remove();
            this.learningStyles.remove();
            this.navCtrl.setRoot(LearnertestPage);
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


  updatePassword() {
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
            this.settings.updatePassword(data.newPassword, data.oldPassword).then(() => {
              let alert = this.alertCtrl.create({
                message: "Password Changed Successfully!, Please login again!",
                buttons: [
                  {
                    text: "Ok",
                    role: 'cancel'
                  }
                ]
              });
              alert.present();
              this.navCtrl.setRoot(LoginPage);
            })
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
