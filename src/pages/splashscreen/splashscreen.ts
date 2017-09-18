import { AuthProvider } from './../../providers/auth/auth';
import { Network } from '@ionic-native/network';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController, ToastController, ToastOptions, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { ListPage } from '../list/list';
//import { QuizPage } from '../quiz/quiz';
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

  constructor(private platform: Platform, public statusBar: StatusBar, public alerCtrl: AlertController, private network: Network, public toastCtrl: ToastController, public authProvider: AuthProvider, public navCtrl: NavController, private settings: SettingsProvider) {
    this.initializeApp();
    this.icons = ['home', 'book', 'podium'];


    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: SplashscreenPage, icon: this.icons[0], },
      { title: 'Subject', component: LessonPage, icon: this.icons[1] },
      // { title: 'Quiz', component: QuizPage,icon:this.icons[2] },
      { title: 'Progress', component: ProfilePage, icon: this.icons[2] }

    ];

    // watch network for a disconnect
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      let toast = this.toastCtrl.create({
        message: 'Network was Disconnected',
        duration: 3000,
        position: 'bottom'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      toast.present();
    });


    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      let toast = this.toastCtrl.create({
        message: 'Network Connected',
        duration: 3000,
        position: 'bottom'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          let toast = this.toastCtrl.create({
            message: 'Yehey! Looks like we have an internet connection via Wi-fi',
            duration: 3000,
            position: 'bottom'
          });

          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });

          toast.present();
        }

        else if (this.network.type === '3g') {
          let toast = this.toastCtrl.create({
            message: 'Yehey! Looks like we have an internet connection via 3G!',
            duration: 3000,
            position: 'bottom'
          });

          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });

          toast.present();
        }
      }, 3000);
    });

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