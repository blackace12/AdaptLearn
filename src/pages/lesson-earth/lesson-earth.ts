import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import { LessonEarthSolarsystemPage } from './../lesson-earth-solarsystem/lesson-earth-solarsystem';
import { LessonEarthUniversePage} from './../lesson-earth-universe/lesson-earth-universe';
import { LessonEarthEarthsystemPage} from './../lesson-earth-earthsystem/lesson-earth-earthsystem';
import { LessonEarthAstronomyPage} from './../lesson-earth-astronomy/lesson-earth-astronomy';
import { SettingsPage} from '../settings/settings';

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

  //FOR VISUAL
  fontSize: any;
  fontVal: any;
  learningStyleObject2: FirebaseObjectObservable<any>;
  learningStyleObject: FirebaseObjectObservable<any>;
  selectedTheme: String; //new
  styleArray = ["Solitary", "Visual", "Auditory", "Logical", "Physical", "Social", "Verbal"];
  styles: any[] = [];
  user = [];
  userLearningID: FirebaseObjectObservable<any>

  checkVisual;
  visual = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public af: AngularFireDatabase, public afAuth: AngularFireAuth, public scrnOrnt: ScreenOrientation) {
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
          if (this.arrayTest[i].Chapter_Quiz == "Universe Formation" && this.arrayTest[i].Passed == true) {
            this.lessonUnlocked = [{
              valid: false,
            }];
            console.log('Unlocked')
          }
          else if (this.arrayTest[i].Chapter_Quiz == "Universe Formation" && this.arrayTest[i].Passed == false) {
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
          if (this.arrayTest[i].Chapter_Quiz == "Solar System" && this.arrayTest[i].Passed == true) {
            this.lessonUnlocked3 = [{
              valid: false,
            }];
            console.log('Unlocked')
          }
          else if (this.arrayTest[i].Chapter_Quiz == "Solar System" && this.arrayTest[i].Passed == false) {
            this.lessonUnlocked3 = [{
              name: "lock",
              valid: true,
            }];
            console.log('Locked')
          }
        }
      }
    });

    //GETTING THE VISUAL
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
    console.log('ionViewDidLoad LessonEarthPage');
  }

  SettingsPage() {
    this.navCtrl.push(SettingsPage)
  }

  universeLesson() {
    if (this.checkVisual == 'Visual') {
      this.scrnOrnt.lock(this.scrnOrnt.ORIENTATIONS.LANDSCAPE);
    }
    let loader = this.loadingCtrl.create({
      content: "Loading lesson content...",
      duration: 1500
    });
    this.navCtrl.push(LessonEarthUniversePage);
    loader.present();
  }

  astronomyLesson() {
    if (this.checkVisual == 'Visual') {
      try {
        this.scrnOrnt.lock(this.scrnOrnt.ORIENTATIONS.LANDSCAPE);
      } catch (error) {
        console.log(error);
      }
    }
    let loader = this.loadingCtrl.create({
      content: "Loading lesson content...",
      duration: 1500
    });
    this.navCtrl.push(LessonEarthAstronomyPage);
   loader.present();
  }

  solarsystemLesson() {
    if (this.checkVisual == 'Visual') {
      try {
        this.scrnOrnt.lock(this.scrnOrnt.ORIENTATIONS.LANDSCAPE);
      } catch (error) {
        console.log(error);
      }
    }
    let loader = this.loadingCtrl.create({
      content: "Loading lesson content...",
      duration: 1500
    });
    this.navCtrl.push(LessonEarthSolarsystemPage);
    loader.present();
  }

  earthsystemLesson() {
    if (this.checkVisual == 'Visual') {
      try {
        this.scrnOrnt.lock(this.scrnOrnt.ORIENTATIONS.LANDSCAPE);
      } catch (error) {
        console.log(error);
      }
    }
    let loader = this.loadingCtrl.create({
      content: "Loading lesson content...",
      duration: 1500
    });
    this.navCtrl.push(LessonEarthEarthsystemPage);
    loader.present();
  }
}