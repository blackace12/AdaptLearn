/* import { NameValidator } from './../../validators/name'; */
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public signupForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController, public authData: AuthProvider,
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public navParams: NavParams) {

    this.signupForm = formBuilder.group({
    /*   name:['', Validators.compose([Validators.required, NameValidator.isValid])], */
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.required])]
    });

  }

  loginPage() {
    this.navCtrl.setRoot(LoginPage);
  }

  signupUser() {
    if (!this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password)
        .then(() => {
          let alert = this.alertCtrl.create({
            title: 'Registration Successful',
            subTitle: 'Please login to continue.',
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  this.navCtrl.setRoot(LoginPage);
                }
              }
            ]
          });
          alert.present();
        }, (error) => {
          this.loading.dismiss().then(() => {
            var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
