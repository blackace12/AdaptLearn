import { HomePage } from './../home/home';
import { LearnertestPage } from './../learnertest/learnertest';

import { SplashscreenPage } from './../splashscreen/splashscreen';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, ModalController, LoadingController,
  Loading, AlertController, ToastController
} from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  loading: Loading;
  checker: any;
  currentUser: any;
  introSlides:any;
  constructor(public navCtrl: NavController, public authData: AuthProvider, public navParams: NavParams, public modalCtrl: ModalController, public formBuilder: FormBuilder, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public af: AngularFireDatabase, public afAuth: AngularFireAuth, public toastCtrl: ToastController) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.required])]
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  loginUser(Checker: string) {
    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then(authData => {
          this.currentUser = this.afAuth.auth.currentUser.uid;
          if (this.currentUser != null) {
            var checked = this.af.object('/Users/' + this.currentUser, { preserveSnapshot: true });
            checked.subscribe(snapshot => {
              this.checker = snapshot.val().Checker;
              this.introSlides = snapshot.val().introSlides

              if (this.checker == "false" || this.introSlides == "false") {
                this.navCtrl.setRoot(HomePage);
              }
              else if(this.introSlides == "false" || this.introSlides == null){
                this.navCtrl.setRoot(HomePage);
              }
              else if (this.checker == "false" || this.checker == null){
                this.navCtrl.setRoot(LearnertestPage);
              }

              else {
                this.navCtrl.setRoot(SplashscreenPage);
              }

            });
          }else if (this.currentUser == null && this.checker == null || this.introSlides == null){
            console.log("User = null");
          }
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

  registerPage() {
    this.navCtrl.setRoot(RegisterPage);
  }
  forgotPage() {
    this.navCtrl.setRoot(ForgotpasswordPage);
  }

}
