import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { DataProvider } from './../../providers/data/data';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {
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

  getID:FirebaseObjectObservable<any>;
  prevScoreChecker: FirebaseObjectObservable<any>;
  prevQuizChecker:FirebaseObjectObservable<any>;

  score: number = 0;
  shuffledQuestions: any;
  quizID: any;
  userpercentage: number = 0;
  wrongAnswers: any[] = [];
  correctAnswer: any;
  prevScore = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public alertCtrl: AlertController, public dataService: DataProvider, public afAuth: AngularFireAuth, public af: AngularFireDatabase) {

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
    this.quizUniverse = this.af.list('/Quiz/');
    this.progressID = this.af.list('/UserProgress/' + this.currentUser)
/*
    this.getID = this.af.object('/UserProgress/' + this.currentUser + '/${key}/', { preserveSnapshot: true });

    this.getID.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        console.log(snapshot.key);
        console.log(snapshot.val());
      });
    });

    this.prevQuizChecker = this.af.object('/Quiz/');
    this.getID = this.af.object('/UserProgress/' + this.currentUser + '/', { preserveSnapshot: true });


    this.getID.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        console.log(snapshot.key);
        this.prevScore.push(snapshot.key);
      });
      console.log(this.prevScore);
      console.log(this.prevScore[0].key);

      this.prevScoreChecker = this.af.object('/UserProgress/' + this.currentUser + '/' + this.prevScore[0].key, { preserveSnapshot: true });
      if (this.prevScore == undefined || this.prevScore == null) {
        console.log("No Data yet");
      }

      else {
        if (this.score >= 7) {
         this.prevScoreChecker.update(
            {
              Score: this.score
            }
          );
          this.prevQuizChecker.update({
            Score: this.score,
          });
        }
      }
    })
 */

     if (this.score >= 7) {
      this.quizID = this.quizUniverse.push(
        {
          Chapter_Quiz: "UniverseFormation", Passed: true, Score: this.score, Quiz: 1
        }
      ).key;
      console.log(this.quizID);

      this.progressID.push({
        QuizID: this.quizID,
        Chapter_Quiz: "UniverseFormation",
        Passed: true, Score: this.score,
        Quiz: 1
      });
    }

    else if (this.score < 7) {
      this.quizID = this.quizUniverse.push(
        {
          Chapter_Quiz: "UniverseFormation", Passed: false, Score: this.score, Quiz: 1
        }
      ).key;
      console.log(this.quizID);
      this.progressID.push({
        QuizID: this.quizID,
        Chapter_Quiz: "UniverseFormation",
        Passed: true, Score: this.score,
        Quiz: 1
      });
    }
    this.navCtrl.pop();
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
    this.navCtrl.pop();
  }
}