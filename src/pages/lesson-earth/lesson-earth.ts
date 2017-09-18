import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LessonEarthSolarsystemPage } from './../lesson-earth-solarsystem/lesson-earth-solarsystem';
import { LessonEarthUniversePage } from './../lesson-earth-universe/lesson-earth-universe';
import { LessonEarthEarthsystemPage } from './../lesson-earth-earthsystem/lesson-earth-earthsystem';
import { LessonEarthAstronomyPage } from './../lesson-earth-astronomy/lesson-earth-astronomy';
import { SettingsPage } from '../settings/settings';

@IonicPage()
@Component({
  selector: 'page-lesson-earth',
  templateUrl: 'lesson-earth.html',
})
export class LessonEarthPage {
  currentUser: any;
  lessonUnlocked: any;
  lessonUnlocked2: any;
  lessonUnlocked3: any;
  lessonStatus: FirebaseObjectObservable<any>;
  arrayTest = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public af: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.currentUser = this.afAuth.auth.currentUser.uid;

    this.lessonStatus = this.af.object("/UserProgress/" + this.currentUser + '/', { preserveSnapshot: true });

    this.lessonStatus.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.arrayTest.push(snapshot.val());

      });
      console.log(this.arrayTest.length);

        if (this.arrayTest.length == 0) {
          this.lessonUnlocked = [{
            name: "lock",
            valid: true,
          }];
          console.log('Undefined')

      }

      else if (this.arrayTest !== null) {
        for (var i = 0; i < this.arrayTest.length; i++) {
          if (this.arrayTest[i].Chapter_Quiz == "UniverseFormation" && this.arrayTest[i].Passed == true) {
            this.lessonUnlocked = [{
              name: "unlock",
              valid: false,
            }];
            console.log('Unlocked')
          }
          else if (this.arrayTest[i].Chapter_Quiz == "UniverseFormation" && this.arrayTest[i].Passed == false) {
            this.lessonUnlocked = [{
              name: "lock",
              valid: true,
            }];
            console.log('Locked')
          }
        }
      }

      if (this.arrayTest.length == 0 || this.arrayTest.length == 1) {
        this.lessonUnlocked2 = [{
          name: "lock",
          valid: true,
        }];
        console.log('Undefined')
      }

      else if (this.arrayTest !== null) {
        for (var i = 0; i < this.arrayTest.length; i++) {
          if (this.arrayTest[i].Chapter_Quiz == "Astronomy" && this.arrayTest[i].Passed == true) {
            this.lessonUnlocked2 = [{
              name: "unlock",
              valid: false,
            }];
            console.log('Unlocked')
          }
          else if (this.arrayTest[i].Chapter_Quiz == "Astronomy" && this.arrayTest[i].Passed == false) {
            this.lessonUnlocked2 = [{
              name: "lock",
              valid: true,
            }];
            console.log('Locked')
          }
        }
      }


      if (this.arrayTest.length == 0 || this.arrayTest.length == 1 || this.arrayTest.length == 2) {
        this.lessonUnlocked3 = [{
          name: "lock",
          valid: true,
        }];
        console.log('Undefined')
      }

      else if (this.arrayTest !== null) {
        for (var i = 0; i < this.arrayTest.length; i++) {
          if (this.arrayTest[i].Chapter_Quiz == "SolarSystem" && this.arrayTest[i].Passed == true) {
            this.lessonUnlocked3 = [{
              name: "unlock",
              valid: false,
            }];
            console.log('Unlocked')
          }
          else if (this.arrayTest[i].Chapter_Quiz == "SolarSystem" && this.arrayTest[i].Passed == false) {
            this.lessonUnlocked3 = [{
              name: "lock",
              valid: true,
            }];
            console.log('Locked')
          }
        }
      }

      //


    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LessonEarthPage');
  }

  SettingsPage() {
    this.navCtrl.push(SettingsPage)
  }

  universeLesson() {
    let loader = this.loadingCtrl.create({
      content: "Loading lesson content...",
      duration: 1500
    });
    this.navCtrl.push(LessonEarthUniversePage);
    loader.present();
  }

  astronomyLesson() {
    let loader = this.loadingCtrl.create({
      content: "Loading lesson content...",
      duration: 1500
    });
    this.navCtrl.push(LessonEarthAstronomyPage);
    loader.present();
  }

  solarsystemLesson() {
    let loader = this.loadingCtrl.create({
      content: "Loading lesson content...",
      duration: 1500
    });
    this.navCtrl.push(LessonEarthSolarsystemPage);
    loader.present();
  }

  earthsystemLesson() {
    let loader = this.loadingCtrl.create({
      content: "Loading lesson content...",
      duration: 1500
    });
    this.navCtrl.push(LessonEarthEarthsystemPage);
    loader.present();
  }
}