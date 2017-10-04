import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { QuizSolarsystemPage } from './../quiz-solarsystem/quiz-solarsystem';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions, Navbar, ToastController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { AngularFireAuth } from 'angularfire2/auth';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';
import { AngularFireDatabase,  FirebaseObjectObservable} from 'angularfire2/database';
import { SettingsProvider } from "../../providers/settings/settings"; //new

/**
 * Generated class for the LessonEarthSolarsystemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-lesson-earth-solarsystem',
  templateUrl: 'lesson-earth-solarsystem.html',
})
export class LessonEarthSolarsystemPage {
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
            console.log(this.arrayTest[0].style);
          }
        }
      });
    });

    //this.myTracks = [{
    //  src: '../assets/sounds/SolarSystem.mp3',
    //}
    //];

    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val); //new
  }

  //new
  changeTheme(){
    this.settings.setActiveTheme('day-theme');
  }

  playingAudio: boolean = false;

  playAudio(){
    if(this.playingAudio === false){
      this.smartAudio.play('solarSystem');
      this.playingAudio = !this.playingAudio;
      console.log("playing");
    }
    else {
      this.smartAudio.pause('solarSystem');
      this.playingAudio = !this.playingAudio;
      console.log("pause");
    }
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      if (this.playingAudio === true) {

          this.smartAudio.pause('solarSystem');
          this.playingAudio = !this.playingAudio;
          let toast = this.toastCtrl.create({
            message: 'Audio Stopped',
            duration: 1500
          });
          toast.present();
      }
      this.scrnOrnt.unlock();
      this.scrnOrnt.lock(this.scrnOrnt.ORIENTATIONS.PORTRAIT);
      this.navCtrl.pop();

    }
  }

  playVideo(){
    this.youtube.openVideo('fzWSBaAYtWs');
  }

  regularShare() {
    // share(message, subject, file, url)
    this.socialSharing.shareViaFacebook("Solar System Lesson", null, "https://adaptlearn.herokuapp.com/lesson1/solarsystem.html");
  }

  universeQuiz() {
    //new
    let data = {
      theme: this.selectedTheme
    };
    this.navCtrl.push(QuizSolarsystemPage, data);
    this.changeTheme();
  }

  SettingsPage() {
    this.navCtrl.push(SettingsPage)
  }

  openModal() {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false //disables dismiss of modal when clicking outside modal
    };

    const myModal: Modal = this.modal.create('FontSizePage', { data:this.fontVal }, myModalOptions);

    //present font size modal
    myModal.present();

    //will receive value when modal is closed/dismissed
    myModal.onWillDismiss((fontValue) => {
      this.fontSize = fontValue;
      this.fontVal = fontValue;
      console.log(this.fontVal + " back to page");
    });
  }

  solarSlides = [
    {
      image: "./assets/svg/Solar/1.svg",
    },
    {
      image: "./assets/svg/Solar/2.svg",
    },
    {
      image: "./assets/svg/Solar/3.svg",
    },
    {
      image: "./assets/svg/Solar/4.svg",
    },
    {
      image: "./assets/svg/Solar/5.svg",
    },
    {
      image: "./assets/svg/Solar/6.svg",
    },
    {
      image: "./assets/svg/Solar/7.svg",
    },
    {
      image: "./assets/svg/Solar/8.svg",
    },
    {
      image: "./assets/svg/Solar/9.svg",
    },
    {
      image: "./assets/svg/Solar/10.svg",
    },
    {
      image: "./assets/svg/Solar/11.svg",
    },
    {
      image: "./assets/svg/Solar/12.svg",
    },
    {
      image: "./assets/svg/Solar/13.svg",
    },
    {
      image: "./assets/svg/Solar/14.svg",
    },
    {
      image: "./assets/svg/Solar/15.svg",
    },
    {
      image: "./assets/svg/Solar/16.svg",
    },
    {
      image: "./assets/svg/Solar/17.svg",
    },
    {
      image: "./assets/svg/Solar/18.svg",
    },
    {
      image: "./assets/svg/Solar/19.svg",
    },
    {
      image: "./assets/svg/Solar/20.svg",
    },
    {
      image: "./assets/svg/Solar/21.svg",
    },
    {
      image: "./assets/svg/Solar/22.svg",
    },
    {
      image: "./assets/svg/Solar/23.svg",
    },
    {
      image: "./assets/svg/Solar/24.svg",
    },
    {
      image: "./assets/svg/Solar/25.svg",
    },
    {
      image: "./assets/svg/Solar/26.svg",
    },
    {
      image: "./assets/svg/Solar/27.svg",
    },
    {
      image: "./assets/svg/Solar/28.svg",
    },
    {
      image: "./assets/svg/Solar/29.svg",
    },
    {
      image: "./assets/svg/Solar/30.svg",
    },
    {
      image: "./assets/svg/Solar/31.svg",
    },
    {
      image: "./assets/svg/Solar/32.svg",
    },
    {
      image: "./assets/svg/Solar/33.svg",
    },
    {
      image: "./assets/svg/Solar/34.svg",
    },
    {
      image: "./assets/svg/Solar/35.svg",
    },
    {
      image: "./assets/svg/Solar/36.svg",
    },
    {
      image: "./assets/svg/Solar/37.svg",
    },
    {
      image: "./assets/svg/Solar/38.svg",
    },
    {
      image: "./assets/svg/Solar/39.svg",
    },
    {
      image: "./assets/svg/Solar/40.svg",
    }
  ];


  //under chapter 2
  public hide2: boolean = true;
  public hide2_1: boolean = false;

  //====start of chapter 2=======
  public click2() {
    this.hide2 = !this.hide2;
    this.hide2_1 = false;
    this.hide3 = false;
    this.hide3_1 = false;
    this.hide3_2 = false;
    this.hide3_3 = false;
    this.hide3_4 = false;
    this.hide3_5 = false;
    this.hide3_6 = false;
    this.hide3_7 = false;
    this.hide3_8 = false;
    this.hide3_9 = false;
    this.hide3_10 = false;
  }

  public click2_1() {
    this.hide2_1 = !this.hide2_1;
    this.hide2 = false;
    this.hide3 = false;
    this.hide3_1 = false;
    this.hide3_2 = false;
    this.hide3_3 = false;
    this.hide3_4 = false;
    this.hide3_5 = false;
    this.hide3_6 = false;
    this.hide3_7 = false;
    this.hide3_8 = false;
    this.hide3_9 = false;
    this.hide3_10 = false;
  }
  //====end of chapter 2=======

  //under chapter 3
  public hide3: boolean = false;
  public hide3_1: boolean = false;
  public hide3_2: boolean = false;
  public hide3_3: boolean = false;
  public hide3_4: boolean = false;
  public hide3_5: boolean = false;
  public hide3_6: boolean = false;
  public hide3_7: boolean = false;
  public hide3_8: boolean = false;
  public hide3_9: boolean = false;
  public hide3_10: boolean = false;

  //====start of chapter 3=======
  public click3() {
    this.hide3 = !this.hide3;
    this.hide2 = false;
    this.hide2_1 = false;
    this.hide3_1 = false;
    this.hide3_2 = false;
    this.hide3_3 = false;
    this.hide3_4 = false;
    this.hide3_5 = false;
    this.hide3_6 = false;
    this.hide3_7 = false;
    this.hide3_8 = false;
    this.hide3_9 = false;
    this.hide3_10 = false;
  }

  public click3_1() {
    this.hide3_1 = !this.hide3_1;
    this.hide2 = false;
    this.hide2_1 = false;
    this.hide3 = false;
    this.hide3_2 = false;
    this.hide3_3 = false;
    this.hide3_4 = false;
    this.hide3_5 = false;
    this.hide3_6 = false;
    this.hide3_7 = false;
    this.hide3_8 = false;
    this.hide3_9 = false;
    this.hide3_10 = false;
  }

  public click3_2() {
    this.hide3_2 = !this.hide3_2;
    this.hide2 = false;
    this.hide2_1 = false;
    this.hide3 = false;
    this.hide3_1 = false;
    this.hide3_3 = false;
    this.hide3_4 = false;
    this.hide3_5 = false;
    this.hide3_6 = false;
    this.hide3_7 = false;
    this.hide3_8 = false;
    this.hide3_9 = false;
    this.hide3_10 = false;
  }

  public click3_3() {
    this.hide3_3 = !this.hide3_3;
    this.hide2 = false;
    this.hide2_1 = false;
    this.hide3 = false;
    this.hide3_1 = false;
    this.hide3_2 = false;
    this.hide3_4 = false;
    this.hide3_5 = false;
    this.hide3_6 = false;
    this.hide3_7 = false;
    this.hide3_8 = false;
    this.hide3_9 = false;
    this.hide3_10 = false;
  }

  public click3_4() {
    this.hide3_4 = !this.hide3_4;
    this.hide2 = false;
    this.hide2_1 = false;
    this.hide3 = false;
    this.hide3_1 = false;
    this.hide3_2 = false;
    this.hide3_3 = false;
    this.hide3_5 = false;
    this.hide3_6 = false;
    this.hide3_7 = false;
    this.hide3_8 = false;
    this.hide3_9 = false;
    this.hide3_10 = false;
  }

  public click3_5() {
    this.hide3_5 = !this.hide3_5;
    this.hide2 = false;
    this.hide2_1 = false;
    this.hide3 = false;
    this.hide3_1 = false;
    this.hide3_2 = false;
    this.hide3_3 = false;
    this.hide3_4 = false;
    this.hide3_6 = false;
    this.hide3_7 = false;
    this.hide3_8 = false;
    this.hide3_9 = false;
    this.hide3_10 = false;
  }

  public click3_6() {
    this.hide3_6 = !this.hide3_6;
    this.hide2 = false;
    this.hide2_1 = false;
    this.hide3 = false;
    this.hide3_1 = false;
    this.hide3_2 = false;
    this.hide3_3 = false;
    this.hide3_4 = false;
    this.hide3_5 = false;
    this.hide3_7 = false;
    this.hide3_8 = false;
    this.hide3_9 = false;
    this.hide3_10 = false;
  }

  public click3_7() {
    this.hide3_7 = !this.hide3_7;
    this.hide2 = false;
    this.hide2_1 = false;
    this.hide3 = false;
    this.hide3_1 = false;
    this.hide3_2 = false;
    this.hide3_3 = false;
    this.hide3_4 = false;
    this.hide3_5 = false;
    this.hide3_6 = false;
    this.hide3_8 = false;
    this.hide3_9 = false;
    this.hide3_10 = false;
  }

  public click3_8() {
    this.hide3_8 = !this.hide3_8;
    this.hide2 = false;
    this.hide2_1 = false;
    this.hide3 = false;
    this.hide3_1 = false;
    this.hide3_2 = false;
    this.hide3_3 = false;
    this.hide3_4 = false;
    this.hide3_5 = false;
    this.hide3_6 = false;
    this.hide3_7 = false;
    this.hide3_9 = false;
    this.hide3_10 = false;
  }

  public click3_9() {
    this.hide3_9 = !this.hide3_9;
    this.hide2 = false;
    this.hide2_1 = false;
    this.hide3 = false;
    this.hide3_1 = false;
    this.hide3_2 = false;
    this.hide3_3 = false;
    this.hide3_4 = false;
    this.hide3_5 = false;
    this.hide3_6 = false;
    this.hide3_7 = false;
    this.hide3_8 = false;
    this.hide3_10 = false;
  }

  public click3_10() {
    this.hide3_10 = !this.hide3_10;
    this.hide2 = false;
    this.hide2_1 = false;
    this.hide3 = false;
    this.hide3_1 = false;
    this.hide3_2 = false;
    this.hide3_3 = false;
    this.hide3_4 = false;
    this.hide3_5 = false;
    this.hide3_6 = false;
    this.hide3_7 = false;
    this.hide3_8 = false;
    this.hide3_9 = false;
  }
  //====end of chapter 3=======





}