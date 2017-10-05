import { LoginPage } from '../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
  public resetPasswordForm:FormGroup;
  constructor(public navParams: NavParams,public authData: AuthProvider, public formBuilder: FormBuilder,
    public navCtrl: NavController, public alertCtrl: AlertController) {

      this.resetPasswordForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      })
  }


  resetPassword(){
    if (!this.resetPasswordForm.valid){
      console.log(this.resetPasswordForm.value);
    } else {
      this.authData.resetPassword(this.resetPasswordForm.value.email)
      .then((user) => {
        let alert = this.alertCtrl.create({
          message: "We just sent you a reset link to your email",
          buttons: [
            {
              text: "Ok",
              role: 'cancel',
              handler: () => {
                this.navCtrl.push(LoginPage);
              }

            }
          ]
        });
        alert.present();
      }, (error) => {
        var errorMessage: string = error.message;
        let errorAlert = this.alertCtrl.create({
          message: errorMessage,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        errorAlert.present();
      });
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }






  registerPage(){
    this.navCtrl.push(RegisterPage);
  }

}
