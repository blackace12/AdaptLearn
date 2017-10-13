import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { QuizMitadaptPage } from './../quiz-mitadapt/quiz-mitadapt';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions, Navbar, ToastController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { AngularFireAuth } from 'angularfire2/auth';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { SettingsProvider } from "../../providers/settings/settings"; //new


@IonicPage()
@Component({
  selector: 'page-lesson-mitadapt',
  templateUrl: 'lesson-mitadapt.html',
})
export class LessonMitadaptPage {
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing, af: AngularFireDatabase, private modal: ModalController, public youtube: YoutubeVideoPlayer, db: AngularFireDatabase, afAuth: AngularFireAuth, public smartAudio: SmartAudioProvider, private settings: SettingsProvider, public toastCtrl: ToastController, public scrnOrnt: ScreenOrientation) {
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
            this.first = this.arrayTest[0].style;
            this.second = this.arrayTest[1].style;
            this.third = this.arrayTest[2].style;
          }
        }
      });
    });

    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val); //new
  }

  //new
  changeTheme() {
    this.settings.setActiveTheme('day-theme');
  }

  playingAudio: boolean = false;
  playByPart: boolean = false;

  playAudio() {
    if (this.playingAudio === false) {
      if (this.first === "Verbal" && this.first === "Visual" ||
        this.second === "Verbal" && this.first === "Visual" ||
        this.third === "Verbal" && this.first === "Visual" ||
        this.first === "Verbal" && this.second === "Visual" ||
        this.second === "Verbal" && this.second === "Visual" ||
        this.third === "Verbal" && this.second === "Visual" ||
        this.first === "Verbal" && this.third === "Visual" ||
        this.second === "Verbal" && this.third === "Visual" ||
        this.third.valueOf() === "Verbal" && this.third === "Visual" ||  
        this.first === "Visual" || this.second === "Visual" || this.third === "Visual") {
          this.smartAudio.play('mitigation');
      }
      else if (this.first === "Verbal" && this.first != "Visual" ||
        this.second === "Verbal" && this.first != "Visual" ||
        this.third === "Verbal" && this.first != "Visual" ||
        this.first === "Verbal" && this.second != "Visual" ||
        this.second === "Verbal" && this.second != "Visual" ||
        this.third === "Verbal" && this.second != "Visual" ||
        this.first === "Verbal" && this.third != "Visual" ||
        this.second === "Verbal" && this.third != "Visual" ||
        this.third != "Visual" && this.third === "Verbal" ||
        this.first === "Verbal" || this.second === "Verbal" || this.third === "Verbal") {
          this.playByPart = true;
          console.log('enable audio by part');
          if (this.hide1 === true) {
            this.audio1();
          }
          else if (this.hide2 === true) {
            this.audio2();
          }
      }
      this.playingAudio = true;
      console.log("playing");
    }
    else {
      this.pauseAudio();
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
    this.youtube.openVideo('YX8VQIJVpTg');
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

  regularShare() {
    // share(message, subject, file, url)
    this.socialSharing.shareViaFacebook("Mitigation and Adaptation Lesson", null, "https://adaptlearn.herokuapp.com/lesson3/mitigationadaptation.html");
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

    this.navCtrl.push(QuizMitadaptPage, data);
    this.changeTheme();
  }

  public font: boolean = false; //hide
  public verbal: boolean = false;
  public visual: boolean = false;

  toShow() {
    // if learning style = Verbal only show verbal
    if (this.first === "Verbal" && this.first != "Visual" ||
      this.second === "Verbal" && this.first != "Visual" ||
      this.third === "Verbal" && this.first != "Visual" ||
      this.first === "Verbal" && this.second != "Visual" ||
      this.second === "Verbal" && this.second != "Visual" ||
      this.third === "Verbal" && this.second != "Visual" ||
      this.first === "Verbal" && this.third != "Visual" ||
      this.second === "Verbal" && this.third != "Visual" ||
      this.third != "Visual" && this.third === "Verbal" ||
      this.first === "Verbal" || this.second === "Verbal" || this.third === "Verbal") {
      this.verbal = true;
      this.font = true;
      this.visual = false;
    }

    //if learning style = verbal & visual or visual then show visual hide font
    if (this.first === "Verbal" && this.first === "Visual" ||
      this.second === "Verbal" && this.first === "Visual" ||
      this.third === "Verbal" && this.first === "Visual" ||
      this.first === "Verbal" && this.second === "Visual" ||
      this.second === "Verbal" && this.second === "Visual" ||
      this.third === "Verbal" && this.second === "Visual" ||
      this.first === "Verbal" && this.third === "Visual" ||
      this.second === "Verbal" && this.third === "Visual" ||
      this.third === "Verbal" && this.third.valueOf() === "Visual" ||
      this.first === "Visual" || this.second === "Visual" || this.third === "Visual") {
      this.visual = true;
      this.verbal = false;
      this.font = false;
    }
  }

  mitadaptSlides = [
    {
      image: "./assets/svg/Mitigation/1.svg",
    },
    {
      image: "./assets/svg/Mitigation/2.svg",
    },
    {
      image: "./assets/svg/Mitigation/3.svg",
    },
    {
      image: "./assets/svg/Mitigation/4.svg",
    },
    {
      image: "./assets/svg/Mitigation/5.svg",
    },
    {
      image: "./assets/svg/Mitigation/6.svg",
    }
  ];

  public pauseAudio() {
    this.smartAudio.pause('mitigation');
    this.smartAudio.pause('mitigation1');
    this.smartAudio.pause('mitigation2');
    this.playingAudio = false;
    this.playByPart = false;
  }

  public audio1() {
    this.smartAudio.play('mitigation1');
    this.smartAudio.pause('mitigation2');
    console.log("Playing part 1");
  }
  public audio2() {
    this.smartAudio.play('mitigation2');
    this.smartAudio.pause('mitigation1');
    console.log("Playing part 2");
  }

  public hide1: boolean = true;
  public hide2: boolean = false;

  public page1() {
    this.hide1 = true;
    this.hide2 = false;
    if (this.playByPart === true) {
      this.audio1();
    }
  }

  public page2() {
    this.hide2 = true;
    this.hide1 = false;
    if (this.playByPart === true) {
      this.audio2();
    }
  }

}