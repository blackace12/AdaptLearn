import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions } from 'ionic-angular';

/**
 * Generated class for the TriviaVolcanoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-trivia-volcano',
  templateUrl: 'trivia-volcano.html',
})
export class TriviaVolcanoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController) {
  }

  fontSize: any;
  fontVal: any;

  trivia = [
    {
      title: "Deep Down",
      image: "./assets/trivia/volcano/1.svg",
      description: "Almost all of Earth's volcanoes are hidden under the oceans.",
    },
    {
      title: "Volcanoes Erupt Because of Escaping Magma ",
      image: "./assets/trivia/volcano/2.svg",
      description: "About 30 km beneath your feet is the Earth’s mantle. It’s a region of superhot rock that extends down to the Earth’s core. This region is so hot that molten rock can squeeze out and form giant bubbles of liquid rock called magma chambers. This magma is lighter than the surrounding rock, so it rises up, finding cracks and weakness in the Earth’s crust. When it finally reaches the surface, it erupts out of the ground as lava, ash, volcanic gasses and rock. It’s called magma when it’s under the ground, and lava when it erupts onto the surface.",
    },
    {
      title: "Volcanoes can Grow Quickly ",
      image: "./assets/trivia/volcano/3.svg",
      description: "Although some volcanoes can take thousands of years to form, others can grow overnight. ",
    },
    {
      title: "The Tallest Volcano in the Solar System isn’t on Earth ",
      image: "./assets/trivia/volcano/4.svg",
      description: "That’s right, the tallest volcano in the Solar System isn’t on Earth at all, but on Mars. Olympus Mons, on Mars, is a giant shield volcano that rises to an elevation of 27 km, and it measures 550 km across. Scientists think that Olympus Mons was able to get so large because there aren’t any plate tectonics on Mars. A single hotspot was able to bubble away for billions of years, building the volcano up bigger and bigger.",
    },
    {
      title: "The Tallest and Biggest Volcanoes on Earth are side by side",
      image: "./assets/trivia/volcano/5.svg",
      description: "The tallest volcano on Earth is Hawaii’s Mauna Kea, with an elevation of 4,207 meters. It’s only a little bigger than the largest volcano on Earth, Mauna Loa with an elevation of only 4,169 meters. Both are shield volcanoes that rise up from the bottom of the ocean. If you could measure Mauna Kea from the base of the ocean to its peak, you’d get a true height of 10,203 meters (and that’s bigger than Mount Everest).",
    },
    {
      title: "The Most Distant Point from the Center of the Earth is a Volcano ",
      image: "./assets/trivia/volcano/6.svg",
      description: "You might think that the peak of Mount Everest is the most distant point from the center of the Earth, but that’s not true. Instead, it’s the volcano Chimborazo in Ecuador. That’s because the Earth is spinning in space and is flattened out. Points at the equator are further from the center of the Earth than the poles. And Chimborazo is very close to the Earth’s equator.",
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
    console.log('ionViewDidLoad TriviaVolcanoPage');
  }

}
