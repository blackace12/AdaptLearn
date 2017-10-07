import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

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

  applyModal() {
    this.fontValue = this.fontSize;
    console.log(this.fontValue + " after applying");
    this.view.dismiss(this.fontValue);
  }
}
