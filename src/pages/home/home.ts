import { NameValidator } from './../../validators/name';
import { LearnertestPage } from './../learnertest/learnertest';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  currentUser: any;
  introSlides: FirebaseListObservable<any>;
  public loading: Loading;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, af: AngularFireDatabase, afAuth: AngularFireAuth, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    this.introSlides = af.list('/Users/');
    this.currentUser = afAuth.auth.currentUser.uid;

  }

  slides = [
    {
      title: "Welcome to AdaptLearn!",
      description: "A <b>Multi-modal Hybrid Learning Application</b> designed to generate multimodal adaptive learning content based on the user’s learning style.",
      image: "./assets/img/adapt2.png",
    },
    {
      title: "How AdaptLearn Works?",
      description: "<b>AdaptLearn</b> test you out by answering learning style questions and returns back your learning style.",
      image: "./assets/img/2nd.png"
    },
    {
      title: "Result?",
      description: "The <b>Learning content</b> would be presented in a way that fits your learning style.",
      image: "./assets/img/3rd.png"
    }
  ];

  onButtonClicked() {
    this.introSlides.update(this.currentUser, { introSlides: 'true' });
    let prompt = this.alertCtrl.create({
      title: 'Hello Learner!',
      message: 'What shall I call you?',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          type: 'text'
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

            if (NameValidator.isValid(data.name)) {
              this.introSlides.update(this.currentUser, { UserName: data.name });
              this.navCtrl.setRoot(LearnertestPage);
            } else if (!NameValidator.isValid(data.name)) {
              this.showErrorToast('Invalid Name');
            }
            return true;
          }
        }
      ]
    });
    prompt.present();
  }

  showErrorToast(data: any) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 1000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}






