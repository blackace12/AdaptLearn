import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ReferencePage } from './../reference/reference';
import { LoginPage } from './../login/login';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFireDatabase, afAuth: AngularFireAuth, public alertCtrl: AlertController, private settings: SettingsProvider, public auth: AuthProvider, public loadingCtrl: LoadingController, public scrnOrnt: ScreenOrientation) {


    this.currentUser = afAuth.auth.currentUser.uid;
    console.log(this.currentUser);


    this.userChecker = af.list('/Users/' + this.currentUser);
    console.log(this.userChecker);

    this.learningStyles = af.list('/LearningStyle/' + this.currentUser);
    console.log(this.learningStyles);

    this.userProgress = af.list('/UserProgress/' + this.currentUser);
    console.log(this.userProgress);

    this.quiz = af.list('/Quiz/');
    console.log(this.quiz);


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
      message: 'Are you sure you want to reset your account?',
      buttons: [
        {
          text: 'Yes',
          handler: data => {
            this.userChecker.remove();
            this.learningStyles.remove();

            if (this.userProgress != undefined || this.userProgress != null){
              this.userProgress.remove();
            }else {
              console.log('Undefined/Null');
            }

            let alert = this.alertCtrl.create({
              message: "Account successfully reset! Please login to continue.",
              buttons: [
                {
                  text: "Ok",
                  handler: data =>{
                    this.auth.logoutUser().then(() => {
                      this.changeToNight();
                      this.navCtrl.setRoot(LoginPage);
                    });
                  }
                }
              ]
            });
            alert.present();
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
      title:"Change Password",
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
        {
          name: 'confirmPassword',
          placeholder: 'Confirm password',
          type: 'password'
        },
      ],
      buttons: [
        {

            text: "Cancel",
            role: 'Cancel'

        },
        {
          text: 'Save',
          handler: data => {
            if (data.newPassword.length < 8){
              let alert = this.alertCtrl.create({
                message: "Password needs atleast 8 characters.",
                buttons: [
                  {
                    text: "Ok",
                    role:"Cancel"
                  }
                ]
              });
              alert.present();
            }
            else if (data.newPassword != data.confirmPassword) {
              let alert = this.alertCtrl.create({
                message: "Password does not match!",
                buttons: [
                  {
                    text: "Ok",
                    role:"Cancel"
                  }
                ]
              });
              alert.present();
            } else if (data.newPassword.length > 16){
              let alert = this.alertCtrl.create({
                message: "Password must not be greater than 16 characters.",
                buttons: [
                  {
                    text: "Ok",
                    role:"Cancel"
                  }
                ]
              });
              alert.present();
            } else {
              this.settings.updatePassword(data.newPassword, data.oldPassword).then(() => {
                let alert = this.alertCtrl.create({
                  message: "Password Changed Successfully!, Please log in again!",
                  buttons: [
                    {
                      text: "Ok",
                      role: 'Cancel'
                    }
                  ]
                });
                alert.present();
                this.navCtrl.setRoot(LoginPage);
                this.changeToNight();
              }, error => {
                this.loading.dismiss().then(() => {
                  let alert = this.alertCtrl.create({
                    message: error.message,
                    buttons: [
                      {
                        text: "Ok",
                        role: 'Cancel'
                      }
                    ]
                  });
                  alert.present();
                });
              });
              this.loading = this.loadingCtrl.create({
                dismissOnPageChange: true,
              });
              this.loading.present();
            }

          }
        }
      ]
    });
    alert.present();
  }

  References() {
    this.navCtrl.push(ReferencePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  ionViewWillEnter(){
    this.scrnOrnt.unlock();
    this.scrnOrnt.lock(this.scrnOrnt.ORIENTATIONS.PORTRAIT);
    console.log("Will Enter");
  }


  ionViewWillLoad(){
    this.scrnOrnt.unlock();
    this.scrnOrnt.lock(this.scrnOrnt.ORIENTATIONS.PORTRAIT);
    console.log("Will Load");
  }
  changeToNight() {
    if(this.selectedTheme === 'night-theme'){
      this.settings.setActiveTheme('day-theme');
    }
  }
}
