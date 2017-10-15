import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { QuizPage } from './../quiz/quiz';
import { TriviaUniversePage } from './../trivia-universe/trivia-universe'
import { Component, ViewChild } from '@angular/core';
import { Navbar, IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions, ToastController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SettingsPage } from '../settings/settings';
import { AngularFireAuth } from 'angularfire2/auth';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { SettingsProvider } from "../../providers/settings/settings"; //new

@IonicPage()
@Component({
  selector: 'page-lesson-earth-universe',
  templateUrl: 'lesson-earth-universe.html',
})

export class LessonEarthUniversePage {
  @ViewChild(Navbar) navBar: Navbar;
  allTracks: any[];
  arrayTest = [];
  currentUser;
  fontSize: any;
  fontVal: any;
  learningStyleObject2: FirebaseObjectObservable<any>;
  learningStyleObject: FirebaseObjectObservable<any>;
  myTracks: any[];
  selectedTrack: any;
  selectedTheme: String; //new
  styleArray = ["Solitary", "Visual", "Auditory", "Logical", "Physical", "Social", "Verbal"];
  styles: any[] = [];
  user = [];
  userLearningID: FirebaseObjectObservable<any>
  first; second; third: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing, af: AngularFireDatabase, private modal: ModalController, public youtube: YoutubeVideoPlayer, db: AngularFireDatabase, afAuth: AngularFireAuth, public smartAudio: SmartAudioProvider, public toastCtrl: ToastController, private settings: SettingsProvider, public scrnOrnt: ScreenOrientation) {

    this.currentUser = afAuth.auth.currentUser.uid;
    this.learningStyleObject = db.object('/LearningStyle/' + this.currentUser, { preserveSnapshot: true });

    this.learningStyleObject.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.user.push(snapshot.key);
      });

      this.userLearningID = db.object('/UserStyle/' + this.user[0], { preserveSnapshot: true });

      this.learningStyleObject2 = db.object('/LearningStyle/' + this.currentUser + '/' + this.user[0], { preserveSnapshot: true });

      this.learningStyleObject2.subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          console.log(snapshot.key);
          this.arrayTest.push(snapshot.val());
        });
        this.arrayTest.sort(function (a, b) {
          return parseInt(b.value) - parseInt(a.value);
        });
        for (var i = 0; i <= this.styleArray.length - 1; i++) {
          if (this.arrayTest[0].style == this.styleArray[i]) {
            this.styles = [
              {
                first: this.arrayTest[0].style,
                second: this.arrayTest[1].style,
                third: this.arrayTest[2].style
              },
            ];
            console.log(this.arrayTest[0].style);
          }
        }
        this.first = this.arrayTest[0].style;
        this.second = this.arrayTest[1].style;
        this.third = this.arrayTest[2].style;
      });
    });

    console.log(this.first);
    console.log(this.second);
    console.log(this.third);

    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val); //new

  }

  universeSlides = [
    {
      image: "./assets/svg/Universe/1.svg",
    },
    {
      image: "./assets/svg/Universe/2.svg",
    },
    {
      image: "./assets/svg/Universe/3.svg",
    },
    {
      image: "./assets/svg/Universe/4.svg",
    },
    {
      image: "./assets/svg/Universe/5.svg",
    },
    {
      image: "./assets/svg/Universe/6.svg",
    },
    {
      image: "./assets/svg/Universe/7.svg",
    },
    {
      image: "./assets/svg/Universe/8.svg",
    },
    {
      image: "./assets/svg/Universe/9.svg",
    },
    {
      image: "./assets/svg/Universe/10.svg",
    },
    {
      image: "./assets/svg/Universe/11.svg",
    },
    {
      image: "./assets/svg/Universe/12.svg",
    },
    {
      image: "./assets/svg/Universe/13.svg",
    },
    {
      image: "./assets/svg/Universe/14.svg",
    },
    {
      image: "./assets/svg/Universe/15.svg",
    },
    {
      image: "./assets/svg/Universe/16.svg",
    },
  ];

  //new
  changeTheme() {
    this.settings.setActiveTheme('day-theme');
  }

  playingAudio: boolean = false;
  playByPart: boolean = false;

  playAudio() {
    if (this.playingAudio === false) {
      //play whole audio if user is visual and verbal or pure visual
      if (this.first === "Verbal" && this.first === "Visual" ||
        this.second === "Verbal" && this.first === "Visual" ||
        this.third === "Verbal" && this.first === "Visual" ||
        this.first === "Verbal" && this.second === "Visual" ||
        this.second === "Verbal" && this.second === "Visual" ||
        this.third === "Verbal" && this.second === "Visual" ||
        this.first === "Verbal" && this.third === "Visual" ||
        this.second === "Verbal" && this.third === "Visual" ||
        this.third.valueOf() === "Visual" && this.third === "Verbal" ||
        this.first != "Verbal" && this.first === "Visual" ||
        this.second != "Verbal" && this.first === "Visual" ||
        this.third != "Verbal" && this.first === "Visual" ||
        this.first != "Verbal" && this.second === "Visual" ||
        this.second != "Verbal" && this.second === "Visual" ||
        this.third != "Verbal" && this.second === "Visual" ||
        this.first != "Verbal" && this.third === "Visual" ||
        this.second != "Verbal" && this.third === "Visual" ||
        this.third.valueOf() === "Visual" && this.third != "Verbal" ) {
          this.smartAudio.play('universe');
        }
      //play by part
      else {
          this.playByPart = true;
          if (this.hide1 === true) {
            this.audio1();
          }
          else if (this.hide2 === true) {
            this.audio2();
          }
          else if (this.hide3 === true) {
            this.audio3();
          }
          else if (this.hide4 === true) {
            this.audio4();
          }
          else if (this.hide5 === true) {
            this.audio5();
          }
          else if (this.hide6 === true) {
            this.audio6();
          }
          else if (this.hide7 === true) {
            this.audio7();
          }
          else if (this.hide8 === true) {
            this.audio8();
          }
          else if (this.hide9 === true) {
            this.audio9();
          }
        } 
      this.playingAudio = true;
      let toast = this.toastCtrl.create({
        message: 'Audio Playing',
        duration: 1500
      });
      toast.present();
    }
    else {
      this.pauseAudio();
      console.log("Stopped Audio");
      let toast = this.toastCtrl.create({
        message: 'Audio Paused',
        duration: 1500
      });
      toast.present();
    }
  }

  ionViewDidLoad() {
    this.toShow();
    this.navBar.backButtonClick = (e: UIEvent) => {
      if (this.playingAudio === true) {
        this.pauseAudio();
      }
      this.scrnOrnt.unlock();
      this.scrnOrnt.lock(this.scrnOrnt.ORIENTATIONS.PORTRAIT);
      this.navCtrl.pop();
    }
  }

  playVideo() {
    if (this.playingAudio === true) {
      this.pauseAudio();
    }
    this.youtube.openVideo('wNDGgL73ihY');
  }
  regularShare() {
    // share(message, subject, file, url)
    this.socialSharing.shareViaFacebook("Universe Formation Lesson", null, "https://adaptlearn.herokuapp.com/lesson1/universeformation.html");
  }

  universeQuiz() {
    if (this.playingAudio === true) {
      this.pauseAudio();
    }
    //new
    let data = {
      theme: this.selectedTheme
    };
    this.scrnOrnt.unlock();
    this.scrnOrnt.lock(this.scrnOrnt.ORIENTATIONS.PORTRAIT);
    this.navCtrl.push(QuizPage, data);
    this.changeTheme();
  }

  trivia() {
    if (this.playingAudio === true) {
      this.pauseAudio();
    }
    this.navCtrl.push(TriviaUniversePage);
  }
  
  SettingsPage() {
    this.navCtrl.push(SettingsPage)
  }

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

  public font: boolean = false; //hide
  public verbal: boolean = false;
  public visual: boolean = false;

  toShow() {
    //if learning style = verbal & visual or visual only then show visual hide font
    if (this.first === "Verbal" && this.first === "Visual" ||
      this.second === "Verbal" && this.first === "Visual" ||
      this.third === "Verbal" && this.first === "Visual" ||
      this.first === "Verbal" && this.second === "Visual" ||
      this.second === "Verbal" && this.second === "Visual" ||
      this.third === "Verbal" && this.second === "Visual" ||
      this.first === "Verbal" && this.third === "Visual" ||
      this.second === "Verbal" && this.third === "Visual" ||
      this.third.valueOf() === "Visual" && this.third === "Verbal" ||
      this.first != "Verbal" && this.first === "Visual" ||
      this.second != "Verbal" && this.first === "Visual" ||
      this.third != "Verbal" && this.first === "Visual" ||
      this.first != "Verbal" && this.second === "Visual" ||
      this.second != "Verbal" && this.second === "Visual" ||
      this.third != "Verbal" && this.second === "Visual" ||
      this.first != "Verbal" && this.third === "Visual" ||
      this.second != "Verbal" && this.third === "Visual" ||
      this.third.valueOf() === "Visual" && this.third != "Verbal" ) {
      this.visual = true;
      this.verbal = false;
      this.font = false;
    }

    else {
      this.verbal = true;
      this.font = true;
      this.visual = false;
    }
  }

  public pauseAudio() {
    this.smartAudio.pause('universe');
    this.smartAudio.pause('universe1');
    this.smartAudio.pause('universe2');
    this.smartAudio.pause('universe3');
    this.smartAudio.pause('universe4');
    this.smartAudio.pause('universe5');
    this.smartAudio.pause('universe6');
    this.smartAudio.pause('universe7');
    this.smartAudio.pause('universe8');
    this.smartAudio.pause('universe9');
    this.playingAudio = false;
    this.playByPart = false;
  }

  public audio1() {
    this.smartAudio.play('universe1');
    this.smartAudio.pause('universe2');
    this.smartAudio.pause('universe3');
    this.smartAudio.pause('universe4');
    this.smartAudio.pause('universe5');
    this.smartAudio.pause('universe6');
    this.smartAudio.pause('universe7');
    this.smartAudio.pause('universe8');
    this.smartAudio.pause('universe9');
    console.log("Playing part 1");
  }
  public audio2() {
    this.smartAudio.play('universe2');
    this.smartAudio.pause('universe1');
    this.smartAudio.pause('universe3');
    this.smartAudio.pause('universe4');
    this.smartAudio.pause('universe5');
    this.smartAudio.pause('universe6');
    this.smartAudio.pause('universe7');
    this.smartAudio.pause('universe8');
    this.smartAudio.pause('universe9');
    console.log("Playing part 2");
  }
  public audio3(){
    this.smartAudio.play('universe3');
    this.smartAudio.pause('universe1');
    this.smartAudio.pause('universe2');
    this.smartAudio.pause('universe4');
    this.smartAudio.pause('universe5');
    this.smartAudio.pause('universe6');
    this.smartAudio.pause('universe7');
    this.smartAudio.pause('universe8');
    this.smartAudio.pause('universe9');
    console.log("Playing part 3");
  }
  public audio4(){
    this.smartAudio.play('universe4');
    this.smartAudio.pause('universe1');
    this.smartAudio.pause('universe2');
    this.smartAudio.pause('universe3');
    this.smartAudio.pause('universe5');
    this.smartAudio.pause('universe6');
    this.smartAudio.pause('universe7');
    this.smartAudio.pause('universe8');
    this.smartAudio.pause('universe9');
    console.log("Playing part 4");
  }
  public audio5(){
    this.smartAudio.play('universe5');
    this.smartAudio.pause('universe1');
    this.smartAudio.pause('universe2');
    this.smartAudio.pause('universe3');
    this.smartAudio.pause('universe4');
    this.smartAudio.pause('universe6');
    this.smartAudio.pause('universe7');
    this.smartAudio.pause('universe8');
    this.smartAudio.pause('universe9');
    console.log("Playing part 5");    
  }
  public audio6(){
    this.smartAudio.play('universe6');
    this.smartAudio.pause('universe1');
    this.smartAudio.pause('universe2');
    this.smartAudio.pause('universe3');
    this.smartAudio.pause('universe4');
    this.smartAudio.pause('universe5');
    this.smartAudio.pause('universe7');
    this.smartAudio.pause('universe8');
    this.smartAudio.pause('universe9');
    console.log("Playing part 6");    
  }
  public audio7(){
    this.smartAudio.play('universe7');
    this.smartAudio.pause('universe1');
    this.smartAudio.pause('universe2');
    this.smartAudio.pause('universe3');
    this.smartAudio.pause('universe4');
    this.smartAudio.pause('universe5');
    this.smartAudio.pause('universe6');
    this.smartAudio.pause('universe8');
    this.smartAudio.pause('universe9');
    console.log("Playing part 7");    
  }
  public audio8(){
    this.smartAudio.play('universe8');
    this.smartAudio.pause('universe1');
    this.smartAudio.pause('universe2');
    this.smartAudio.pause('universe3');
    this.smartAudio.pause('universe4');
    this.smartAudio.pause('universe5');
    this.smartAudio.pause('universe6');
    this.smartAudio.pause('universe7');
    this.smartAudio.pause('universe9');
    console.log("Playing part 8");    
  }
  public audio9(){
    this.smartAudio.play('universe9');
    this.smartAudio.pause('universe1');
    this.smartAudio.pause('universe2');
    this.smartAudio.pause('universe3');
    this.smartAudio.pause('universe4');
    this.smartAudio.pause('universe5');
    this.smartAudio.pause('universe6');
    this.smartAudio.pause('universe7');
    this.smartAudio.pause('universe8');
    console.log("Playing part 9");    
  }

  public hide1: boolean = true;
  public hide2: boolean = false;
  public hide3: boolean = false;
  public hide4: boolean = false;
  public hide5: boolean = false;
  public hide6: boolean = false;
  public hide7: boolean = false;
  public hide8: boolean = false;
  public hide9: boolean = false;

  public page1() {
    this.hide1 = true;
    this.hide2 = false;
    this.hide3 = false;
    this.hide4 = false;
    this.hide5 = false;
    this.hide6 = false;
    this.hide7 = false;
    this.hide8 = false;
    this.hide9 = false;
    if (this.playByPart === true) {
      this.audio1();
    }
  }

  public page2() {
    this.hide2 = true;
    this.hide1 = false;
    this.hide3 = false;
    this.hide4 = false;
    this.hide5 = false;
    this.hide6 = false;
    this.hide7 = false;
    this.hide8 = false;
    this.hide9 = false;
    if (this.playByPart === true) {
      this.audio2();
    }
  }

  public page3() {
    this.hide3 = true;
    this.hide1 = false;
    this.hide2 = false;
    this.hide4 = false;
    this.hide5 = false;
    this.hide6 = false;
    this.hide7 = false;
    this.hide8 = false;
    this.hide9 = false;
    if (this.playByPart === true) {
      this.audio3();
    }
  }

  public page4() {
    this.hide4 = true;
    this.hide1 = false;
    this.hide2 = false;
    this.hide3 = false;
    this.hide5 = false;
    this.hide6 = false;
    this.hide7 = false;
    this.hide8 = false;
    this.hide9 = false;
    if (this.playByPart === true) {
      this.audio4();
    }
  }

  public page5() {
    this.hide5 = true;
    this.hide1 = false;
    this.hide2 = false;
    this.hide3 = false;
    this.hide4 = false;
    this.hide6 = false;
    this.hide7 = false;
    this.hide8 = false;
    this.hide9 = false;
    if (this.playByPart === true) {
      this.audio5();
    }
  }

  public page6() {
    this.hide6 = true;
    this.hide1 = false;
    this.hide2 = false;
    this.hide3 = false;
    this.hide4 = false;
    this.hide5 = false;
    this.hide7 = false;
    this.hide8 = false;
    this.hide9 = false;
    if (this.playByPart === true) {
      this.audio6();
    }
  }

  public page7() {
    this.hide7 = true;
    this.hide1 = false;
    this.hide2 = false;
    this.hide3 = false;
    this.hide4 = false;
    this.hide5 = false;
    this.hide6 = false;
    this.hide8 = false;
    this.hide9 = false;
    if (this.playByPart === true) {
      this.audio7();
    }
  }

  public page8() {
    this.hide8 = true;
    this.hide1 = false;
    this.hide2 = false;
    this.hide3 = false;
    this.hide4 = false;
    this.hide5 = false;
    this.hide6 = false;
    this.hide7 = false;
    this.hide9 = false;
    if (this.playByPart === true) {
      this.audio8();
    }
  }

  public page9() {
    this.hide9 = true;
    this.hide1 = false;
    this.hide2 = false;
    this.hide3 = false;
    this.hide4 = false;
    this.hide5 = false;
    this.hide6 = false;
    this.hide7 = false;
    this.hide8 = false;
    if (this.playByPart === true) {
      this.audio9();
    }
  }
}