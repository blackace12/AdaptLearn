import { QuizSolarsystemPage } from './../quiz-solarsystem/quiz-solarsystem';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform, Modal, ModalController, ModalOptions } from 'ionic-angular';
import { AudioProvider } from 'ionic-audio';
import { SettingsPage } from '../settings/settings';
import { AngularFireAuth } from 'angularfire2/auth';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';
import { AngularFireDatabase,  FirebaseListObservable,  FirebaseObjectObservable} from 'angularfire2/database';

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
  allTracks: any[];
  arrayTest = [];
  currentUser;
  fontSize:any;
  fontVal:any;
  learningStyleObject2: FirebaseObjectObservable<any>;
  learningStyleObject: FirebaseObjectObservable<any>;
  myTracks: any[];
  selectedTrack: any;
  styleArray = ["Solitary", "Visual", "Auditory", "Logical", "Physical", "Social", "Verbal"];
  styles: any[] = [];
  user = [];
  userLearningID: FirebaseObjectObservable<any>

  constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing,af:AngularFireDatabase, private modal: ModalController, public youtube:YoutubeVideoPlayer,db: AngularFireDatabase, afAuth: AngularFireAuth, public smartAudio:SmartAudioProvider) {
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

  playVideo(){
    this.youtube.openVideo('fzWSBaAYtWs');
  }

  regularShare() {
    // share(message, subject, file, url)
    this.socialSharing.shareViaFacebook("Solar System Lesson", null, "https://adaptlearn.herokuapp.com/lesson1/solarsystem.html");
  }

  universeQuiz() {
    this.navCtrl.push(QuizSolarsystemPage)
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