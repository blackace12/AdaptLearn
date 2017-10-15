import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions } from 'ionic-angular';

/**
 * Generated class for the TriviaSolarsystemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-trivia-solarsystem',
  templateUrl: 'trivia-solarsystem.html',
})
export class TriviaSolarsystemPage {

  fontSize: any;
  fontVal: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController) {
  }

  trivia = [
    {
      title: "No Sun is Alone",
      image: "./assets/trivia/solarsystem/1.svg",
      description: "Did you know that the sun is in fact a star, and that the stars in the night sky are all suns in their own right? And each of these billions of stars could in fact have their own planetary systems. NASA's Kepler mission has already found over one hundred confirmed planets of other stars within our galaxy.",
    },
    {
      title: "Long Arm of the Sun",
      image: "./assets/trivia/solarsystem/2.svg",
      description: "Even though it has been over 35 years since NASA's Voyager spacecraft launched they are both still within our sun's sphere of influence.",
    },
    {
      title: "Copernican Model",
      image: "./assets/trivia/solarsystem/3.svg",
      description: "Nicolaus Copernicus published his sun-centered (heliocentric) model of the solar system in 1543. However, It was not until the 1700s did the idea of a sun-centered system become widely accepted.",
    },
    {
      title: "Long Ride",
      image: "./assets/trivia/solarsystem/4.svg",
      description: "The sun seems small when we look at it because it is 150 million km (93 million miles) from Earth. If you could somehow fly an airplane to the sun, it would take 26 years. Even super fast particles of light take eight minutes and 19 seconds to get from the sun to the Earth.",
    },
    {
      title: "Steady Hand",
      image: "./assets/trivia/solarsystem/5.svg",
      description: "Our moon stabilizes Earth's wobble. That helps make Earth an easier place to live.",
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
    console.log('ionViewDidLoad TriviaSolarsystemPage');
  }

}
