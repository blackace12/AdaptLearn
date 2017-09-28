import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { VisualLearnerInstructionPage } from '../visual-learner-instruction/visual-learner-instruction';
import { KinestheticLearnerInstructionPage } from '../kinesthetic-learner-instruction/kinesthetic-learner-instruction';
import { VerbalLearnerInstructionPage } from '../verbal-learner-instruction/verbal-learner-instruction';
import { AudioLearnerInstructionPage } from '../audio-learner-instruction/audio-learner-instruction';
import { LogicalLearnerInstructionPage } from '../logical-learner-instruction/logical-learner-instruction';
import { SocialLearnerInstructionPage } from '../social-learner-instruction/social-learner-instruction';
import { SolitaryLearnerInstructionPage } from '../solitary-learner-instruction/solitary-learner-instruction';
import { SettingsPage } from '../settings/settings';
import {
  AngularFireDatabase,
  FirebaseObjectObservable
} from 'angularfire2/database';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

export class ListPage {
  styles: any[] = [];
  learningStyleObject: FirebaseObjectObservable<any>;
  learningStyleObject2: FirebaseObjectObservable<any>;
  userLearningID: FirebaseObjectObservable<any>
  user = [];
  arrayTest = [];
  styleArray = ["Solitary", "Visual", "Auditory", "Logical", "Physical", "Social", "Verbal"];
  currentUser;
  currentEmail;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, db: AngularFireDatabase, afAuth: AngularFireAuth) {


    this.currentUser = afAuth.auth.currentUser.uid;
    this.currentEmail = afAuth.auth.currentUser.email;


    this.learningStyleObject = db.object('/LearningStyle/' + this.currentUser, { preserveSnapshot: true });

    this.learningStyleObject.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.user.push(snapshot.key);
      });

     /*  this.userLearningID = db.object('/UserStyle/' + this.user[0], { preserveSnapshot: true });
      this.userLearningID.set({ UID: this.currentUser, Email: this.currentEmail }); */

      this.learningStyleObject2 = db.object('/LearningStyle/' + this.currentUser + '/' + this.user[0], { preserveSnapshot: true });

      this.learningStyleObject2.subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          console.log(snapshot.key);
          this.arrayTest.push(snapshot.val());
        });
        this.arrayTest.sort(function (a, b) {
          return parseInt(b.value) - parseInt(a.value);
        });

        console.log(this.arrayTest[0].style);

        for (var i = 0; i <= this.styleArray.length - 1; i++) {
          if (this.arrayTest[0].style == this.styleArray[i]) {
            this.styles = [
              {
                src: './assets/img/' + this.arrayTest[0].style + '.png',
                button: this.arrayTest[0].style + 'InstructionPage',
                title:this.arrayTest[0].style + ' Learner'
              },

              {
                src: './assets/img/' + this.arrayTest[1].style + '.png',
                button: this.arrayTest[1].style + 'InstructionPage',
                title:this.arrayTest[1].style + ' Learner'
              },

              {
                src: './assets/img/' + this.arrayTest[2].style + '.png',
                button: this.arrayTest[2].style + 'InstructionPage',
                title:this.arrayTest[2].style + ' Learner'
              },

              {
                src: './assets/img/' + this.arrayTest[3].style + '.png',
                button: this.arrayTest[3].style + 'InstructionPage',
                title:this.arrayTest[3].style + ' Learner'
              },

              {
                src: './assets/img/' + this.arrayTest[4].style + '.png',
                button: this.arrayTest[4].style + 'InstructionPage',
                title:this.arrayTest[4].style + ' Learner'
              },

              {
                src: './assets/img/' + this.arrayTest[5].style + '.png',
                button: this.arrayTest[5].style + 'InstructionPage',
                title:this.arrayTest[5].style + ' Learner'
              },

              {
                src: './assets/img/' + this.arrayTest[6].style + '.png',
                button: this.arrayTest[6].style + 'InstructionPage',
                title:this.arrayTest[6].style + ' Learner'
              },
            ];
          }
        }
      });

    });

  }

  commonMethod(methodName) {
    this[methodName]();
  }

  instructionPage(pageName) {
    console.log(SolitaryLearnerInstructionPage)
  }

  SettingsPage() {
    this.navCtrl.push(SettingsPage)
  }

  AuditoryInstructionPage() {
    this.navCtrl.push(AudioLearnerInstructionPage)
  }

  VisualInstructionPage() {
    this.navCtrl.push(VisualLearnerInstructionPage);

  }

  PhysicalInstructionPage() {
    this.navCtrl.push(KinestheticLearnerInstructionPage);

  }

  VerbalInstructionPage() {
    this.navCtrl.push(VerbalLearnerInstructionPage);

  }


  LogicalInstructionPage() {
    this.navCtrl.push(LogicalLearnerInstructionPage);

  }

  SocialInstructionPage() {
    this.navCtrl.push(SocialLearnerInstructionPage);

  }

  SolitaryInstructionPage() {
    this.navCtrl.push(SolitaryLearnerInstructionPage);

  }
}
