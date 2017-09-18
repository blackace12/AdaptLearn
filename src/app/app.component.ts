import { SplashscreenPage } from './../pages/splashscreen/splashscreen';
import { LoginPage } from '../pages/login/login';
import { Component } from '@angular/core';
import {ToastController, Platform} from 'ionic-angular';
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
  rootPage:any;
  selectedTheme: String;
  Status:any;
  constructor(platform: Platform, afAuth: AngularFireAuth, statusBar: StatusBar, splashScreen: SplashScreen, private settings: SettingsProvider, smartAudio: SmartAudioProvider, private network:Network, public toastCtrl:ToastController) {
    // watch network for a disconnect
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      let toast = this.toastCtrl.create({
        message: 'Network was Disconnected',
        duration: 2500,
        position: 'bottom',
        cssClass:"toast-error"
      });
      toast.present();
    });

    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      let toast = this.toastCtrl.create({
        message: 'Network Connected',
        duration: 2500,
        position: 'bottom',
        cssClass:"toast-success"
      });
      toast.present();
    });

    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val); //for updating theme
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      smartAudio.preload('universe', 'assets/sounds/Universe.mp3');
      smartAudio.preload('astronomy', 'assets/sounds/Astronomy.mp3');
      smartAudio.preload('solarSystem', 'assets/sounds/SolarSystem.mp3');
      smartAudio.preload('earthSystem', 'assets/sounds/EarthSystem.mp3');
      smartAudio.preload('earthquake', 'assets/sounds/Earthquake.mp3');
      smartAudio.preload('volcano', 'assets/sounds/Volcano.mp3');
      smartAudio.preload('landslide', 'assets/sounds/Landslide.mp3');
      smartAudio.preload('tsunami', 'assets/sounds/Tsunami.mp3');
      smartAudio.preload('mitigation', 'assets/sounds/Mitigation.mp3');
    });

    const authObserver = afAuth.authState.subscribe( user => {
      if (user) {

        this.rootPage = SplashscreenPage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      }
    });
  }


}
