import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions } from 'ionic-angular';

/**
 * Generated class for the TriviaAstronomyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-trivia-astronomy',
  templateUrl: 'trivia-astronomy.html',
})
export class TriviaAstronomyPage {

  fontSize: any;
  fontVal: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController) {
  }

  trivia = [
    {
      title: "The largest asteroid ever recorded is a mammoth piece of space rock named Ceres ",
      image: "./assets/trivia/astronomy/1.svg",
      description: "The asteroid is almost 600 miles in diameter. It's by far the largest in the asteroid belt and accounts for a whole third of the belt's mass. The surface area is approximately equal to the land area of India or Argentina. It's so big, there's actually some debate over whether to refer to it as a dwarf planet instead of an asteroid, even if it has mostly asteroid-like qualities. Ceres piques our interest specifically, as water in the form of ice has been spotted on its surface. An unmanned spacecraft named Dawn is due to be orbiting the space rock by 2015.",
    },
    {
      title: "Collision with Andromeda Galaxy",
      image: "./assets/trivia/astronomy/2.svg",
      description: "Our galaxy will collide with Andromeda Galaxy in about 5 billion years. Some astronomers refer to our two galaxy as a binary system of giant spirals.",
    },
    {
      title: "Dark Matter surrounding our galaxy",
      image: "./assets/trivia/astronomy/3.svg",
      description: "The stars, gas and dust of the Milky Way all orbit the center at a rate of about 220 kilometers per second. This constant rate for all stars at different distances from the core implies the existence of a shell of dark matter surrounding our galaxy.",
    }
  ];
  
  openModal() {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false //disables dismiss of modal when clicking outside modal
    };

    const myModal: Modal = this.modal.create('FontSizePage', { data: this.fontVal }, myModalOptions);

    //present font size modal
    myModal.present();

    //will receive value when modal is closed/dismissed
    myModal.onWillDismiss((fontValue) => {
      this.fontSize = fontValue;
      this.fontVal = fontValue;
      console.log(this.fontVal + " back to page");
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TriviaAstronomyPage');
  }

}
