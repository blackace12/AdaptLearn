import { FormBuilder } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { DataLslideProvider } from './../../providers/data-lslide/data-lslide';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as _ from 'lodash';


@IonicPage()
@Component({
  selector: 'page-quiz-lslide',
  templateUrl: 'quiz-lslide.html',
})
export class QuizLslidePage {
  @ViewChild('slides') slides: any;

  slideOptions: any;
  currentUser: any;
  finalscore: number = 0;
  hasAnswered: boolean = false;
  passingscore: number = 0;
  percentage: number = 70;
  progressID: FirebaseListObservable<any>;
  questions: any;
  quizUniverse: FirebaseListObservable<any>;
  score: number = 0;
  shuffledQuestions: any;
  quizID: any;
  userpercentage: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public alertCtrl: AlertController, public dataService: DataLslideProvider, public afAuth: AngularFireAuth, public af: AngularFireDatabase) {

  }

  ionViewDidLoad() {
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

  nextSlide() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  selectAnswer(answer, question) {
    this.hasAnswered = true;
    answer.selected = true;
    question.flashCardFlipped = true;

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


  continue() {

    this.currentUser = this.afAuth.auth.currentUser.uid;
    this.quizUniverse = this.af.list('/Quiz/');
    this.progressID = this.af.list('/UserProgress/' + this.currentUser)
    //to be inserted, check first before push

    if (this.score >= 7) {
      this.quizID = this.quizUniverse.push(
        {
          Chapter_Quiz: "Landslide", Passed: true, Score: this.score, Quiz: 7
        }
      ).key;
      console.log(this.quizID);


      this.progressID.push({
        QuizID: this.quizID,
        Chapter_Quiz: "Landslide",
        Passed: true, Score: this.score,
        Quiz: 7
      });
    }

    else if (this.score < 7) {
      this.quizID = this.quizUniverse.push(
        {
          Chapter_Quiz: "Landslide", Passed: false, Score: this.score, Quiz: 7
        }
      ).key;
      console.log(this.quizID);
      this.progressID.push({
        QuizID: this.quizID,
        Chapter_Quiz: "Landslide",
        Passed: true, Score: this.score,
        Quiz: 7
      });
    }
    this.navCtrl.pop();
    // this.navCtrl.setRoot(LessonEarthUniversePage);
  }

  restartQuiz() {
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

  exit(){
    this.navCtrl.pop();
  }
}