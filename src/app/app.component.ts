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
      smartAudio.preload('solarSystem1', 'assets/sounds/Solar System/Solar System - Our nearest star.mp3');
      smartAudio.preload('solarSystem2', 'assets/sounds/Solar System/Solar System - The Sun.mp3');
      smartAudio.preload('solarSystem3', 'assets/sounds/Solar System/Solar System - The Solar System and its planets.mp3');
      smartAudio.preload('solarSystem4', 'assets/sounds/Solar System/Solar System - Mercury.mp3');
      smartAudio.preload('solarSystem5', 'assets/sounds/Solar System/Solar System - Venus.mp3');
      smartAudio.preload('solarSystem6', 'assets/sounds/Solar System/Solar System - Earth Traveler in Space.mp3');
      smartAudio.preload('solarSystem7', 'assets/sounds/Solar System/Solar System - Mars the red planet.mp3');
      smartAudio.preload('solarSystem8', 'assets/sounds/Solar System/Solar System - Jupiter.mp3');
      smartAudio.preload('solarSystem9', 'assets/sounds/Solar System/Solar System - Saturn the gas giant.mp3');
      smartAudio.preload('solarSystem10', 'assets/sounds/Solar System/Solar System - Uranus.mp3');
      smartAudio.preload('solarSystem11', 'assets/sounds/Solar System/Solar System - Neptune.mp3');
      smartAudio.preload('solarSystem12', 'assets/sounds/Solar System/Solar System - Pluto.mp3');
      smartAudio.preload('solarSystem13', 'assets/sounds/Solar System/Solar System - The Kiuper Belt.mp3');

      //Earth System Audio
      smartAudio.preload('earthSystem', 'assets/sounds/EarthSystem.mp3');
      smartAudio.preload('earthSystem1', 'assets/sounds/Earth System/Earth System - Earth Systems.mp3');
      smartAudio.preload('earthSystem2', 'assets/sounds/Earth System/Earth System - Lithosphere.mp3');
      smartAudio.preload('earthSystem3', 'assets/sounds/Earth System/Earth System - Hydrosphere.mp3');
      smartAudio.preload('earthSystem4', 'assets/sounds/Earth System/Earth System - Biosphere.mp3');
      smartAudio.preload('earthSystem5', 'assets/sounds/Earth System/Earth System - Atmosphere.mp3');

      //Earthquake Audio
      smartAudio.preload('earthquake', 'assets/sounds/Earthquake.mp3');
      smartAudio.preload('earthquake1', 'assets/sounds/Earthquake/Earthquake - What is an earthquake.mp3');
      smartAudio.preload('earthquake2', 'assets/sounds/Earthquake/Earthquake - What causes earthquakes and where do they happen.mp3');
      smartAudio.preload('earthquake3', 'assets/sounds/Earthquake/Earthquake - Why does the earth shake when there is an earthquake.mp3');

      //Volcanic Eruption Audio
      smartAudio.preload('volcano', 'assets/sounds/Volcano.mp3');
      smartAudio.preload('volcano1', 'assets/sounds/Volcano/Volcano - What is a volcano.mp3');
      smartAudio.preload('volcano2', 'assets/sounds/Volcano/Volcano - How are volcanoes formed.mp3');
      smartAudio.preload('volcano3', 'assets/sounds/Volcano/Volcano - What are the different stages of volcanoes.mp3');
      smartAudio.preload('volcano4', 'assets/sounds/Volcano/Volcano - Why do volcanoes erupt.mp3');
      smartAudio.preload('volcano5', 'assets/sounds/Volcano/Volcano - What are plate tectonics.mp3');
      smartAudio.preload('volcano6', 'assets/sounds/Volcano/Volcano - Different types of volcanoes.mp3');

      //Landslide Audio
      smartAudio.preload('landslide', 'assets/sounds/Landslides.mp3');
      smartAudio.preload('landslide1', 'assets/sounds/Landslides/Landslides - Landslides.mp3');
      smartAudio.preload('landslide2', 'assets/sounds/Landslides/Landslides - Several causes of landslides.mp3');
      smartAudio.preload('landslide3', 'assets/sounds/Landslides/Landslides - People and Landslides.mp3');
      smartAudio.preload('landslide4', 'assets/sounds/Landslides/Landslides - Submarine Landslides.mp3');

      //Tsunami Audio
      smartAudio.preload('tsunami', 'assets/sounds/Tsunami.mp3');
      smartAudio.preload('tsunami1', 'assets/sounds/Tsunami/Tsunami - What causes a tsunami.mp3');
      smartAudio.preload('tsunami2', 'assets/sounds/Tsunami/Tsunami - Subduction zones are potential tsunami locatons.mp3');
      smartAudio.preload('tsunami3', 'assets/sounds/Tsunami/Tsunami - Accumulated seismic energy.mp3');
      smartAudio.preload('tsunami4', 'assets/sounds/Tsunami/Tsunami - Earthquake causes tsunami.mp3');
      smartAudio.preload('tsunami5', 'assets/sounds/Tsunami/Tsunami - Tsunami races away from the epicenter.mp3');
      smartAudio.preload('tsunami6', 'assets/sounds/Tsunami/Tsunami - Tsunamis travel rapidly across ocean basin.mp3');
      smartAudio.preload('tsunami7', 'assets/sounds/Tsunami/Tsunami - Tsunami wave train.mp3');
      
      //Mitigation and Adaptation Audio
      smartAudio.preload('mitigation', 'assets/sounds/Mitigation.mp3');
      smartAudio.preload('mitigation1', 'assets/sounds/Mitigation and Adaptation/Mitigation.mp3');
      smartAudio.preload('mitigation2', 'assets/sounds/Mitigation and Adaptation/Adaptation.mp3');
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
