import {
  AngularFireAuth
} from 'angularfire2/auth';
import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  AlertController
} from 'ionic-angular';
import {
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2/database';
import {
  SettingsPage
} from '../settings/settings';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  arrayTest = [];
  chartOptions: any;
  currentUser: any;
  learningStyleObject2: FirebaseObjectObservable < any > ;
  learningStyleObject: FirebaseObjectObservable < any > ;
  learningStyleScores: FirebaseListObservable < any > ;
  styleArray = ["Solitary", "Visual", "Auditory", "Logical", "Physical", "Social", "Verbal"];
  styles: any[] = [];
  user = [];
  userScores = [];
  userLearningID: FirebaseObjectObservable < any >
    userProgress: FirebaseObjectObservable < any >
    scores: any[] = [];
  key: any[] = [];
  tracks: any[] = [];
  tracker: number;
  l1prog: number;
  l2prog: number;
  l3prog: number;
  UserProgressTotal: FirebaseObjectObservable < any > ;


  totalValue: number;
  value0: any;
  value1: number;
  value2: number;
  value3: number;
  value4: number;
  value5: number;
  value6: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFireDatabase, afAuth: AngularFireAuth, public modalCtrl: ModalController, public alertCtrl: AlertController) {

    this.currentUser = afAuth.auth.currentUser.uid;

    this.learningStyleObject = af.object('/LearningStyle/' + this.currentUser, {
      preserveSnapshot: true
    });

    this.userLearningID = af.object('/Users/' + this.currentUser, {
      preserveSnapshot: true
    });

    this.userProgress = af.object('/UserProgress/' + this.currentUser + '/', {
      preserveSnapshot: true
    });
    this.userProgress.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.userScores.push(snapshot.val());
        this.key = snapshot.key;
      });

      /* User Progress */

      this.UserProgressTotal = af.object('/UserProgress/' + this.currentUser + '/' + this.key + '/' + '/ProgressRate/', {
        preserveSnapshot: true
      });
      this.UserProgressTotal.subscribe(snapshoters => {
        this.tracks.push(snapshoters.val());
        this.tracker = Math.ceil(((100 / 9) * this.tracks[0]));
        console.log(this.tracks[0]);
        if (this.tracks[0] < 5) {
          this.l1prog = ((100 / 4) * this.tracks[0]);
          this.l1prog = Math.ceil(this.l1prog);
        } else if (this.tracks[0] > 4) {
          this.l1prog = 100;
        } else {
          this.l1prog = 0;
        }

        if (this.l1prog == 100) {
          if (this.tracks[0] < 9) {
            this.l2prog = (this.tracks[0] - 4);
            this.l2prog = (100 / 4) * this.l2prog;
          } else if (this.tracks[0] == 9) {
            this.l2prog = 100;
          }
        } else {
          this.l2prog = 0;
        }

        if (this.l2prog == 100) {
          if (this.tracks[0] == 8) {
            this.l3prog = 90;
          } else if (this.tracks[0] == 9) {
            this.l3prog = 100;
          }
        } else {
          this.l3prog = 0;
        }
      })

      /* End User Progress */

      this.learningStyleObject.subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          console.log(snapshot.key);
          this.user.push(snapshot.key);
        });
        this.learningStyleObject2 = af.object('/LearningStyle/' + this.currentUser + '/' + this.user[0], {
          preserveSnapshot: true
        });

        this.learningStyleObject2.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            this.arrayTest.push(snapshot.val());
          });
          this.arrayTest.sort(function (a, b) {
            return parseInt(b.value) - parseInt(a.value);
          });
          this.totalValue =
            this.arrayTest[0].value +
            this.arrayTest[1].value +
            this.arrayTest[2].value +
            this.arrayTest[3].value +
            this.arrayTest[4].value +
            this.arrayTest[5].value +
            this.arrayTest[6].value;
          console.log(this.totalValue);

          console.log(this.arrayTest[0].style);
          for (var i = 0; i <= this.styleArray.length - 1; i++) {
            if (this.arrayTest[0].style == this.styleArray[i]) {
              this.styles = [{
                  src: './assets/img/' + this.arrayTest[0].style + '.png',
                },
                {
                  src: './assets/img/' + this.arrayTest[1].style + '.png',
                },
                {
                  src: './assets/img/' + this.arrayTest[2].style + '.png',
                },
              ];
            }
          }

          this.value0 = Math.ceil((this.arrayTest[0].value / this.totalValue) * 100);
          this.value1 = Math.ceil((this.arrayTest[1].value / this.totalValue) * 100);
          this.value2 = Math.ceil((this.arrayTest[2].value / this.totalValue) * 100);
          this.value3 = Math.ceil((this.arrayTest[3].value / this.totalValue) * 100);
          this.value4 = Math.ceil((this.arrayTest[4].value / this.totalValue) * 100);
          this.value5 = Math.ceil((this.arrayTest[5].value / this.totalValue) * 100);
          this.value6 = Math.ceil((this.arrayTest[6].value / this.totalValue) * 100);

          this.chartOptions = {
            chart: {
              type: 'pie',
              options3d: {
                enabled: true,
                alpha: 60
              }
            },
            title: {
              text: ''
            },

            plotOptions: {
              pie: {
                innerSize: 100,
                depth: 45
              }
            },
            series: [{
              name: 'Percentage ',
              data: [
                [this.arrayTest[0].style, this.value0],
                [this.arrayTest[1].style, this.value1],
                [this.arrayTest[2].style, this.value2],
                [this.arrayTest[3].style, this.value3],
                [this.arrayTest[4].style, this.value4],
                [this.arrayTest[5].style, this.value5],
                [this.arrayTest[6].style, this.value6],
              ],
              tooltip: {
                valueSuffix: '%'
              }
            }]
          }
        })
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  SettingsPage() {
    this.navCtrl.push(SettingsPage)
  }
}
