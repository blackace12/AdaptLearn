import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, LoadingController, Navbar } from 'ionic-angular';
import { LessonNaturalPage } from './../lesson-natural/lesson-natural';
import { LessonEarthPage } from './../lesson-earth/lesson-earth';
import { LessonMitadaptPage } from './../lesson-mitadapt/lesson-mitadapt';
import { SettingsPage } from '../settings/settings';

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


  //FOR VISUAL
  learningStyleObject2: FirebaseObjectObservable<any>;
  learningStyleObject: FirebaseObjectObservable<any>;
  styleArray = ["Solitary", "Visual", "Auditory", "Logical", "Physical", "Social", "Verbal"];
  user = [];
  userLearningID: FirebaseObjectObservable<any>
  checkVisual;
  visual = [];

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public af: AngularFireDatabase, public afAuth: AngularFireAuth, public scrnOrnt: ScreenOrientation) {
    this.currentUser = this.afAuth.auth.currentUser.uid;

    this.lessonStatus = this.af.object("/UserProgress/" + this.currentUser + '/', { preserveSnapshot: true });

    this.lessonStatus.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.arrayTest.push(snapshot.val());

      });
      console.log(this.arrayTest.length);

      //2
      if (this.arrayTest.length == 0 || this.arrayTest.length == 1 || this.arrayTest.length == 2 || this.arrayTest.length == 3) {
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

    this.learningStyleObject = af.object('/LearningStyle/' + this.currentUser, { preserveSnapshot: true });

    this.learningStyleObject.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.user.push(snapshot.key);
      });
      this.userLearningID = af.object('/UserStyle/' + this.user[0], { preserveSnapshot: true });
      this.learningStyleObject2 = af.object('/LearningStyle/' + this.currentUser + '/' + this.user[0], { preserveSnapshot: true });
      this.learningStyleObject2.subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          console.log(snapshot.key);
          this.visual.push(snapshot.val());
        });
        console.log(this.visual);
        this.visual.sort(function (a, b) {
          return parseInt(b.value) - parseInt(a.value);
        });
        for (var i = 0; i <= this.styleArray.length - 1; i++) {
          if (this.visual[0].style == this.styleArray[i]) {
            if (this.visual[0].style == "Visual") {
              this.checkVisual = this.visual[0].style;
              console.log("1" + this.checkVisual);
            } else if (this.visual[1].style == "Visual") {
              this.checkVisual = this.visual[1].style;
              console.log("2" + this.checkVisual)
            } else if (this.visual[2].style == "Visual") {
              this.checkVisual = this.visual[2].style;
              console.log("3" + this.checkVisual)
            }
          }
        }
      });
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
    if (this.checkVisual == 'Visual') {
      try {
        this.scrnOrnt.lock(this.scrnOrnt.ORIENTATIONS.LANDSCAPE);
      } catch (error) {
        console.log(error);
      }
    }
    let loader = this.loadingCtrl.create({
      content: "Loading Lessons...",
      duration: 1000
    });
    this.navCtrl.push(LessonMitadaptPage);
    loader.present();
  }
}
