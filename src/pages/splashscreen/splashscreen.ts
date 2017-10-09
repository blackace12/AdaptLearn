import { ListPage } from '../list/list';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseObjectObservable, AngularFireDatabase} from 'angularfire2/database';
import { AuthProvider } from './../../providers/auth/auth';
import { Component, ViewChild } from '@angular/core';
import {MenuController, Platform,  Nav,  AlertController,  NavController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { ProfilePage } from '../profile/profile';
import { LessonPage } from '../lesson/lesson';
import { LoginPage } from '../login/login';
import { SettingsProvider } from "../../providers/settings/settings";

@Component({
  templateUrl: 'splashscreen.html'
})
export class SplashscreenPage {
  @ViewChild(Nav) nav: Nav;
  selectedItem: any;
  rootPage: any = ListPage;
  selectedTheme:String;
  icons: string[];
  pages: Array<{ title: string, component: any, icon: string }>

  styles: any[] = [];
  learningStyleObject: FirebaseObjectObservable<any>;
  learningStyleObject2: FirebaseObjectObservable<any>;
  userObject: FirebaseObjectObservable<any>
  user = [];
  userName = [];

  arrayTest = [];
  styleArray = ["Solitary", "Visual", "Auditory", "Logical", "Physical", "Social", "Verbal"];
  currentUser;
  currentEmail;

  constructor(private platform: Platform, public statusBar: StatusBar, public alerCtrl: AlertController, public authProvider: AuthProvider, public navCtrl: NavController, private settings: SettingsProvider, public menuCtrl:MenuController,db: AngularFireDatabase, afAuth: AngularFireAuth) {
    this.currentUser = afAuth.auth.currentUser.uid;
    this.currentEmail = afAuth.auth.currentUser.email;


    this.userObject = db.object('/Users/' + this.currentUser, {preserveSnapshot: true});

    this.learningStyleObject = db.object('/LearningStyle/' + this.currentUser, { preserveSnapshot: true });

    this.learningStyleObject.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.user.push(snapshot.key);
      });

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

    this.userObject.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.userName.push(snapshot.val());
      });
      console.log(this.userName);


        for (var i = 0; i <= this.styleArray.length - 1; i++) {
          if (this.arrayTest[0].style == this.styleArray[i]) {
            this.styles = [
              {
                user:this.userName[2],
                title:this.arrayTest[0].style + ' Learner'
              },
            ];
          }
        }
      });
    });
    });



    this.initializeApp();
    this.icons = ['home', 'planet', 'podium'];
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: SplashscreenPage, icon: this.icons[0], },
      { title: 'Earth Science', component: LessonPage, icon: this.icons[1] },
      { title: 'Progress', component: ProfilePage, icon: this.icons[2] }

    ];

    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  doConfirm(): void {
    let confirm = this.alerCtrl.create({
      title: 'Logging out',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.authProvider.logoutUser().then(() => {
              this.changeTheme();
              console.log("Logout");
              this.navCtrl.setRoot(LoginPage);
            });
          }
        }
      ]
    });
    confirm.present()
  }

  changeTheme(){
    this.settings.setActiveTheme('day-theme');
  }
}
