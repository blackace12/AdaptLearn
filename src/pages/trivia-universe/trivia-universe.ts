import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions } from 'ionic-angular';

/**
 * Generated class for the TriviaUniversePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-trivia-universe',
  templateUrl: 'trivia-universe.html',
})
export class TriviaUniversePage {

  fontSize: any;
  fontVal: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController) {
  }

  trivia = [
    {
      title: "Neutron stars can spin at a rate of 600 rotations per second",
      image: "./assets/trivia/universe/1.svg",
      description: "Neutron stars are one of the possible evolutionary end-points of high mass stars. They are born in a core-collapse supernova star explosion and subsequently rotate extremely rapidly as a consequence of their physics. Neutron stars can rotate up to 60 times per second after born.",
    },
    {
      title: "All of space is completely silent",
      image: "./assets/trivia/universe/2.svg",
      description: "Sound waves need a medium to travel through. Since there is no atmosphere in space, space will always be eerily silent. You may be asking how astronauts can talk to each other in space. Lucky for them, radio waves can travel through space.",
    },
    {
      title: "The Apollo astronauts' footprints on the moon will probably stay there for at least 100 million years",
      image: "./assets/trivia/universe/3.svg",
      description: "The Apollo astronauts' footprints on the moon will probably stay there for at least 100 million years - Since the moon doesn't have an atmosphere, there's no wind or water to erode or wash away the Apollo astronauts' mark on the moon. That means their footprints, roverprints, spaceship prints, and discarded materials will stay preserved on the moon for a very long time. They won't stay on there forever, though. The moon still a dynamic environment. It's actually being constantly bombarded with 'micrometeorites,' which means that erosion is still happening on the moon, just very slowly.",
    },
    {
      title: "If two pieces of the same type of metal touch in space, they will bond and be permanently stuck together",
      image: "./assets/trivia/universe/4.svg",
      description: "If two pieces of the same type of metal touch in space, they will bond and be permanently stuck together - This amazing effect is called cold welding. It happens because the atoms of the individual pieces of metal have no way of knowing that they are different pieces of metal, so the lumps join together. This wouldn't happen on earth because there is air and water separating the pieces. The effect has a lot of implication for spacecraft construction and the future of metal-based construction in vacuums.",
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
    console.log('ionViewDidLoad TriviaUniversePage');
  }

}
