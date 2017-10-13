import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AngularFireAuth } from 'angularfire2/auth';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { QuizAstronomyPage } from './../quiz-astronomy/quiz-astronomy';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions, ToastController, Navbar } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { TriviaAstronomyPage } from '../trivia-astronomy/trivia-astronomy';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';
import {
  AngularFireDatabase,
  FirebaseObjectObservable
} from 'angularfire2/database';
import { SettingsProvider } from "../../providers/settings/settings"; //new

@IonicPage()
@Component({
  selector: 'page-lesson-earth-astronomy',
  templateUrl: 'lesson-earth-astronomy.html',
})
export class LessonEarthAstronomyPage {
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
          this.smartAudio.play('astronomy');
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
            else if (this.hide10 === true) {
              this.audio10();
            }
            else if (this.hide11 === true) {
              this.audio11();
            }
            else if (this.hide12 === true) {
              this.audio12();
            }
            else if (this.hide13 === true) {
              this.audio13();
            }
            else if (this.hide14 === true) {
              this.audio14();
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

  trivia() {
    if (this.playingAudio === true) {
      this.pauseAudio();
    }
    this.navCtrl.push(TriviaAstronomyPage);
  }

  playVideo() {
    if (this.playingAudio === true) {
      this.pauseAudio();
    }
    this.youtube.openVideo('OMDMvSsyxqg');

  }

  regularShare() {
    // share(message, subject, file, url)
    this.socialSharing.shareViaFacebook("Astronomy Lesson", null, "https://adaptlearn.herokuapp.com/lesson1/astronomy.html");
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

    this.navCtrl.push(QuizAstronomyPage, data);
    this.changeTheme();
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

  public pauseAudio() {
    this.smartAudio.pause('astronomy');
    this.smartAudio.pause('astronomy1');
    this.smartAudio.pause('astronomy2');
    this.smartAudio.pause('astronomy3');
    this.smartAudio.pause('astronomy4');
    this.smartAudio.pause('astronomy5');
    this.smartAudio.pause('astronomy6');
    this.smartAudio.pause('astronomy7');
    this.smartAudio.pause('astronomy8');
    this.smartAudio.pause('astronomy9');
    this.smartAudio.pause('astronomy10');
    this.smartAudio.pause('astronomy11');
    this.smartAudio.pause('astronomy12');
    this.smartAudio.pause('astronomy13');
    this.smartAudio.pause('astronomy14');
    this.playingAudio = false;
    this.playByPart = false;
  }

  public audio1() {
    this.smartAudio.play('astronomy1');
    this.smartAudio.pause('astronomy2');
    this.smartAudio.pause('astronomy3');
    this.smartAudio.pause('astronomy4');
    this.smartAudio.pause('astronomy5');
    this.smartAudio.pause('astronomy6');
    this.smartAudio.pause('astronomy7');
    this.smartAudio.pause('astronomy8');
    this.smartAudio.pause('astronomy9');
    this.smartAudio.pause('astronomy10');
    this.smartAudio.pause('astronomy11');
    this.smartAudio.pause('astronomy12');
    this.smartAudio.pause('astronomy13');
    this.smartAudio.pause('astronomy14');
    console.log("Playing part 1");
  }
  public audio2() {
    this.smartAudio.play('astronomy2');
    this.smartAudio.pause('astronomy1');
    this.smartAudio.pause('astronomy3');
    this.smartAudio.pause('astronomy4');
    this.smartAudio.pause('astronomy5');
    this.smartAudio.pause('astronomy6');
    this.smartAudio.pause('astronomy7');
    this.smartAudio.pause('astronomy8');
    this.smartAudio.pause('astronomy9');
    this.smartAudio.pause('astronomy10');
    this.smartAudio.pause('astronomy11');
    this.smartAudio.pause('astronomy12');
    this.smartAudio.pause('astronomy13');
    this.smartAudio.pause('astronomy14');
    console.log("Playing part 2");
  }
  public audio3() {
    this.smartAudio.play('astronomy3');
    this.smartAudio.pause('astronomy1');
    this.smartAudio.pause('astronomy2');
    this.smartAudio.pause('astronomy4');
    this.smartAudio.pause('astronomy5');
    this.smartAudio.pause('astronomy6');
    this.smartAudio.pause('astronomy7');
    this.smartAudio.pause('astronomy8');
    this.smartAudio.pause('astronomy9');
    this.smartAudio.pause('astronomy10');
    this.smartAudio.pause('astronomy11');
    this.smartAudio.pause('astronomy12');
    this.smartAudio.pause('astronomy13');
    this.smartAudio.pause('astronomy14');
    console.log("Playing part 3");
  }
  public audio4() {
    this.smartAudio.play('astronomy4');
    this.smartAudio.pause('astronomy1');
    this.smartAudio.pause('astronomy2');
    this.smartAudio.pause('astronomy3');
    this.smartAudio.pause('astronomy5');
    this.smartAudio.pause('astronomy6');
    this.smartAudio.pause('astronomy7');
    this.smartAudio.pause('astronomy8');
    this.smartAudio.pause('astronomy9');
    this.smartAudio.pause('astronomy10');
    this.smartAudio.pause('astronomy11');
    this.smartAudio.pause('astronomy12');
    this.smartAudio.pause('astronomy13');
    this.smartAudio.pause('astronomy14');
    console.log("Playing part 4");
  }
  public audio5() {
    this.smartAudio.play('astronomy5');
    this.smartAudio.pause('astronomy1');
    this.smartAudio.pause('astronomy2');
    this.smartAudio.pause('astronomy3');
    this.smartAudio.pause('astronomy4');
    this.smartAudio.pause('astronomy6');
    this.smartAudio.pause('astronomy7');
    this.smartAudio.pause('astronomy8');
    this.smartAudio.pause('astronomy9');
    this.smartAudio.pause('astronomy10');
    this.smartAudio.pause('astronomy11');
    this.smartAudio.pause('astronomy12');
    this.smartAudio.pause('astronomy13');
    this.smartAudio.pause('astronomy14');
    console.log("Playing part 5");
  }
  public audio6() {
    this.smartAudio.play('astronomy6');
    this.smartAudio.pause('astronomy1');
    this.smartAudio.pause('astronomy2');
    this.smartAudio.pause('astronomy3');
    this.smartAudio.pause('astronomy4');
    this.smartAudio.pause('astronomy5');
    this.smartAudio.pause('astronomy7');
    this.smartAudio.pause('astronomy8');
    this.smartAudio.pause('astronomy9');
    this.smartAudio.pause('astronomy10');
    this.smartAudio.pause('astronomy11');
    this.smartAudio.pause('astronomy12');
    this.smartAudio.pause('astronomy13');
    this.smartAudio.pause('astronomy14');
    console.log("Playing part 6");
  }
  public audio7() {
    this.smartAudio.play('astronomy7');
    this.smartAudio.pause('astronomy1');
    this.smartAudio.pause('astronomy2');
    this.smartAudio.pause('astronomy3');
    this.smartAudio.pause('astronomy4');
    this.smartAudio.pause('astronomy5');
    this.smartAudio.pause('astronomy6');
    this.smartAudio.pause('astronomy8');
    this.smartAudio.pause('astronomy9');
    this.smartAudio.pause('astronomy10');
    this.smartAudio.pause('astronomy11');
    this.smartAudio.pause('astronomy12');
    this.smartAudio.pause('astronomy13');
    this.smartAudio.pause('astronomy14');
    console.log("Playing part 7");
  }
  public audio8() {
    this.smartAudio.play('astronomy8');
    this.smartAudio.pause('astronomy1');
    this.smartAudio.pause('astronomy2');
    this.smartAudio.pause('astronomy3');
    this.smartAudio.pause('astronomy4');
    this.smartAudio.pause('astronomy5');
    this.smartAudio.pause('astronomy6');
    this.smartAudio.pause('astronomy7');
    this.smartAudio.pause('astronomy9');
    this.smartAudio.pause('astronomy10');
    this.smartAudio.pause('astronomy11');
    this.smartAudio.pause('astronomy12');
    this.smartAudio.pause('astronomy13');
    this.smartAudio.pause('astronomy14');
    console.log("Playing part 8");
  }
  public audio9() {
    this.smartAudio.play('astronomy9');
    this.smartAudio.pause('astronomy1');
    this.smartAudio.pause('astronomy2');
    this.smartAudio.pause('astronomy3');
    this.smartAudio.pause('astronomy4');
    this.smartAudio.pause('astronomy5');
    this.smartAudio.pause('astronomy6');
    this.smartAudio.pause('astronomy7');
    this.smartAudio.pause('astronomy8');
    this.smartAudio.pause('astronomy10');
    this.smartAudio.pause('astronomy11');
    this.smartAudio.pause('astronomy12');
    this.smartAudio.pause('astronomy13');
    this.smartAudio.pause('astronomy14');
    console.log("Playing part 9");
  }
  public audio10() {
    this.smartAudio.play('astronomy10');
    this.smartAudio.pause('astronomy1');
    this.smartAudio.pause('astronomy2');
    this.smartAudio.pause('astronomy3');
    this.smartAudio.pause('astronomy4');
    this.smartAudio.pause('astronomy5');
    this.smartAudio.pause('astronomy6');
    this.smartAudio.pause('astronomy7');
    this.smartAudio.pause('astronomy8');
    this.smartAudio.pause('astronomy9');
    this.smartAudio.pause('astronomy11');
    this.smartAudio.pause('astronomy12');
    this.smartAudio.pause('astronomy13');
    this.smartAudio.pause('astronomy14');
    console.log("Playing part 10");
  }
  public audio11() {
    this.smartAudio.play('astronomy11');
    this.smartAudio.pause('astronomy1');
    this.smartAudio.pause('astronomy2');
    this.smartAudio.pause('astronomy3');
    this.smartAudio.pause('astronomy4');
    this.smartAudio.pause('astronomy5');
    this.smartAudio.pause('astronomy6');
    this.smartAudio.pause('astronomy7');
    this.smartAudio.pause('astronomy8');
    this.smartAudio.pause('astronomy9');
    this.smartAudio.pause('astronomy10');
    this.smartAudio.pause('astronomy12');
    this.smartAudio.pause('astronomy13');
    this.smartAudio.pause('astronomy14');
    console.log("Playing part 11");
  }
  public audio12() {
    this.smartAudio.play('astronomy12');
    this.smartAudio.pause('astronomy1');
    this.smartAudio.pause('astronomy2');
    this.smartAudio.pause('astronomy3');
    this.smartAudio.pause('astronomy4');
    this.smartAudio.pause('astronomy5');
    this.smartAudio.pause('astronomy6');
    this.smartAudio.pause('astronomy7');
    this.smartAudio.pause('astronomy8');
    this.smartAudio.pause('astronomy9');
    this.smartAudio.pause('astronomy10');
    this.smartAudio.pause('astronomy11');
    this.smartAudio.pause('astronomy13');
    this.smartAudio.pause('astronomy14');
    console.log("Playing part 12");
  }
  public audio13() {
    this.smartAudio.play('astronomy13');
    this.smartAudio.pause('astronomy1');
    this.smartAudio.pause('astronomy2');
    this.smartAudio.pause('astronomy3');
    this.smartAudio.pause('astronomy4');
    this.smartAudio.pause('astronomy5');
    this.smartAudio.pause('astronomy6');
    this.smartAudio.pause('astronomy7');
    this.smartAudio.pause('astronomy8');
    this.smartAudio.pause('astronomy9');
    this.smartAudio.pause('astronomy10');
    this.smartAudio.pause('astronomy11');
    this.smartAudio.pause('astronomy12');
    this.smartAudio.pause('astronomy14');
    console.log("Playing part 13");
  }
  public audio14() {
    this.smartAudio.play('astronomy14');
    this.smartAudio.pause('astronomy1');
    this.smartAudio.pause('astronomy2');
    this.smartAudio.pause('astronomy3');
    this.smartAudio.pause('astronomy4');
    this.smartAudio.pause('astronomy5');
    this.smartAudio.pause('astronomy6');
    this.smartAudio.pause('astronomy7');
    this.smartAudio.pause('astronomy8');
    this.smartAudio.pause('astronomy9');
    this.smartAudio.pause('astronomy10');
    this.smartAudio.pause('astronomy11');
    this.smartAudio.pause('astronomy12');
    this.smartAudio.pause('astronomy13');
    console.log("Playing part 14");
  }


  astronomySlides = [
    {
      image: "./assets/svg/Astronomy/1.svg",
    },
    {
      image: "./assets/svg/Astronomy/2.svg",
    },
    {
      image: "./assets/svg/Astronomy/3.svg",
    },
    {
      image: "./assets/svg/Astronomy/4.svg",
    },
    {
      image: "./assets/svg/Astronomy/5.svg",
    },
    {
      image: "./assets/svg/Astronomy/6.svg",
    },
    {
      image: "./assets/svg/Astronomy/7.svg",
    },
    {
      image: "./assets/svg/Astronomy/8.svg",
    },
    {
      image: "./assets/svg/Astronomy/9.svg",
    },
    {
      image: "./assets/svg/Astronomy/10.svg",
    },
    {
      image: "./assets/svg/Astronomy/11.svg",
    },
    {
      image: "./assets/svg/Astronomy/12.svg",
    },
    {
      image: "./assets/svg/Astronomy/13.svg",
    },
    {
      image: "./assets/svg/Astronomy/14.svg",
    },
    {
      image: "./assets/svg/Astronomy/15.svg",
    },
    {
      image: "./assets/svg/Astronomy/16.svg",
    },
    {
      image: "./assets/svg/Astronomy/17.svg",
    },
    {
      image: "./assets/svg/Astronomy/18.svg",
    },
    {
      image: "./assets/svg/Astronomy/19.svg",
    },
    {
      image: "./assets/svg/Astronomy/20.svg",
    }
  ];

  public hide1: boolean = true;
  public hide2: boolean = false;
  public hide3: boolean = false;
  public hide4: boolean = false;
  public hide5: boolean = false;
  public hide6: boolean = false;
  public hide7: boolean = false;
  public hide8: boolean = false;
  public hide9: boolean = false;
  public hide10: boolean = false;
  public hide11: boolean = false;
  public hide12: boolean = false;
  public hide13: boolean = false;
  public hide14: boolean = false;

  //====start of chapter 4=======
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
    this.hide10 = false;
    this.hide11 = false;
    this.hide12 = false;
    this.hide13 = false;
    this.hide14 = false;
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
    this.hide10 = false;
    this.hide11 = false;
    this.hide12 = false;
    this.hide13 = false;
    this.hide14 = false;
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
    this.hide10 = false;
    this.hide11 = false;
    this.hide12 = false;
    this.hide13 = false;
    this.hide14 = false;
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
    this.hide10 = false;
    this.hide11 = false;
    this.hide12 = false;
    this.hide13 = false;
    this.hide14 = false;
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
    this.hide10 = false;
    this.hide11 = false;
    this.hide12 = false;
    this.hide13 = false;
    this.hide14 = false;
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
    this.hide10 = false;
    this.hide11 = false;
    this.hide12 = false;
    this.hide13 = false;
    this.hide14 = false;
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
    this.hide10 = false;
    this.hide11 = false;
    this.hide12 = false;
    this.hide13 = false;
    this.hide14 = false;
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
    this.hide10 = false;
    this.hide11 = false;
    this.hide12 = false;
    this.hide13 = false;
    this.hide14 = false;
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
    this.hide10 = false;
    this.hide11 = false;
    this.hide12 = false;
    this.hide13 = false;
    this.hide14 = false;
    if (this.playByPart === true) {
      this.audio9();
    }
  }

  public page10() {
    this.hide10 = true;
    this.hide1 = false;
    this.hide2 = false;
    this.hide3 = false;
    this.hide4 = false;
    this.hide5 = false;
    this.hide6 = false;
    this.hide7 = false;
    this.hide8 = false;
    this.hide9 = false;
    this.hide11 = false;
    this.hide12 = false;
    this.hide13 = false;
    this.hide14 = false;
    if (this.playByPart === true) {
      this.audio10();
    }
  }

  public page11() {
    this.hide11 = true;
    this.hide1 = false;
    this.hide2 = false;
    this.hide3 = false;
    this.hide4 = false;
    this.hide5 = false;
    this.hide6 = false;
    this.hide7 = false;
    this.hide8 = false;
    this.hide9 = false;
    this.hide10 = false;
    this.hide12 = false;
    this.hide13 = false;
    this.hide14 = false;
    if (this.playByPart === true) {
      this.audio11();
    }
  }

  public page12() {
    this.hide12 = true;
    this.hide1 = false;
    this.hide2 = false;
    this.hide3 = false;
    this.hide4 = false;
    this.hide5 = false;
    this.hide6 = false;
    this.hide7 = false;
    this.hide8 = false;
    this.hide9 = false;
    this.hide10 = false;
    this.hide11 = false;
    this.hide13 = false;
    this.hide14 = false;
    if (this.playByPart === true) {
      this.audio12();
    }
  }

  public page13() {
    this.hide13 = true;
    this.hide1 = false;
    this.hide2 = false;
    this.hide3 = false;
    this.hide4 = false;
    this.hide5 = false;
    this.hide6 = false;
    this.hide7 = false;
    this.hide8 = false;
    this.hide9 = false;
    this.hide10 = false;
    this.hide11 = false;
    this.hide12 = false;
    this.hide14 = false;
    if (this.playByPart === true) {
      this.audio13();
    }
  }

  public page14() {
    this.hide14 = true;
    this.hide1 = false;
    this.hide2 = false;
    this.hide3 = false;
    this.hide4 = false;
    this.hide5 = false;
    this.hide6 = false;
    this.hide7 = false;
    this.hide8 = false;
    this.hide9 = false;
    this.hide10 = false;
    this.hide11 = false;
    this.hide12 = false;
    this.hide13 = false;
    if (this.playByPart === true) {
      this.audio14();
    }
  }
}