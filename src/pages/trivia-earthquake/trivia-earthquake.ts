import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions } from 'ionic-angular';

/**
 * Generated class for the TriviaEarthquakePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-trivia-earthquake',
  templateUrl: 'trivia-earthquake.html',
})
export class TriviaEarthquakePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController) {
  }

  fontSize: any;
  fontVal: any;

  trivia = [
    {
      title: "Largest Earthquake",
      image: "./assets/trivia/earthquake/1.svg",
      description: "The largest recorded earthquake in the world was a magnitude 9.5 (Mw) in Chile on May 22, 1960.",
    },
    {
      title: "Moonquakes",
      image: "./assets/trivia/earthquake/2.svg",
      description: "Moonquakes (“earthquakes” on the moon) do occur, but they happen less frequently and have smaller magnitudes than earthquakes on the Earth. It appears they are related to the tidal stresses associated with the varying distance between the Earth and Moon. They also occur at great depth, about halfway between the surface and the center of the moon.",
    },
    {
      title: "Ring of Fire",
      image: "./assets/trivia/earthquake/3.svg",
      description: "The “Ring of Fire” also called the Circum-Pacific belt, is the zone of earthquakes surrounding the Pacific Ocean — about 90% of the world’s earthquakes occur there. The next most seismic region (5-6% of earthquakes) is the Alpide belt (extends from Mediterranean region, eastward through Turkey, Iran, and northern India.",
    },
    {
      title: "Detectable Earthquake",
      image: "./assets/trivia/earthquake/4.svg",
      description: "It is estimated that there are 500,000 detectable earthquakes in the world each year. 100,000 of those can be felt, and 100 of them cause damage.",
    },
    {
      title: "'Earthquake Weather'",
      image: "./assets/trivia/earthquake/5.svg",
      description: "As far as we know, there is no such thing as 'earthquake weather'. Statistically, there is an equal distribution of earthquakes in cold weather, hot weather, rainy weather, etc. If weather does affect earthquake occurrence, we do not yet understand how it works.",
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
    console.log('ionViewDidLoad TriviaEarthquakePage');
  }

}
