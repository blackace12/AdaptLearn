import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FontSizePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-font-size',
  templateUrl: 'font-size.html',
})
export class FontSizePage {

  private fontSize: number;
  private fontValue: number;

  constructor(private view: ViewController, public navParams: NavParams) {

  }
  
  ionViewWillLoad() {
    this.fontSize = this.navParams.get('data');
    console.log(this.fontSize + " upon loading");
  }

  applyModal(){
    this.fontValue = this.fontSize;
    console.log(this.fontValue + " after applying");
    //will pass value when modal is dismissed
    this.view.dismiss(this.fontValue);
  }


}
