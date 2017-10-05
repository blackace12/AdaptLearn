import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AngularFireAuth } from 'angularfire2/auth';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { QuizAstronomyPage } from './../quiz-astronomy/quiz-astronomy';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions, ToastController, Navbar } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';
import {
  AngularFireDatabase,
  FirebaseObjectObservable
} from 'angularfire2/database';
import { SettingsProvider } from "../../providers/settings/settings"; //new


/**
 * Generated class for the LessonEarthAstronomyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
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
  fontSize:any;
  fontVal:any;
  learningStyleObject2: FirebaseObjectObservable<any>;
  learningStyleObject: FirebaseObjectObservable<any>;
  myTracks: any[];
  selectedTrack: any;
  selectedTheme:String; //new
  styleArray = ["Solitary", "Visual", "Auditory", "Logical", "Physical", "Social", "Verbal"];
  styles: any[] = [];
  user = [];
  userLearningID: FirebaseObjectObservable<any>
  first; second; third:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing,af:AngularFireDatabase, private modal: ModalController, public youtube:YoutubeVideoPlayer,db: AngularFireDatabase, afAuth: AngularFireAuth, public smartAudio:SmartAudioProvider, public toastCtrl:ToastController, private settings: SettingsProvider, public scrnOrnt: ScreenOrientation) {
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
  changeTheme(){
    this.settings.setActiveTheme('day-theme');
  }

  playingAudio: boolean = false;

  playAudio(){
    if(this.playingAudio === false){
      this.smartAudio.play('astronomy');
      this.playingAudio = !this.playingAudio;
      let toast = this.toastCtrl.create({
        message: 'Audio Playing',
        duration: 1500
      });
      toast.present();
    }
    else {
      this.smartAudio.pause('astronomy');
      this.playingAudio = !this.playingAudio;
     }
  }

  ionViewDidLoad() {
    this.toShow();
    this.navBar.backButtonClick = (e: UIEvent) => {
      if (this.playingAudio === true) {
          this.smartAudio.pause('astronomy');
          this.playingAudio = !this.playingAudio;
      }
      this.scrnOrnt.unlock();
      this.scrnOrnt.lock(this.scrnOrnt.ORIENTATIONS.PORTRAIT);
        this.navCtrl.pop();
    }
  }


  playVideo() {
    this.youtube.openVideo('ld75W1dz-h0');
  }

  regularShare() {
    // share(message, subject, file, url)
    this.socialSharing.shareViaFacebook("Astronomy Lesson", null, "https://adaptlearn.herokuapp.com/lesson1/astronomy.html");
  }

  universeQuiz() {
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

  openModal(){
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false //disables dismiss of modal when clicking outside modal
    };

    const myModal: Modal = this.modal.create('FontSizePage', { data:this.fontVal }, myModalOptions);

    //present font size modal
    myModal.present();

    //will receive value when modal is closed/dismissed
    myModal.onWillDismiss((fontValue)=>{
      this.fontSize = fontValue;
      this.fontVal = fontValue;
      console.log(this.fontVal + " back to page");
    });
  }

  public font:boolean=false; //hide
  public verbal:boolean=false;
  public visual:boolean=false;

  toShow() {
    // if learning style = Verbal only show verbal
    if(this.first === "Verbal" && this.first != "Visual" ||
      this.second === "Verbal" && this.first != "Visual" ||
      this.third === "Verbal" && this.first != "Visual" ||
      this.first === "Verbal" && this.second != "Visual" ||
      this.second === "Verbal" && this.second != "Visual" ||
      this.third === "Verbal" && this.second != "Visual" ||
      this.first === "Verbal" && this.third != "Visual" ||
      this.second === "Verbal" && this.third != "Visual" ||
      this.third != "Visual" && this.third === "Verbal" ||
      this.first === "Verbal"|| this.second === "Verbal" || this.third === "Verbal") {
        this.verbal = true;
        this.font = true;
        this.visual = false;
    }

    //if learning style = verbal & visual or visual then show visual hide font
    if(this.first === "Verbal" && this.first === "Visual" ||
      this.second === "Verbal" && this.first === "Visual" ||
      this.third === "Verbal" && this.first === "Visual" ||
      this.first === "Verbal" && this.second === "Visual" ||
      this.second === "Verbal" && this.second === "Visual" ||
      this.third === "Verbal" && this.second === "Visual" ||
      this.first === "Verbal" && this.third === "Visual" ||
      this.second === "Verbal" && this.third === "Visual" ||
      //this.third === "Verbal" && this.third === "Visual" || error i dont know why
      this.first === "Visual"|| this.second === "Visual" || this.third === "Visual") {
        this.visual = true;
        this.verbal = false;
        this.font = false;
    }
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

  //under chapter 4
  public hide4: boolean = true;
  public hide4_1: boolean = false;
  public hide4_2: boolean = false;
  public hide4_3: boolean = false;
  public hide4_4: boolean = false;
  public hide4_5: boolean = false;

  //====start of chapter 4=======
  public click4() {
    this.hide4 = !this.hide4;
    this.hide4_1 = false;
    this.hide4_2 = false;
    this.hide4_3 = false;
    this.hide4_4 = false;
    this.hide4_5 = false;
    this.hide5 = false;
    this.hide5_1 = false;
    this.hide5_2 = false;
    this.hide5_3 = false;
    this.hide5_4 = false;
    this.hide5_5 = false;
    this.hide5_6 = false;
    this.hide5_7 = false;
  }

  public click4_1() {
    this.hide4_1 = !this.hide4_1;
    this.hide4 = false;
    this.hide4_2 = false;
    this.hide4_3 = false;
    this.hide4_4 = false;
    this.hide4_5 = false;
    this.hide5 = false;
    this.hide5_1 = false;
    this.hide5_2 = false;
    this.hide5_3 = false;
    this.hide5_4 = false;
    this.hide5_5 = false;
    this.hide5_6 = false;
    this.hide5_7 = false;
  }

  public click4_2() {
    this.hide4_2 = !this.hide4_2;
    this.hide4 = false;
    this.hide4_1 = false;
    this.hide4_3 = false;
    this.hide4_4 = false;
    this.hide4_5 = false;
    this.hide5 = false;
    this.hide5_1 = false;
    this.hide5_2 = false;
    this.hide5_3 = false;
    this.hide5_4 = false;
    this.hide5_5 = false;
    this.hide5_6 = false;
    this.hide5_7 = false;
  }

  public click4_3() {
    this.hide4_3 = !this.hide4_3;
    this.hide4 = false;
    this.hide4_1 = false;
    this.hide4_2 = false;
    this.hide4_4 = false;
    this.hide4_5 = false;
    this.hide5 = false;
    this.hide5_1 = false;
    this.hide5_2 = false;
    this.hide5_3 = false;
    this.hide5_4 = false;
    this.hide5_5 = false;
    this.hide5_6 = false;
    this.hide5_7 = false;
  }

  public click4_4() {
    this.hide4_4 = !this.hide4_4;
    this.hide4 = false;
    this.hide4_1 = false;
    this.hide4_2 = false;
    this.hide4_3 = false;
    this.hide4_5 = false;
    this.hide5 = false;
    this.hide5_1 = false;
    this.hide5_2 = false;
    this.hide5_3 = false;
    this.hide5_4 = false;
    this.hide5_5 = false;
    this.hide5_6 = false;
    this.hide5_7 = false;
  }

  public click4_5() {
    this.hide4_5 = !this.hide4_5;
    this.hide4 = false;
    this.hide4_1 = false;
    this.hide4_2 = false;
    this.hide4_3 = false;
    this.hide4_4 = false;
    this.hide5 = false;
    this.hide5_1 = false;
    this.hide5_2 = false;
    this.hide5_3 = false;
    this.hide5_4 = false;
    this.hide5_5 = false;
    this.hide5_6 = false;
    this.hide5_7 = false;
  }
  //====end of chapter 4=======


  //under chapter 5
  public hide5: boolean = false;
  public hide5_1: boolean = false;
  public hide5_2: boolean = false;
  public hide5_3: boolean = false;
  public hide5_4: boolean = false;
  public hide5_5: boolean = false;
  public hide5_6: boolean = false;
  public hide5_7: boolean = false;

  //====start of chapter 5=======
  public click5() {
    this.hide5 = !this.hide5;
    this.hide4 = false;
    this.hide4_1 = false;
    this.hide4_2 = false;
    this.hide4_3 = false;
    this.hide4_4 = false;
    this.hide4_5 = false;
    this.hide5_1 = false;
    this.hide5_2 = false;
    this.hide5_3 = false;
    this.hide5_4 = false;
    this.hide5_5 = false;
    this.hide5_6 = false;
    this.hide5_7 = false;
  }

  public click5_1() {
    this.hide5_1 = !this.hide5_1;
    this.hide4 = false;
    this.hide4_1 = false;
    this.hide4_2 = false;
    this.hide4_3 = false;
    this.hide4_4 = false;
    this.hide4_5 = false;
    this.hide5 = false;
    this.hide5_2 = false;
    this.hide5_3 = false;
    this.hide5_4 = false;
    this.hide5_5 = false;
    this.hide5_6 = false;
    this.hide5_7 = false;
  }

  public click5_2() {
    this.hide5_2 = !this.hide5_2;
    this.hide4 = false;
    this.hide4_1 = false;
    this.hide4_2 = false;
    this.hide4_3 = false;
    this.hide4_4 = false;
    this.hide4_5 = false;
    this.hide5 = false;
    this.hide5_1 = false;
    this.hide5_3 = false;
    this.hide5_4 = false;
    this.hide5_5 = false;
    this.hide5_6 = false;
    this.hide5_7 = false;
  }

  public click5_3() {
    this.hide5_3 = !this.hide5_3;
    this.hide4 = false;
    this.hide4_1 = false;
    this.hide4_2 = false;
    this.hide4_3 = false;
    this.hide4_4 = false;
    this.hide4_5 = false;
    this.hide5 = false;
    this.hide5_1 = false;
    this.hide5_2 = false;
    this.hide5_4 = false;
    this.hide5_5 = false;
    this.hide5_6 = false;
    this.hide5_7 = false;
  }

  public click5_4() {
    this.hide5_4 = !this.hide5_4;
    this.hide4 = false;
    this.hide4_1 = false;
    this.hide4_2 = false;
    this.hide4_3 = false;
    this.hide4_4 = false;
    this.hide4_5 = false;
    this.hide5 = false;
    this.hide5_1 = false;
    this.hide5_2 = false;
    this.hide5_3 = false;
    this.hide5_5 = false;
    this.hide5_6 = false;
    this.hide5_7 = false;
  }

  public click5_5() {
    this.hide5_5 = !this.hide5_5;
    this.hide4 = false;
    this.hide4_1 = false;
    this.hide4_2 = false;
    this.hide4_3 = false;
    this.hide4_4 = false;
    this.hide4_5 = false;
    this.hide5 = false;
    this.hide5_1 = false;
    this.hide5_2 = false;
    this.hide5_3 = false;
    this.hide5_4 = false;
    this.hide5_6 = false;
    this.hide5_7 = false;
  }

  public click5_6() {
    this.hide5_6 = !this.hide5_6;
    this.hide4 = false;
    this.hide4_1 = false;
    this.hide4_2 = false;
    this.hide4_3 = false;
    this.hide4_4 = false;
    this.hide4_5 = false;
    this.hide5 = false;
    this.hide5_1 = false;
    this.hide5_2 = false;
    this.hide5_3 = false;
    this.hide5_4 = false;
    this.hide5_5 = false;
    this.hide5_7 = false;
  }

  public click5_7() {
    this.hide5_7 = !this.hide5_7;
    this.hide4 = false;
    this.hide4_1 = false;
    this.hide4_2 = false;
    this.hide4_3 = false;
    this.hide4_4 = false;
    this.hide4_5 = false;
    this.hide5 = false;
    this.hide5_1 = false;
    this.hide5_2 = false;
    this.hide5_3 = false;
    this.hide5_4 = false;
    this.hide5_5 = false;
    this.hide5_6 = false;
  }
  //====end of chapter 5=======
}