import { QuizLslidePage } from './../quiz-lslide/quiz-lslide';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { SocialSharing } from '@ionic-native/social-sharing';
import { QuizPage } from './../quiz/quiz';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions } from 'ionic-angular';
import { SettingsPage} from '../settings/settings';
import { AngularFireAuth } from 'angularfire2/auth';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';
import { AngularFireDatabase,  FirebaseListObservable,  FirebaseObjectObservable} from 'angularfire2/database';

/**
 * Generated class for the LessonNaturalLandslidePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-lesson-natural-landslide',
  templateUrl: 'lesson-natural-landslide.html',
})
export class LessonNaturalLandslidePage {
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

    /* this.myTracks = [{
      src: '../assets/sounds/Landslides.mp3',
    }
    ]; */
  }

  playingAudio: boolean = false;
  
  playAudio(){
    if(this.playingAudio === false){
      this.smartAudio.play('landslide');
      this.playingAudio = !this.playingAudio;
      console.log("playing");
    }
    else {
      this.smartAudio.pause('landslide');
      this.playingAudio = !this.playingAudio;
      console.log("pause");
    }
  }

  playVideo(){
    this.youtube.openVideo('mknStAMia0Q');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LessonNaturalLandslidePage');
  }

  SettingsPage(){
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

  regularShare(){
    // share(message, subject, file, url)
    this.socialSharing.shareViaFacebook("Landslide Lesson", null, "https://adaptlearn.herokuapp.com/lesson2/landslide.html");
  }

  universeQuiz(){
    this.navCtrl.push(QuizLslidePage)
  }

  //under chapter 1
    public hide1:boolean=false;
    public hide1_1:boolean=false;
    public hide1_2:boolean=false;
    public hide1_3:boolean=false;

    //====start of chapter 1=======
    public click1(){
      this.hide1 = !this.hide1;
      this.hide1_1 = false;
      this.hide1_2 = false;
      this.hide1_3 = false;
    }

    public click1_1(){
      this.hide1_1 = !this.hide1_1;
      this.hide1 = false;
      this.hide1_2 = false;
      this.hide1_3 = false;
    }

    public click1_2(){
      this.hide1_2 = !this.hide1_2;
      this.hide1 = false;
      this.hide1_1 = false;
      this.hide1_3 = false;
    }

    public click1_3(){
      this.hide1_3 = !this.hide1_3;
      this.hide1 = false;
      this.hide1_1 = false;
      this.hide1_2 = false;
    }

    //====end of chapter 1=======
}
