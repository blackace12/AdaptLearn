import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Navbar } from 'ionic-angular';
import { LessonNaturalPage } from './../lesson-natural/lesson-natural';
import { LessonEarthPage } from './../lesson-earth/lesson-earth';
import { LessonMitadaptPage } from './../lesson-mitadapt/lesson-mitadapt';
import { SettingsPage } from '../settings/settings';
/**
 * Generated class for the LessonPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-lesson',
  templateUrl: 'lesson.html',
})
export class LessonPage {
  @ViewChild(Navbar) navBar: Navbar;
  currentUser: any;
  hazardsUnlocked: any;
  mitAdaptUnlocked: any;
  lessonStatus: FirebaseObjectObservable<any>;
  arrayTest = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public af: AngularFireDatabase, public afAuth: AngularFireAuth, public scrnOrnt: ScreenOrientation) {
    this.currentUser = this.afAuth.auth.currentUser.uid;

    this.lessonStatus = this.af.object("/UserProgress/" + this.currentUser + '/', { preserveSnapshot: true });

    this.lessonStatus.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.arrayTest.push(snapshot.val());

      });
      console.log(this.arrayTest.length);

      //2
      if (this.arrayTest.length == 0 || this.arrayTest.length == 1 || this.arrayTest.length == 2 || this.arrayTest.length == 3 ) {
        this.hazardsUnlocked = [{
          name: "lock",
          valid: true,
        }];
        console.log('Undefined')
      }

      else if (this.arrayTest !== null) {
        for (var i = 0; i < this.arrayTest.length; i++) {
          if (this.arrayTest[i].Chapter_Quiz == "Earth System" && this.arrayTest[i].Passed == true) {
            this.hazardsUnlocked = [{
              valid: false,
            }];
            console.log('Unlocked')
          }
          else if (this.arrayTest[i].Chapter_Quiz == "Earth System" && this.arrayTest[i].Passed == false) {
            this.hazardsUnlocked = [{
              name: "lock",
              valid: true,
            }];
            console.log('Locked')
          }
        }
      }

      //6
      if (this.arrayTest.length == 0 || this.arrayTest.length == 1 || this.arrayTest.length == 2 || this.arrayTest.length == 3 || this.arrayTest.length == 4 || this.arrayTest.length == 5 || this.arrayTest.length == 6 || this.arrayTest.length == 7) {
        this.mitAdaptUnlocked = [{
          name: "lock",
          valid: true,
        }];
        console.log('Undefined')
      }

      else if (this.arrayTest !== null) {
        for (var i = 0; i < this.arrayTest.length; i++) {
          if (this.arrayTest[i].Chapter_Quiz == "Tsunami" && this.arrayTest[i].Passed == true) {
            this.mitAdaptUnlocked = [{
              name: "unlock",
              valid: false,
            }];
            console.log('Unlocked')
          }
          else if (this.arrayTest[i].Chapter_Quiz == "Tsunami" && this.arrayTest[i].Passed == false) {
            this.mitAdaptUnlocked = [{
              name: "lock",
              valid: true,
            }];
            console.log('Locked')
          }
        }
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LessonPage');
  }

  SettingsPage() {
    this.navCtrl.push(SettingsPage)
  }

  earthLesson() {
    let loader = this.loadingCtrl.create({
      content: "Loading Lessons...",
      duration: 1000
    });
    this.navCtrl.push(LessonEarthPage);
    loader.present();
  }


  naturalLesson() {
    let loader = this.loadingCtrl.create({
      content: "Loading Lessons...",
      duration: 1000
    });
    this.navCtrl.push(LessonNaturalPage);
    loader.present();

  }

  mitadaptLesson() {
    let loader = this.loadingCtrl.create({
      content: "Loading Lessons...",
      duration: 1000
    });
    this.navCtrl.push(LessonMitadaptPage);
    try {
      this.scrnOrnt.lock(this.scrnOrnt.ORIENTATIONS.LANDSCAPE);
    } catch (error){
      console.log (error);
    }
    loader.present();
  }

}
