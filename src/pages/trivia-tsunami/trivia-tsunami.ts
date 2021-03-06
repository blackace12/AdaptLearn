import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions } from 'ionic-angular';

/**
 * Generated class for the TriviaTsunamiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-trivia-tsunami',
  templateUrl: 'trivia-tsunami.html',
})
export class TriviaTsunamiPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController) {
  }

  fontSize: any;
  fontVal: any;

  trivia = [
    {
      title: "Common causes for tsunamis",
      image: "./assets/trivia/tsunami/1.svg",
      description: "A tsunami is a series of ocean waves caused by an underwater earthquake, landslide, or volcanic eruption. More rarely, a tsunami can be generated by a giant meteor impact with the ocean. These waves can reach heights of over 100 ft.",
    },
    {
      title: "Ring of Fire",
      image: "./assets/trivia/tsunami/2.svg",
      description: "About 80% of tsunamis happen within the Pacific Ocean’s “Ring of Fire.”",
    },
    {
      title: "Wave Train",
      image: "./assets/trivia/tsunami/3.svg",
      description: "The first wave of a tsunami is usually not the strongest, successive waves get bigger and stronger.",
    },
    {
      title: "Speed of Tsunamis",
      image: "./assets/trivia/tsunami/4.svg",
      description: "Tsunamis can travel at speeds of about 500 miles or 805 kilometers an hour, almost as fast as a jet plane.",
    },
    {
      title: "Don't swim!",
      image: "./assets/trivia/tsunami/5.svg",
      description: "If caught by a tsunami wave, it is better not to swim, but rather to grab a floating object and allow the current to carry you.",
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
    console.log('ionViewDidLoad TriviaTsunamiPage');
  }

}
