import { HomePage } from './../pages/home/home';
import { LearnertestPage } from './../pages/learnertest/learnertest';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { SplashscreenPage } from './../pages/splashscreen/splashscreen';
import { LoginPage } from '../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { ToastController, Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { SettingsProvider } from "../providers/settings/settings";
import { SmartAudioProvider } from '../providers/smart-audio/smart-audio';
import { Network } from '@ionic-native/network';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  selectedTheme: String;
  UserChecker: FirebaseListObservable<any>;
  checkerTest = [];
  currentUser;
  currentEmail;
  constructor(platform: Platform, af: AngularFireDatabase, afAuth: AngularFireAuth, statusBar: StatusBar, splashScreen: SplashScreen, private settings: SettingsProvider, smartAudio: SmartAudioProvider, private network: Network, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    // watch network for a disconnect
    let dc;
    this.network.onDisconnect().subscribe(() => {
      dc = this.toastCtrl.create({
        message: 'Network Disconnected',
        //duration: 5000,
        position: 'bottom',
        cssClass: "toast-error"
      });
      dc.present();
    });

    // watch network for a connection
    this.network.onConnect().subscribe(() => {
      dc.dismiss();
      let toast = this.toastCtrl.create({
        message: 'Network Connected',
        duration: 2500,
        position: 'bottom',
        cssClass: "toast-success"
      })

      toast.present();

    });

    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val); //for updating theme
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //Universe Audio
      smartAudio.preload('universe', 'assets/sounds/Universe.mp3');
      smartAudio.preload('universe1', 'assets/sounds/Universe/Universe - In the Beginning.mp3');
      smartAudio.preload('universe2', 'assets/sounds/Universe/Universe - Did life begin in the oceans.mp3');
      smartAudio.preload('universe3', 'assets/sounds/Universe/Universe - The Big Bang theory.mp3');
      smartAudio.preload('universe4', 'assets/sounds/Universe/Universe - The birth of Galaxies.mp3');
      smartAudio.preload('universe5', 'assets/sounds/Universe/Universe - What is space.mp3');
      smartAudio.preload('universe6', 'assets/sounds/Universe/Universe - The Universe.mp3');
      smartAudio.preload('universe7', 'assets/sounds/Universe/Universe - Black Holes.mp3');
      smartAudio.preload('universe8', 'assets/sounds/Universe/Universe - The Mystery of the Dark Universe.mp3');
      smartAudio.preload('universe9', 'assets/sounds/Universe/Universe - Cosmic Distances.mp3');

      //Astronomy Audio
      smartAudio.preload('astronomy', 'assets/sounds/Astronomy.mp3');
      smartAudio.preload('astronomy1', 'assets/sounds/Astronomy/Astronomy - Star Birth.mp3');
      smartAudio.preload('astronomy2', 'assets/sounds/Astronomy/Astronomy - Star Death.mp3');
      smartAudio.preload('astronomy3', 'assets/sounds/Astronomy/Astronomy - Supernova.mp3');
      smartAudio.preload('astronomy4', 'assets/sounds/Astronomy/Astronomy - Dwarves and Supergiants.mp3');
      smartAudio.preload('astronomy5', 'assets/sounds/Astronomy/Astronomy - Galaxies.mp3');
      smartAudio.preload('astronomy6', 'assets/sounds/Astronomy/Astronomy - The Milky Way.mp3');
      smartAudio.preload('astronomy7', 'assets/sounds/Astronomy/Astronomy - Meteors.mp3');
      smartAudio.preload('astronomy8', 'assets/sounds/Astronomy/Astronomy - Comets.mp3');
      smartAudio.preload('astronomy9', 'assets/sounds/Astronomy/Astronomy - Exploring Asterioids.mp3');
      smartAudio.preload('astronomy10', 'assets/sounds/Astronomy/Astronomy - Meteorites.mp3');
      smartAudio.preload('astronomy11', 'assets/sounds/Astronomy/Astronomy - Shooting Stars.mp3');
      smartAudio.preload('astronomy12', 'assets/sounds/Astronomy/Astronomy - SOHO discover thousands of comets.mp3');
      smartAudio.preload('astronomy13', 'assets/sounds/Astronomy/Astronomy - A Diamond in the Sky.mp3');
      smartAudio.preload('astronomy14', 'assets/sounds/Astronomy/Astronomy - Rosetta Makes Friends with a comet.mp3');

      //Solar System Audio
      smartAudio.preload('solarSystem', 'assets/sounds/SolarSystem.mp3');

      //Earth System Audio
      smartAudio.preload('earthSystem', 'assets/sounds/EarthSystem.mp3');


      smartAudio.preload('earthquake', 'assets/sounds/Earthquake.mp3');
      smartAudio.preload('volcano', 'assets/sounds/Volcano.mp3');
      smartAudio.preload('landslide', 'assets/sounds/Landslides.mp3');
      smartAudio.preload('tsunami', 'assets/sounds/Tsunami.mp3');
      smartAudio.preload('mitigation', 'assets/sounds/Mitigation.mp3');
    });

    const authObserver = afAuth.authState.subscribe(user => {
      if (user) {
        this.currentUser = afAuth.auth.currentUser.uid;
        this.currentEmail = afAuth.auth.currentUser.email;
        console.log(this.currentUser);
        this.UserChecker = af.list('/Users/' + this.currentUser + '/', { preserveSnapshot: true });

        this.UserChecker.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            console.log(snapshot.key)
            console.log(snapshot.val())
            this.checkerTest.push(snapshot.val());
          });

          if (this.checkerTest[2] == "false" || this.checkerTest[2] == "false" || this.checkerTest == undefined || this.checkerTest[0] == this.currentEmail) {
            this.nav.setRoot(HomePage);
          }
          else if (this.checkerTest[0] == "false" || this.checkerTest == undefined || this.checkerTest[0] == this.currentEmail) {
            this.nav.setRoot(LearnertestPage);
          }
          else if (this.checkerTest[0] == "true") {
            let toast = this.toastCtrl.create({
              message: 'Welcome Back!',
              duration: 2500,
              position: 'bottom',
              cssClass: "toast-success"
            })
            toast.present();
            this.nav.setRoot(SplashscreenPage);
          }
        })
        authObserver.unsubscribe();
      } else {
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      }
    });
  }
}
