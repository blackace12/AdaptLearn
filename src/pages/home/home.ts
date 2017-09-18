import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

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

    onButtonClicked(){
      this.navCtrl.push(LoginPage);
    }
}




