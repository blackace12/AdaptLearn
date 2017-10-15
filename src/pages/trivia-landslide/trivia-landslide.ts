import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions } from 'ionic-angular';

/**
 * Generated class for the TriviaLandslidePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-trivia-landslide',
  templateUrl: 'trivia-landslide.html',
})
export class TriviaLandslidePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController) {
  }

  fontSize: any;
  fontVal: any;

  trivia = [
    {
      title: "Common Type of Landslide",
      image: "./assets/trivia/landslide/1.svg",
      description: "Landslides occur when masses of rock, earth, or debris move down a slope. Debris flows, also known as mudslides, are a common type of fast-moving landslide that tends to flow in channels.",
    },
    {
      title: "Mudslides",
      image: "./assets/trivia/landslide/2.svg",
      description: "Mudslides develop when water rapidly accumulates in the ground and results in a surge of water-saturated rock, earth, and debris. Mudslides usually start on steep slopes and can be activated by natural disasters.",
    },
    {
      title: "Vulnerable Locations",
      image: "./assets/trivia/landslide/3.svg",
      description: "Areas where wildfires or human modification of the land have destroyed vegetation on slopes are particularly vulnerable to landslides during and after heavy rains.",
    },
    {
      title: "Effects of Landslides",
      image: "./assets/trivia/landslide/4.svg",
      description: "Landslides and mudflows can cause tons of damage, some of which can lead to actual injury including: Rapidly moving water and debris can lead to trauma; Broken electrical, water, gas, and sewage lines that can result in injury or illness.",
    },
    {
      title: "Landslides on other planets",
      image: "./assets/trivia/landslide/5.svg",
      description: "It is not just on earth in which landslides occur. Throughout the solar system there has been evidence that landslides have occurred, on Mars and Venus specifically. Scientists have had trained satellites orbiting the planets to view the landslides",
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
    console.log('ionViewDidLoad TriviaLandslidePage');
  }

}
