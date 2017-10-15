import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions  } from 'ionic-angular';

/**
 * Generated class for the TriviaEarthsystemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-trivia-earthsystem',
  templateUrl: 'trivia-earthsystem.html',
})
export class TriviaEarthsystemPage {

  fontSize: any;
  fontVal: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController) {
  }

  trivia = [
    {
      title: "Thin Sheet of Air",
      image: "./assets/trivia/earthsystem/1.svg",
      description: "Earth's atmosphere is only about 60 miles (95 km) thick.",
    },
    {
      title: "Shields Up",
      image: "./assets/trivia/earthsystem/2.svg",
      description: "Earth's atmosphere is more than just air. It protects us from harmful things in space.",
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
    console.log('ionViewDidLoad TriviaEarthsystemPage');
  }

}
