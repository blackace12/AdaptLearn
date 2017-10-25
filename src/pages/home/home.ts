import { NameValidator } from './../../validators/name';
import { LearnertestPage } from './../learnertest/learnertest';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, ToastController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  introSlides: FirebaseListObservable<any>;
  currentUser: any;
  userChecker: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public af: AngularFireDatabase, public afAuth: AngularFireAuth, public alertCtrl: AlertController,public toastCtrl: ToastController) {
    this.introSlides = af.list('/Users/');
    this.currentUser = afAuth.auth.currentUser.uid;
    this.userChecker = af.list('/Users/');
  }

  slides = [
    {
      title: "Welcome to AdaptLearn!",
      description: "A <b>Multi-modal Hybrid Learning Application</b> designed to generate multimodal adaptive learning content based on your learning style.",
      image: "./assets/img/adapt2.png",
    },
    {
      title: "How AdaptLearn Works?",
      description: "<b>AdaptLearn</b> test you out by answering learning style questions and returns back your learning style.",
      image: "./assets/img/2nd.png"
    },
    {
      title: "Learning Content",
      description: "The combination of your top 3 learning styles will be the basis in the presentation of the learning content.",
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
          placeholder: 'Enter Name',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Save',
          handler: data => {
            if (NameValidator.isValid(data.name)) {
              this.introSlides.update(this.currentUser, { UserName: data.name });
              this.userChecker.update(this.currentUser,{ Checker: 'true' })
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






