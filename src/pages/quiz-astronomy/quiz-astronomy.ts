import { LessonEarthSolarsystemPage } from '../lesson-earth-solarsystem/lesson-earth-solarsystem';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder } from '@angular/forms';
import { DataAstronomyProvider } from './../../providers/data-astronomy/data-astronomy';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SettingsProvider } from "../../providers/settings/settings"; //new
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-quiz-astronomy',
  templateUrl: 'quiz-astronomy.html',
})
export class QuizAstronomyPage {
  @ViewChild('slides') slides: any;

  slideOptions: any;
  currentUser: any;
  finalscore: number = 0;
  hasAnswered: boolean = false;
  passingscore: number = 0;
  percentage: number = 70;
  progressID: FirebaseListObservable<any>;
  questions: any;
  quizAstronomy: FirebaseListObservable<any>;
  score: number = 0;
  shuffledQuestions: any;
  quizID: any;
  userpercentage: number = 0;

  userProgressID: FirebaseObjectObservable<any>;
  userProgressIDArr = [];
  userProgressKey = [];
  updaterUPID: FirebaseListObservable<any>;

  userQuizID: FirebaseObjectObservable<any>;
  userQuizIDArr = [];
  updateQID: FirebaseListObservable<any>;

  imagename:string;
  wrongAnswers: any[] = [];

  //new
  theme: string;
  selectedTheme:String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public alertCtrl: AlertController, public dataService: DataAstronomyProvider, public afAuth: AngularFireAuth, public af: AngularFireDatabase, private settings: SettingsProvider) {

  }

  ionViewDidLoad() {
    //new
    this.theme = this.navParams.get('theme');
    console.log("Received theme: " + this.theme);

    this.slides.lockSwipes(true);
    this.dataService.load().then((data) => {
      data.map((question) => {
        this.shuffledQuestions = _.shuffle(data);
        if (this.shuffledQuestions.length > 10) this.shuffledQuestions.length = 10;
        this.shuffledQuestions.forEach(question => _.shuffle(question.answers));
        return question;
      });
      this.questions = this.shuffledQuestions;
    });

  }

  //new
  changeTheme() {
    if(this.theme === "night-theme") {
      this.settings.setActiveTheme('night-theme');
    }
    else {
      this.settings.setActiveTheme('day-theme');
    }
  }

  nextSlide() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
    if (this.score >= 7) {
      this.imagename = "./assets/img/pass.png";
    }
    else {
      this.imagename = "./assets/img/fail.png";
    }
  }

  selectAnswer(answer, question) {
    this.hasAnswered = true;
    answer.selected = true;
    question.flashCardFlipped = true;

    if (answer.correct == false) {

      this.wrongAnswers.push({
        questionA: question.questionText,
        answer: answer.answer,
        correctAnswer: question.correctAnswer,
      });
      console.log(this.wrongAnswers);
    }

    if (answer.correct) {
      this.score++;
      this.passingscore += this.score;
    }

    if (question.length == 10) {
      console.log(question);
    }


    this.userpercentage = ((this.score / 10) * 100);

    setTimeout(() => {
      this.hasAnswered = false;
      this.nextSlide();
      answer.selected = false;
      question.flashCardFlipped = false;
    }, 1000);
  }

  error() {
    this.nextSlide();
  }


  continue() {

    this.currentUser = this.afAuth.auth.currentUser.uid;
    this.quizAstronomy = this.af.list('/Quiz/');
    this.progressID = this.af.list('/UserProgress/' + this.currentUser)

    this.userProgressID = this.af.object('/UserProgress/' + this.currentUser + '/', { preserveSnapshot: true });

    this.userQuizID = this.af.object('/Quiz/', { preserveSnapshot: true });

    console.log(this.progressID);
    console.log(this.userProgressID);

    this.userProgressID.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.userProgressIDArr.push(snapshot.val());
      });
    });
    console.log(this.userProgressIDArr);
    if (this.userProgressIDArr.length == 1) {
      //Edit Here
      if (this.score >= 7) {
        this.quizID = this.quizAstronomy.push(
          {
            Chapter_Quiz: "Astronomy", Passed: true, Score: this.score, ProgressRate: 2
          }
        ).key;
        console.log(this.quizID);

        this.progressID.push({
          QuizID: this.quizID,
          Chapter_Quiz: "Astronomy",
          Passed: true, Score: this.score,
          ProgressRate: 2
        });
      }

      else if (this.score < 7) {
        this.quizID = this.quizAstronomy.push(
          {
            Chapter_Quiz: "Astronomy", Passed: false, Score: this.score, ProgressRate: 2
          }
        ).key;
        console.log(this.quizID);
        this.progressID.push({
          QuizID: this.quizID,
          Chapter_Quiz: "Astronomy",
          Passed: true, Score: this.score,
          ProgressRate: 2
        });
      }
      console.log("Eto yun");
      //Edit Here

    }

    else {
      //Getting the progress ID of USER first
      this.userProgressID.subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          this.userProgressKey.push(snapshot.key);
          this.userProgressIDArr.push(snapshot.val());
        });
        console.log(this.userProgressKey[1]);
        console.log(this.userProgressIDArr[1].QuizID);

        //Getting the progress ID of USER first
        this.userQuizID.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            this.userQuizIDArr.push(snapshot.key);
          });
          console.log(this.userQuizIDArr[1]);

          for (var i = 0; i <= this.userQuizIDArr.length; i++) {
            //Add for loop for the ProgressKey
            if (this.userProgressIDArr[1].QuizID === this.userQuizIDArr[i]) {
              this.updaterUPID = this.af.list('/UserProgress/' + this.currentUser + '/');
              this.updaterUPID.update(this.userProgressKey[1], { Score: this.score });

              this.updateQID = this.af.list('/Quiz/');
              this.updateQID.update(this.userQuizIDArr[i], { Score: this.score });
              console.log("Equal");
              break;
            }
            else {
              console.log("Not Equal");
            }
          }
          console.log("Update time");
        })
      })
    }
    this.changeTheme(); //new
    this.navCtrl.popToRoot();
    this.navCtrl.push(LessonEarthSolarsystemPage);
  }


  restartQuiz() {
    this.wrongAnswers = [];
    this.score = 0;
    this.slides.lockSwipes(false);
    this.slides.slideTo(1, 1000);
    this.slides.lockSwipes(true);

    this.dataService.load().then((data) => {
      data.map((question) => {
        this.shuffledQuestions = _.shuffle(data);
        if (this.shuffledQuestions.length > 10) this.shuffledQuestions.length = 10;
        this.shuffledQuestions.forEach(question => _.shuffle(question.answers));
        return question;
      });
      this.questions = this.shuffledQuestions;
    });
  }

  exit() {
    if (this.score >= 7){
      this.continue();
    } else {
      this.changeTheme(); //new
      this.navCtrl.pop();
    }
  }
}
