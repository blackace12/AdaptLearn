import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions } from 'ionic-angular';

/**
 * Generated class for the TriviaMitadaptPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-trivia-mitadapt',
  templateUrl: 'trivia-mitadapt.html',
})
export class TriviaMitadaptPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController) {
  }

  fontSize: any;
  fontVal: any;

  trivia = [
    {
      title: "Migration",
      image: "./assets/trivia/mitadapt/1.svg",
      description: "Animal who live in extreme cold or extreme hot places, when they fail to survive in odd environmental conditions. They migrate from that place to some more suitable place.",
    },
    {
      title: "Camouflage",
      image: "./assets/trivia/mitadapt/2.svg",
      description: "Some animals have ability that they can change their colour to match their background. This way is used to hide from predators or to seem less interesting to them.",
    },
    {
      title: "Hibernation",
      image: "./assets/trivia/mitadapt/3.svg",
      description: "If harsh environmental conditions make the survival difficult then some animals go in hibernation mode. It is a way to save energy.",
    },
    {
      title: "Resource conservation",
      image: "./assets/trivia/mitadapt/4.svg",
      description: "Camels are the best example of this type of adaptation. They are found in deserts, an area with lack of water. Camels are known to store water in their hump for later uses.",
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
    console.log('ionViewDidLoad TriviaMitadaptPage');
  }

}
