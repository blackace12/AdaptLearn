import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { LessonNaturalEarthquakePage } from './../lesson-natural-earthquake/lesson-natural-earthquake';
import { LessonNaturalVolcanoPage } from './../lesson-natural-volcano/lesson-natural-volcano';
import { LessonNaturalLandslidePage } from './../lesson-natural-landslide/lesson-natural-landslide';
import { LessonNaturalTsunamiPage } from './../lesson-natural-tsunami/lesson-natural-tsunami';
import { SettingsPage} from '../settings/settings';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Navbar } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-lesson-natural',
  templateUrl: 'lesson-natural.html',
})
export class LessonNaturalPage {
  @ViewChild(Navbar) navBar: Navbar;
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

        if (this.arrayTest.length == 3 || this.arrayTest.length == 4) {
          this.lessonUnlocked = [{
            name: "lock",
            valid: true,
          }];
          console.log('Undefined')

      }

      else if (this.arrayTest !== null) {
        for (var i = 0; i < this.arrayTest.length; i++) {
          if (this.arrayTest[i].Chapter_Quiz == "Earthquake" && this.arrayTest[i].Passed == true) {
            this.lessonUnlocked = [{
              valid: false,
            }];
            console.log('Unlocked')
          }
          else if (this.arrayTest[i].Chapter_Quiz == "Earthquake" && this.arrayTest[i].Passed == false) {
            this.lessonUnlocked = [{
              name: "lock",
              valid: true,
            }];
            console.log('Locked')
          }
        }
      }

      if (this.arrayTest.length == 3 || this.arrayTest.length == 4 || this.arrayTest.length == 5) {
        this.lessonUnlocked2 = [{
          name: "lock",
          valid: true,
        }];
        console.log('Undefined')
      }

      else if (this.arrayTest !== null) {
        for (var i = 0; i < this.arrayTest.length; i++) {
          if (this.arrayTest[i].Chapter_Quiz == "Volcanic" && this.arrayTest[i].Passed == true) {
            this.lessonUnlocked2 = [{
              valid: false,
            }];
            console.log('Unlocked')
          }
          else if (this.arrayTest[i].Chapter_Quiz == "Volcanic" && this.arrayTest[i].Passed == false) {
            this.lessonUnlocked2 = [{
              name: "lock",
              valid: true,
            }];
            console.log('Locked')
          }
        }
      }


      if (this.arrayTest.length == 3 || this.arrayTest.length == 4 || this.arrayTest.length == 5 || this.arrayTest.length == 6) {
        this.lessonUnlocked3 = [{
          name: "lock",
          valid: true,
        }];
        console.log('Undefined')
      }

      else if (this.arrayTest !== null) {
        for (var i = 0; i < this.arrayTest.length; i++) {
          if (this.arrayTest[i].Chapter_Quiz == "Landslide" && this.arrayTest[i].Passed == true) {
            this.lessonUnlocked3 = [{
              valid: false,
            }];
            console.log('Unlocked')
          }
          else if (this.arrayTest[i].Chapter_Quiz == "Landslide" && this.arrayTest[i].Passed == false) {
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
              console.log("2" +this.checkVisual)
            } else if (this.visual[2].style == "Visual") {
              this.checkVisual = this.visual[2].style;
              console.log("3" + this.checkVisual)
            }
          }
        }
      });
    });
  }



  SettingsPage(){
    this.navCtrl.push(SettingsPage)
  }

  earthquakesLesson(){
    if (this.checkVisual == 'Visual'){
      try {
        this.scrnOrnt.lock(this.scrnOrnt.ORIENTATIONS.LANDSCAPE);
      } catch (error){
        console.log (error);
      }
    }
    let loader = this.loadingCtrl.create({
      content: "Loading lesson content...",
      duration: 1500
    });
    this.navCtrl.push(LessonNaturalEarthquakePage)

    loader.present();
  }

  volcanoLesson(){
    if (this.checkVisual == 'Visual'){
      try {
        this.scrnOrnt.lock(this.scrnOrnt.ORIENTATIONS.LANDSCAPE);
      } catch (error){
        console.log (error);
      }
    }
    let loader = this.loadingCtrl.create({
      content: "Loading lesson content...",
      duration: 1500
    });
    this.navCtrl.push(LessonNaturalVolcanoPage)

    loader.present();
  }

  landslidesLesson(){
    if (this.checkVisual == 'Visual'){
      try {
        this.scrnOrnt.lock(this.scrnOrnt.ORIENTATIONS.LANDSCAPE);
      } catch (error){
        console.log (error);
      }
    }
    let loader = this.loadingCtrl.create({
      content: "Loading lesson content...",
      duration: 1500
    });
    this.navCtrl.push(LessonNaturalLandslidePage)

    loader.present();
  }

  tsunamiLesson(){
    if (this.checkVisual == 'Visual'){
      try {
        this.scrnOrnt.lock(this.scrnOrnt.ORIENTATIONS.LANDSCAPE);
      } catch (error){
        console.log (error);
      }
    }
    let loader = this.loadingCtrl.create({
      content: "Loading lesson content...",
      duration: 1500
    });
    this.navCtrl.push(LessonNaturalTsunamiPage)

    loader.present();
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.scrnOrnt.unlock();
    }
    console.log('ionViewDidLoad LessonNaturalPage');
  }


}
