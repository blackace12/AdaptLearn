import { QuizEarthsytemPage } from './../pages/quiz-earthsystem/quiz-earthsystem';
import { QuizMitadaptPage } from './../pages/quiz-mitadapt/quiz-mitadapt';
import { QuizEquakePage } from './../pages/quiz-equake/quiz-equake';
import { QuizVolcanoPage } from './../pages/quiz-volcano/quiz-volcano';
import { QuizTsunamiPage } from './../pages/quiz-tsunami/quiz-tsunami';
import { QuizLslidePage } from './../pages/quiz-lslide/quiz-lslide';
import { QuizSolarsystemPage } from './../pages/quiz-solarsystem/quiz-solarsystem';

import { QuizAstronomyPage } from './../pages/quiz-astronomy/quiz-astronomy';
import { DataProvider } from './../providers/data/data';
import { LessonNaturalTsunamiPage } from './../pages/lesson-natural-tsunami/lesson-natural-tsunami';
import { LessonMitadaptPage } from './../pages/lesson-mitadapt/lesson-mitadapt';
import { LessonEarthEarthsystemPage } from './../pages/lesson-earth-earthsystem/lesson-earth-earthsystem';
import { ProfileModalPage } from './../pages/profile-modal/profile-modal';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { defaultAudioProviderFactory, IonicAudioModule } from 'ionic-audio';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SplashscreenPage } from '../pages/splashscreen/splashscreen';
import { ListPage } from '../pages/list/list';
import { LearnertestPage } from '../pages/learnertest/learnertest';
import { SettingsPage } from '../pages/settings/settings';

import { Network } from '@ionic-native/network';

import { HttpModule } from '@angular/http';

import { VisualLearnerInstructionPage } from '../pages/visual-learner-instruction/visual-learner-instruction';
import { KinestheticLearnerInstructionPage } from '../pages/kinesthetic-learner-instruction/kinesthetic-learner-instruction';
import { VerbalLearnerInstructionPage } from '../pages/verbal-learner-instruction/verbal-learner-instruction';
import { AudioLearnerInstructionPage } from '../pages/audio-learner-instruction/audio-learner-instruction';
import { LogicalLearnerInstructionPage } from '../pages/logical-learner-instruction/logical-learner-instruction';
import { SocialLearnerInstructionPage } from '../pages/social-learner-instruction/social-learner-instruction';
import { SolitaryLearnerInstructionPage } from '../pages/solitary-learner-instruction/solitary-learner-instruction';


import { QuizPage } from '../pages/quiz/quiz';

import { ProfilePage } from '../pages/profile/profile';

import { LessonPage } from '../pages/lesson/lesson';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';

import { LessonEarthPage } from '../pages/lesson-earth/lesson-earth';
import { LessonEarthAstronomyPage } from '../pages/lesson-earth-astronomy/lesson-earth-astronomy';
import { LessonEarthSolarsystemPage } from '../pages/lesson-earth-solarsystem/lesson-earth-solarsystem';
import { LessonEarthUniversePage } from '../pages/lesson-earth-universe/lesson-earth-universe';

import { LessonNaturalPage } from '../pages/lesson-natural/lesson-natural';
import { LessonNaturalEarthquakePage } from '../pages/lesson-natural-earthquake/lesson-natural-earthquake';
import { LessonNaturalVolcanoPage } from '../pages/lesson-natural-volcano/lesson-natural-volcano';
import { LessonNaturalLandslidePage } from '../pages/lesson-natural-landslide/lesson-natural-landslide';

import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'Highcharts';
import { SocialSharing } from '@ionic-native/social-sharing';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { AuthProvider } from '../providers/auth/auth';

// Importing AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireOfflineModule } from 'angularfire2-offline';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FlashCardComponent } from '../components/flash-card/flash-card';
import { SettingsProvider } from '../providers/settings/settings';
import { DataAstronomyProvider } from '../providers/data-astronomy/data-astronomy';
import { DataEarthsystemProvider } from '../providers/data-earthsystem/data-earthsystem';
import { DataSolarsystemProvider } from '../providers/data-solarsystem/data-solarsystem';
import { DataEquakeProvider } from '../providers/data-equake/data-equake';
import { DataLslideProvider } from '../providers/data-lslide/data-lslide';
import { DataTsunamiProvider } from '../providers/data-tsunami/data-tsunami';
import { DataVolcanoProvider } from '../providers/data-volcano/data-volcano';
import { DataMitadaptProvider } from '../providers/data-mitadapt/data-mitadapt';

// For Audio
import { SmartAudioProvider } from '../providers/smart-audio/smart-audio';
import { NativeAudio } from '@ionic-native/native-audio';



const firebaseConfig = {
  apiKey: "AIzaSyBjCiXPIBAfdBrQzVpfiR975VLhvVouUyc",
  authDomain: "adaptlearn-d2fde.firebaseapp.com",
  databaseURL: "https://adaptlearn-d2fde.firebaseio.com",
  projectId: "adaptlearn-d2fde",
  storageBucket: "",
  messagingSenderId: "637972666047"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SplashscreenPage,
    ListPage,
    LearnertestPage,
    VisualLearnerInstructionPage,
    KinestheticLearnerInstructionPage,
    VerbalLearnerInstructionPage,
    AudioLearnerInstructionPage,
    LogicalLearnerInstructionPage,
    SocialLearnerInstructionPage,
    SolitaryLearnerInstructionPage,
    QuizPage,
    ProfilePage,
    LessonPage,
    LoginPage,
    RegisterPage,
    LessonEarthPage,
    LessonEarthAstronomyPage,
    LessonEarthUniversePage,
    LessonEarthSolarsystemPage,
    LessonNaturalPage,
    SettingsPage,
    ForgotpasswordPage,
    LessonNaturalLandslidePage,
    LessonNaturalEarthquakePage,
    LessonNaturalVolcanoPage,
    ProfileModalPage,
    LessonEarthEarthsystemPage,
    LessonMitadaptPage,
    LessonNaturalTsunamiPage,
    FlashCardComponent,
    QuizAstronomyPage,
    QuizSolarsystemPage,
    QuizLslidePage,
    QuizTsunamiPage,
    QuizVolcanoPage,
    QuizEquakePage,
    QuizMitadaptPage,
    QuizEarthsytemPage
  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp), ChartModule.forRoot(highcharts),
    IonicAudioModule.forRoot(defaultAudioProviderFactory),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireOfflineModule,
    AngularFireAuthModule,
    HttpModule,
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SplashscreenPage,
    ListPage,
    LearnertestPage,
    VisualLearnerInstructionPage,
    KinestheticLearnerInstructionPage,
    VerbalLearnerInstructionPage,
    AudioLearnerInstructionPage,
    LogicalLearnerInstructionPage,
    SocialLearnerInstructionPage,
    SolitaryLearnerInstructionPage,
    QuizPage,
    ProfilePage,
    LessonPage,
    LoginPage,
    RegisterPage,
    LessonEarthPage,
    LessonEarthAstronomyPage,
    LessonEarthUniversePage,
    LessonEarthSolarsystemPage,
    LessonNaturalPage,
    SettingsPage,
    ForgotpasswordPage,
    LessonNaturalLandslidePage,
    LessonNaturalEarthquakePage,
    LessonNaturalVolcanoPage,
    ProfileModalPage,
    LessonEarthEarthsystemPage,
    LessonMitadaptPage,
    LessonNaturalTsunamiPage,
    QuizAstronomyPage,
    QuizSolarsystemPage,
    QuizLslidePage,
    QuizTsunamiPage,
    QuizVolcanoPage,
    QuizEquakePage,
    QuizMitadaptPage,
    QuizEarthsytemPage
  ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    SocialSharing,
    Network,
    YoutubeVideoPlayer,
    DataProvider,
    SettingsProvider,
    DataAstronomyProvider,
    DataEarthsystemProvider,
    DataSolarsystemProvider,
    DataEquakeProvider,
    DataLslideProvider,
    DataTsunamiProvider,
    DataVolcanoProvider,
    DataMitadaptProvider,
    SmartAudioProvider,
    NativeAudio
  ]
})
export class AppModule { }
