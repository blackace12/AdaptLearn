import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { QuizVolcanoPage } from './../quiz-volcano/quiz-volcano';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions, Navbar, ToastController } from 'ionic-angular';
import { SettingsPage} from '../settings/settings';
import { TriviaVolcanoPage} from '../trivia-volcano/trivia-volcano';
import { AngularFireAuth } from 'angularfire2/auth';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';
import { AngularFireDatabase,  FirebaseObjectObservable} from 'angularfire2/database';
import { SettingsProvider } from "../../providers/settings/settings"; //new

/**
 * Generated class for the LessonNaturalVolcanoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-lesson-natural-volcano',
  templateUrl: 'lesson-natural-volcano.html',
})
export class LessonNaturalVolcanoPage {
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
  orientation: String;
  styleArray = ["Solitary", "Visual", "Auditory", "Logical", "Physical", "Social", "Verbal"];
  styles: any[] = [];
  user = [];
  userLearningID: FirebaseObjectObservable<any>
  first; second; third:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing,af:AngularFireDatabase, private modal: ModalController, public youtube:YoutubeVideoPlayer,db: AngularFireDatabase, afAuth: AngularFireAuth, public smartAudio:SmartAudioProvider, private settings: SettingsProvider, public toastCtrl:ToastController, public scrnOrnt: ScreenOrientation) {
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
  playByPart: boolean = false;

  playAudio(){
    if(this.playingAudio === false){
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

  trivia() {
    if (this.playingAudio === true) {
      this.pauseAudio();
    }
    this.navCtrl.push(TriviaVolcanoPage);
  }

  playVideo(){

    if (this.playingAudio === true) {
      this.pauseAudio();
    }
   this.youtube.openVideo('1gJltB1K350');
  }

  SettingsPage(){
    this.navCtrl.push(SettingsPage,{orientation:this.orientation});
  }

  public font:boolean=false; //hide
  public verbal:boolean=false;
  public visual:boolean=false;

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
      this.orientation = "landscape";
    }

    else {
      this.verbal = true;
      this.font = true;
      this.visual = false;
    }
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

  regularShare(){
    // share(message, subject, file, url)
    this.socialSharing.shareViaFacebook("Volcano Lesson", null, "https://adaptlearn.herokuapp.com/lesson2/volcano.html");
  }

  universeQuiz(){
    if (this.playingAudio === true) {
      this.pauseAudio();
    }
    //new
    let data = {
      theme: this.selectedTheme
    };
    this.scrnOrnt.unlock();
    this.scrnOrnt.lock(this.scrnOrnt.ORIENTATIONS.PORTRAIT);
    this.navCtrl.push(QuizVolcanoPage, data);
    this.changeTheme();
   }

   volcanoSlides = [
    {
      image: "./assets/svg/Volcano/1.svg",
    },
    {
      image: "./assets/svg/Volcano/2.svg",
    },
    {
      image: "./assets/svg/Volcano/3.svg",
    },
    {
      image: "./assets/svg/Volcano/4.svg",
    },
    {
      image: "./assets/svg/Volcano/5.svg",
    },
    {
      image: "./assets/svg/Volcano/6.svg",
    },
    {
      image: "./assets/svg/Volcano/7.svg",
    },
    {
      image: "./assets/svg/Volcano/8.svg",
    }
  ];

  public pauseAudio() {
    this.smartAudio.pause('volcano');
    this.smartAudio.pause('volcano1');
    this.smartAudio.pause('volcano2');
    this.smartAudio.pause('volcano3');
    this.smartAudio.pause('volcano4');
    this.smartAudio.pause('volcano5');
    this.smartAudio.pause('volcano6');
    this.playingAudio = false;
    this.playByPart = false;
  }

  public audio1() {
    this.smartAudio.play('volcano1');
    this.smartAudio.pause('volcano2');
    this.smartAudio.pause('volcano3');
    this.smartAudio.pause('volcano4');
    this.smartAudio.pause('volcano5');
    this.smartAudio.pause('volcano6');
    console.log("Playing part 1");
  }
  public audio2() {
    this.smartAudio.play('volcano2');
    this.smartAudio.pause('volcano1');
    this.smartAudio.pause('volcano3');
    this.smartAudio.pause('volcano4');
    this.smartAudio.pause('volcano5');
    this.smartAudio.pause('volcano6');
    console.log("Playing part 2");
  }
  public audio3() {
    this.smartAudio.play('volcano3');
    this.smartAudio.pause('volcano1');
    this.smartAudio.pause('volcano2');
    this.smartAudio.pause('volcano4');
    this.smartAudio.pause('volcano5');
    this.smartAudio.pause('volcano6');
    console.log("Playing part 3");
  }
  public audio4() {
    this.smartAudio.play('volcano4');
    this.smartAudio.pause('volcano1');
    this.smartAudio.pause('volcano2');
    this.smartAudio.pause('volcano3');
    this.smartAudio.pause('volcano5');
    this.smartAudio.pause('volcano6');
    console.log("Playing part 4");
  }
  public audio5() {
    this.smartAudio.play('volcano5');
    this.smartAudio.pause('volcano1');
    this.smartAudio.pause('volcano2');
    this.smartAudio.pause('volcano3');
    this.smartAudio.pause('volcano4');
    this.smartAudio.pause('volcano6');
    console.log("Playing part 5");
  }
  public audio6() {
    this.smartAudio.play('volcano6');
    this.smartAudio.pause('volcano1');
    this.smartAudio.pause('volcano2');
    this.smartAudio.pause('volcano3');
    this.smartAudio.pause('volcano4');
    this.smartAudio.pause('volcano5');
    console.log("Playing part 6");
  }

  //under chapter 1
    public hide1:boolean=true;
    public hide2:boolean=false;
    public hide3:boolean=false;
    public hide4:boolean=false;
    public hide5:boolean=false;
    public hide6:boolean=false;

    //====start of chapter 1=======
    public page1(){
      this.hide1 = true;
      this.hide2 = false;
      this.hide3 = false;
      this.hide4 = false;
      this.hide5 = false;
      this.hide6 = false;
      if (this.playByPart === true) {
        this.audio1();
      }
    }

    public page2(){
      this.hide2 = true;
      this.hide1 = false;
      this.hide3 = false;
      this.hide4 = false;
      this.hide5 = false;
      this.hide6 = false;
      if (this.playByPart === true) {
        this.audio2();
      }
    }

    public page3(){
      this.hide3 = true;
      this.hide1 = false;
      this.hide2 = false;
      this.hide4 = false;
      this.hide5 = false;
      this.hide6 = false;
      if (this.playByPart === true) {
        this.audio3();
      }
    }

    public page4(){
      this.hide4 = true;
      this.hide1 = false;
      this.hide2 = false;
      this.hide3 = false;
      this.hide5 = false;
      this.hide6 = false;
      if (this.playByPart === true) {
        this.audio4();
      }
    }

    public page5(){
      this.hide5 = true;
      this.hide1 = false;
      this.hide2 = false;
      this.hide3 = false;
      this.hide4 = false;
      this.hide6 = false;
      if (this.playByPart === true) {
        this.audio5();
      }
    }

    public page6(){
      this.hide6 = true;
      this.hide1 = false;
      this.hide2 = false;
      this.hide3 = false;
      this.hide4 = false;
      this.hide5 = false;
      if (this.playByPart === true) {
        this.audio6();
      }
    }

}

