import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { SplashscreenPage } from './../splashscreen/splashscreen';

@Component({
  selector: 'page-learnertest',
  templateUrl: 'learnertest.html',
})
export class LearnertestPage {
  VisualList; AudioList; VerbalList; PhysicalList; LogicalList; SocialList; SolitaryList:string[];
  visualTotal; Visual0; Visual1; Visual2; Visual3; Visual4; Visual5; Visual6; Visual7; Visual8; Visual9:number;
  auduioTotal; Audio0; Audio1; Audio2; Audio3; Audio4; Audio5; Audio6; Audio7; Audio8; Audio9:number;
  verbalTotal; Verbal0; Verbal1; Verbal2; Verbal3; Verbal4; Verbal5; Verbal6; Verbal7; Verbal8; Verbal9:number;
  physicalTotal; Physical0; Physical1; Physical2; Physical3; Physical4; Physical5; Physical6; Physical7; Physical8; Physical9:number;
  logicalTotal; Logical0; Logical1; Logical2; Logical3; Logical4; Logical5; Logical6; Logical7; Logical8; Logical9:number;
  socialTotal; Social0; Social1; Social2; Social3; Social4; Social5; Social6; Social7; Social8; Social9:number;
  solitaryTotal; Solitary0; Solitary1; Solitary2; Solitary3; Solitary4; Solitary5; Solitary6; Solitary7; Solitary8; Solitary9:number;
  audioTotal:any;
  nextDisabled:boolean = true; //to disable next button
  submitDisabled:boolean = true; //to disable next button
  currentUser: any;
  userChecker: any;
  learningStyles: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, af: AngularFireDatabase, afAuth: AngularFireAuth, public alertCtrl: AlertController) {
    this.VisualList = ['You can easily visualize objects, buildings, situations, etc. from plans or descriptions.', 'You navigate well and use maps with ease. You rarely get lost. You have a good sense of direction. You usually know which way is north.',
    'You like using a camera or video camera to capture the world around you.',
    'You like visual arts, painting, sculpture. You like jigsaws and mazes.',
    'You like books with lots of diagrams or illustrations.',
    'You have a good sense of colour.',
    'You draw well, and find yourself drawing or doodling on a notepad when thinking.',
    'You use diagrams and scribbles to communicate ideas and concepts. You love whiteboards (and colour pens).',
    'In school you preferred art, technical drawing, and geometry.',
    'You are a tinkerer. You like pulling things apart, and they usually go back together OK. You can easily follow instructions represented in diagrams.'];

    this.AudioList = ['Jingles, themes or parts of songs pop into your head at rando',
    'You like listening to music - in the car, studying, at work (if possible!).',
    'Music was your favourite subject at school.',
    'You use rhythm or rhyme to remember things, eg phone numbers, passwords, other little sayings.',
    'You pay attention to the sounds of various things. You can tell the difference between instruments, or cars, or aircraft, based on their sound.',
    'You can play a musical instrument or you can sing on (or close to) key.',
    'You occasionally realise you are tapping in time to music, or you naturally start to hum or whistle a tune. Even after only hearing a tune a few times, you can remember it.',
    'You do not like the sound of silence. You would prefer to have some background music or other noises over silence.',
    'You hear small things that others do not.',
    'Music evokes strong emotions and images as you listen to it. Music is prominent in your recall of memories.']

    this.VerbalList = ['In regular conversation you frequently use references to other things you have heard or read.',
    'English, languages and literature were favourite subjects at school.',
    'You love telling stories, metaphors or anecdotes.',
    'You have a great vocabulary, and like using the right word at the right time.',
    'You easily express yourself, whether its verbal or written. You can give clear explanations to others.',
    'You like making puns, saying tongue-twisters, making rhymes.',
    'You like crosswords, play scrabble and word games.',
    'You solve problems by "thinking aloud" - talking through issues, questions, possible solutions etc.',
    'You easily absorb information through reading, audiocassettes or lectures. The actual words come back to you easily.',
    'You can easily visualize (see in your mind) objects, buildings, scenarios etc. from descriptions or plans.']

    this.PhysicalList = ['You love sport and exercise.',
    'You use lots of hand gestures or other physical body language when communicating with others.',
    'You like making models, or working out jigsaws.',
    'In school you liked sports, wood or metal working, craft, sculptures, pottery.',
    'You like the texture and feel of clothes, furniture and other objects.',
    'You like to think out ideas, problems, or issues while doing something physical.',
    'You enjoy dancing.',
    'You love the theme park rides that involve lots of physical action, or you really hate them because you are very sensitive to the effect the physical forces have on your body.',
    'You would prefer to physically touch or handle something to understand how it works.',
    'You are a tinkerer. You like pulling things apart, and they usually go back together OK. You can easily follow instructions represented in diagrams.']

    this.LogicalList = ['You write and use detailed lists, such as to-do lists, and you number the items and set priorities',
    'You prefer math and science subjects at school.',
    'You enjoy finding relationships between numbers and objects. You like to categorise or group things to help you understand the relationships between them.',
    'You can balance a chequebook, and you like to set budgets and other numerical goals.',
    "You like identifying logic flaws in other people's words and actions.",
    'You use specific examples and references to support your points of view.',
    'You like logic games and brainteasers. You like chess and other strategy games.',
    'You easily work with numbers, and can do decent calculations in your head.',
    'You like to understand how and why things work. You keep up to date with science and technology.',
    'You use a specific step-by-step process to work out problems.']

    this.SocialList = ['You enjoy learning in classroom style surroundings with other people. You enjoy the contact and it helps your learning.',
    'You prefer team games and sports such as football/soccer, basketball, netball, volleyball, hockey, and baseball.',
    'You like being a mentor or guide for others.',
    'You communicate well with others and often act as a mediator between them.',
    'You like to listen. People like to talk to you because they feel you understand them.',
    'You have a number of very close friends.',
    'You prefer to talk over problems, issues, or ideas with others, rather than working on them by yourself.',
    'You like playing games with others, such as cards and board games.',
    'You like getting out of the house and being with others at parties and other social events.',
    'You are OK with taking the lead and showing others the way ahead.']

    this.SolitaryList = ['You have a personal or private interest or hobby that you like to do alone.',
    'You are happy on your own. You like to do some activities alone and away from others.',
    'You are goal oriented and know where you want to go in life, study or work.',
    'You prefer to study or work alone.',
    'You spend time alone to reflect and think about important aspects of your life.',
    'You keep a journal or personal diary to record your thoughts.',
    'You would prefer to holiday on a deserted island rather than a resort or cruise ship with lots of other people around.',
    'You read self-help books, or have been to self-help workshops or done similar work to learn more about yourself.',
    'You prefer to work for yourself - or you have thought a lot about it.',
    'You think independently. You know how you think and you make up your own mind. You understand your own strengths and weaknesses.']

    this.currentUser = afAuth.auth.currentUser.uid;
    console.log(this.currentUser);
    this.learningStyles = af.list('/LearningStyle/' + this.currentUser + '/LearningStyle/');
    this.userChecker = af.list('/Users/');
  }

  Button = [0, 1, 2];

  //Assigns every select to the appropriate variable
  visualSelect(i,btn){
    if(i===0){
      this.Visual0 = btn;
      console.log("Visual0:" + this.Visual0);
    } else if (i===1){
      this.Visual1 = btn;
      console.log("Visual1:" + this.Visual1);
    } else if (i===2){
      this.Visual2 = btn;
      console.log("Visual2:" + this.Visual2);
    } else if (i===3){
      this.Visual3 = btn;
      console.log("Visual3:" + this.Visual3);
    } else if (i===4){
      this.Visual4 = btn;
      console.log("Visual4:" + this.Visual4);
    } else if (i===5){
      this.Visual5 = btn;
      console.log("Visual5:" + this.Visual5);
    } else if (i===6){
      this.Visual6 = btn;
      console.log("Visual6:" + this.Visual6);
    } else if (i===7){
      this.Visual7 = btn;
      console.log("Visual7:" + this.Visual7);
    } else if (i===8){
      this.Visual8 = btn;
      console.log("Visual8:" + this.Visual8);
    } else if (i===9){
      this.Visual9 = btn;
      console.log("Visual9:" + this.Visual9);
    }
    this.visualNull();
  }

  //Checks if a radio button is not selected for a question
  visualNull(){
    if(this.Visual0 != undefined && this.Visual1 != undefined && this.Visual2 != undefined && this.Visual3 != undefined && this.Visual4 != undefined && this.Visual5 != undefined && this.Visual6 != undefined && this.Visual7 != undefined && this.Visual8 != undefined && this.Visual9 != undefined){
      this.nextDisabled = false;
    } else {
      console.log("Visual is equal to undefined");
    }
  }

  audioSelect(i,btn){
    if(i===0){
      this.Audio0 = btn;
      console.log("Audio0:" + this.Audio0);
    } else if (i===1){
      this.Audio1 = btn;
      console.log("Audio1:" + this.Audio1);
    } else if (i===2){
      this.Audio2 = btn;
      console.log("Audio2:" + this.Audio2);
    } else if (i===3){
      this.Audio3 = btn;
      console.log("Audio3:" + this.Audio3);
    } else if (i===4){
      this.Audio4 = btn;
      console.log("Audio4:" + this.Audio4);
    } else if (i===5){
      this.Audio5 = btn;
      console.log("Audio5:" + this.Audio5);
    } else if (i===6){
      this.Audio6 = btn;
      console.log("Audio6:" + this.Audio6);
    } else if (i===7){
      this.Audio7 = btn;
      console.log("Audio7:" + this.Audio7);
    } else if (i===8){
      this.Audio8 = btn;
      console.log("Audio8:" + this.Audio8);
    } else if (i===9){
      this.Audio9 = btn;
      console.log("Audio9:" + this.Audio9);
    }
    this.audioNull();
  }

  audioNull(){
    if(this.Audio0 != undefined && this.Audio1 != undefined && this.Audio2 != undefined && this.Audio3 != undefined && this.Audio4 != undefined && this.Audio5 != undefined && this.Audio6 != undefined && this.Audio7 != undefined && this.Audio8 != undefined && this.Audio9 != undefined){
      this.nextDisabled = false;
    } else {
      console.log("Audio is equal to undefined");
    }
  }

  verbalSelect(i,btn){
    if(i===0){
      this.Verbal0 = btn;
      console.log("Verbal0:" + this.Verbal0);
    } else if (i===1){
      this.Verbal1 = btn;
      console.log("Verbal1:" + this.Verbal1);
    } else if (i===2){
      this.Verbal2 = btn;
      console.log("Verbal2:" + this.Verbal2);
    } else if (i===3){
      this.Verbal3 = btn;
      console.log("Verbal3:" + this.Verbal3);
    } else if (i===4){
      this.Verbal4 = btn;
      console.log("Verbal4:" + this.Verbal4);
    } else if (i===5){
      this.Verbal5 = btn;
      console.log("Verbal5:" + this.Verbal5);
    } else if (i===6){
      this.Verbal6 = btn;
      console.log("Verbal6:" + this.Verbal6);
    } else if (i===7){
      this.Verbal7 = btn;
      console.log("Verbal7:" + this.Verbal7);
    } else if (i===8){
      this.Verbal8 = btn;
      console.log("Verbal8:" + this.Verbal8);
    } else if (i===9){
      this.Verbal9 = btn;
      console.log("Verbal9:" + this.Verbal9);
    }
    this.verbalNull();
  }

  verbalNull(){
    if(this.Verbal0 != undefined && this.Verbal1 != undefined && this.Verbal2 != undefined && this.Verbal3 != undefined && this.Verbal4 != undefined && this.Verbal5 != undefined && this.Verbal6 != undefined && this.Verbal7 != undefined && this.Verbal8 != undefined && this.Verbal9 != undefined){
      this.nextDisabled = false;
    } else {
      console.log("Verbal is equal to undefined");
    }
  }

  physicalSelect(i,btn){
    if(i===0){
      this.Physical0 = btn;
      console.log("Physical0:" + this.Physical0);
    } else if (i===1){
      this.Physical1 = btn;
      console.log("Physical1:" + this.Physical1);
    } else if (i===2){
      this.Physical2 = btn;
      console.log("Physical2:" + this.Physical2);
    } else if (i===3){
      this.Physical3 = btn;
      console.log("Physical3:" + this.Physical3);
    } else if (i===4){
      this.Physical4 = btn;
      console.log("Physical4:" + this.Physical4);
    } else if (i===5){
      this.Physical5 = btn;
      console.log("Physical5:" + this.Physical5);
    } else if (i===6){
      this.Physical6 = btn;
      console.log("Physical6:" + this.Physical6);
    } else if (i===7){
      this.Physical7 = btn;
      console.log("Physical7:" + this.Physical7);
    } else if (i===8){
      this.Physical8 = btn;
      console.log("Physical8:" + this.Physical8);
    } else if (i===9){
      this.Physical9 = btn;
      console.log("Physical9:" + this.Physical9);
    }
    this.physicalNull();
  }

  physicalNull(){
    if(this.Physical0 != undefined && this.Physical1 != undefined && this.Physical2 != undefined && this.Physical3 != undefined && this.Physical4 != undefined && this.Physical5 != undefined && this.Physical6 != undefined && this.Physical7 != undefined && this.Physical8 != undefined && this.Physical9 != undefined){
      this.nextDisabled = false;
    } else {
      console.log("Physical is equal to undefined");
    }
  }

  logicalSelect(i,btn){
    if(i===0){
      this.Logical0 = btn;
      console.log("Logical0:" + this.Logical0);
    } else if (i===1){
      this.Logical1 = btn;
      console.log("Logical1:" + this.Logical1);
    } else if (i===2){
      this.Logical2 = btn;
      console.log("Logical2:" + this.Logical2);
    } else if (i===3){
      this.Logical3 = btn;
      console.log("Logical3:" + this.Logical3);
    } else if (i===4){
      this.Logical4 = btn;
      console.log("Logical4:" + this.Logical4);
    } else if (i===5){
      this.Logical5 = btn;
      console.log("Logical5:" + this.Logical5);
    } else if (i===6){
      this.Logical6 = btn;
      console.log("Logical6:" + this.Logical6);
    } else if (i===7){
      this.Logical7 = btn;
      console.log("Logical7:" + this.Logical7);
    } else if (i===8){
      this.Logical8 = btn;
      console.log("Logical8:" + this.Logical8);
    } else if (i===9){
      this.Logical9 = btn;
      console.log("Logical9:" + this.Logical9);
    }
    this.logicalNull();
  }

  logicalNull(){
    if(this.Logical0 != undefined && this.Logical1 != undefined && this.Logical2 != undefined && this.Logical3 != undefined && this.Logical4 != undefined && this.Logical5 != undefined && this.Logical6 != undefined && this.Logical7 != undefined && this.Logical8 != undefined && this.Logical9 != undefined){
      this.nextDisabled = false;
    } else {
      console.log("Logical is equal to undefined");
    }
  }

  socialSelect(i,btn){
    if(i===0){
      this.Social0 = btn;
      console.log("Social0:" + this.Social0);
    } else if (i===1){
      this.Social1 = btn;
      console.log("Social1:" + this.Social1);
    } else if (i===2){
      this.Social2 = btn;
      console.log("Social2:" + this.Social2);
    } else if (i===3){
      this.Social3 = btn;
      console.log("Social3:" + this.Social3);
    } else if (i===4){
      this.Social4 = btn;
      console.log("Social4:" + this.Social4);
    } else if (i===5){
      this.Social5 = btn;
      console.log("Social5:" + this.Social5);
    } else if (i===6){
      this.Social6 = btn;
      console.log("Social6:" + this.Social6);
    } else if (i===7){
      this.Social7 = btn;
      console.log("Social7:" + this.Social7);
    } else if (i===8){
      this.Social8 = btn;
      console.log("Social8:" + this.Social8);
    } else if (i===9){
      this.Social9 = btn;
      console.log("Social9:" + this.Social9);
    }
    this.socialNull();
  }

  socialNull(){
    if(this.Social0 != undefined && this.Social1 != undefined && this.Social2 != undefined && this.Social3 != undefined && this.Social4 != undefined && this.Social5 != undefined && this.Social6 != undefined && this.Social7 != undefined && this.Social8 != undefined && this.Social9 != undefined){
      this.nextDisabled = false;
    } else {
      console.log("Social is equal to undefined");
    }
  }

  solitarySelect(i,btn){
    if(i===0){
      this.Solitary0 = btn;
      console.log("Solitary0:" + this.Solitary0);
    } else if (i===1){
      this.Solitary1 = btn;
      console.log("Solitary1:" + this.Solitary1);
    } else if (i===2){
      this.Solitary2 = btn;
      console.log("Solitary2:" + this.Solitary2);
    } else if (i===3){
      this.Solitary3 = btn;
      console.log("Solitary3:" + this.Solitary3);
    } else if (i===4){
      this.Solitary4 = btn;
      console.log("Solitary4:" + this.Solitary4);
    } else if (i===5){
      this.Solitary5 = btn;
      console.log("Solitary5:" + this.Solitary5);
    } else if (i===6){
      this.Solitary6 = btn;
      console.log("Solitary6:" + this.Solitary6);
    } else if (i===7){
      this.Solitary7 = btn;
      console.log("Solitary7:" + this.Solitary7);
    } else if (i===8){
      this.Solitary8 = btn;
      console.log("Solitary8:" + this.Solitary8);
    } else if (i===9){
      this.Solitary9 = btn;
      console.log("Solitary9:" + this.Solitary9);
    }
    this.solitaryNull();
  }

  solitaryNull(){
    if(this.Solitary0 != undefined && this.Solitary1 != undefined && this.Solitary2 != undefined && this.Solitary3 != undefined && this.Solitary4 != undefined && this.Solitary5 != undefined && this.Solitary6 != undefined && this.Solitary7 != undefined && this.Solitary8 != undefined && this.Solitary9 != undefined){
      //this.nextDisabled = false;
      this.SolitaryTotal();
      this.submitDisabled = false;
    } else {
      console.log("Solitary is equal to undefined");
    }
  }

  public VisualTotal(){
    this.visualTotal = this.Visual0 + this.Visual1 + this.Visual2 + this.Visual3 + this.Visual4 + this.Visual5 + this.Visual6 + this.Visual7 + this.Visual8 + this.Visual9;
    console.log("Visual Total:" + this.visualTotal);
  }

  public AudioTotal(){
    this.audioTotal = this.Audio0 + this.Audio1 + this.Audio2 + this.Audio3 + this.Audio4 + this.Audio5 + this.Audio6 + this.Audio7 + this.Audio8 + this.Audio9;
    console.log("Audio Total:" + this.audioTotal);
  }

  public VerbalTotal(){
    this.verbalTotal = this.Verbal0 + this.Verbal1 + this.Verbal2 + this.Verbal3 + this.Verbal4 + this.Verbal5 + this.Verbal6 + this.Verbal7 + this.Verbal8 + this.Verbal9;
    console.log("Verbal Total:" + this.verbalTotal);
  }

  public PhysicalTotal(){
    this.physicalTotal = this.Physical0 + this.Physical1 + this.Physical2 + this.Physical3 + this.Physical4 + this.Physical5 + this.Physical6 + this.Physical7 + this.Physical8 + this.Physical9;
    console.log("Physical Total:" + this.physicalTotal);
  }

  public LogicalTotal(){
    this.logicalTotal = this.Logical0 + this.Logical1 + this.Logical2 + this.Logical3 + this.Logical4 + this.Logical5 + this.Logical6 + this.Logical7 + this.Logical8 + this.Logical9;
    console.log("Logical Total:" + this.logicalTotal);
  }

  public SocialTotal(){
    this.socialTotal = this.Social0 + this.Social1 + this.Social2 + this.Social3 + this.Social4 + this.Social5 + this.Social6 + this.Social7 + this.Social8 + this.Social9;
    console.log("Social Total:" + this.socialTotal);
  }

  public SolitaryTotal(){
    this.solitaryTotal = this.Solitary0 + this.Solitary1 + this.Solitary2 + this.Solitary3 + this.Solitary4 + this.Solitary5 + this.Solitary6 + this.Solitary7 + this.Solitary8 + this.Solitary9;
    console.log("Solitary Total:" + this.solitaryTotal);
  }

  /* Hide learning styles test by group */
  public hideNext: boolean = true;
  public hideSubmit: boolean = false;
  public hide1: boolean = true;
  public hide2: boolean = false;
  public hide3: boolean = false;
  public hide4: boolean = false;
  public hide5: boolean = false;
  public hide6: boolean = false;
  public hide7: boolean = false;

  public page1() {
    this.hide1 = true;
    this.hide2 = false;
    this.hide3 = false;
    this.hide4 = false;
    this.hide5 = false;
    this.hide6 = false;
    this.hide7 = false;
  }

  public page2() {
    this.hide2 = true;
    this.hide1 = false;
    this.hide3 = false;
    this.hide4 = false;
    this.hide5 = false;
    this.hide6 = false;
    this.hide7 = false;

  }

  public page3() {
    this.hide3 = true;
    this.hide1 = false;
    this.hide2 = false;
    this.hide4 = false;
    this.hide5 = false;
    this.hide6 = false;
    this.hide7 = false;
  }

  public page4() {
    this.hide4 = true;
    this.hide1 = false;
    this.hide2 = false;
    this.hide3 = false;
    this.hide5 = false;
    this.hide6 = false;
    this.hide7 = false;
  }

  public page5() {
    this.hide5 = true;
    this.hide1 = false;
    this.hide2 = false;
    this.hide3 = false;
    this.hide4 = false;
    this.hide6 = false;
    this.hide7 = false;
  }

  public page6() {
    this.hide6 = true;
    this.hide1 = false;
    this.hide2 = false;
    this.hide3 = false;
    this.hide4 = false;
    this.hide5 = false;
    this.hide7 = false;
  }

  public page7() {
    this.hide7 = true;
    this.hide1 = false;
    this.hide2 = false;
    this.hide3 = false;
    this.hide4 = false;
    this.hide5 = false;
    this.hide6 = false;
  }

  public currentpage = 1;

  public next() {
    this.nextDisabled = true;
    this.VisualTotal();
    this.AudioTotal();
    this.VerbalTotal();
    this.PhysicalTotal();
    this.LogicalTotal();
    this.SocialTotal();
    this.SolitaryTotal();
    if(this.currentpage != 7){
      this.currentpage += 1;
      console.log("Current Page:" + this.currentpage);
      if (this.currentpage == 1){
        this.page1();
      } else if (this.currentpage == 2){
        this.page2();
      } else if (this.currentpage == 3){
        this.page3();
      } else if (this.currentpage == 4){
        this.page4();
      } else if (this.currentpage == 5){
        this.page5();
      } else if (this.currentpage == 6){
        this.page6();
      } else if (this.currentpage == 7){
        this.page7();
        this.hideNext = !this.hideNext
        this.hideSubmit = !this.hideSubmit;
      }
    }
  }

  submit(){
    var AudioTotal = this.audioTotal;
    console.log("Audio Total: " + AudioTotal);
    var LogicalTotal = this.logicalTotal;
    console.log("Logical Total: " + LogicalTotal);
    var PhysicalTotal = this.physicalTotal;
    console.log("Physical Total: " + PhysicalTotal);
    var SocialTotal = this.socialTotal;
    console.log("Social Total: " + SocialTotal);
    var SolitaryTotal = this.solitaryTotal;
    console.log("Solitary Total: " + SolitaryTotal);
    var VerbalTotal = this.verbalTotal;
    console.log("Verbal Total: " + VerbalTotal);
    var VisualTotal = this.visualTotal;
    console.log("Visual Total: " + VisualTotal);

    const checker = true;

    let confirm = this.alertCtrl.create({
      title: 'Confirm form Submission?',
      buttons: [{
        text: 'No',
        handler: () => {
          console.log('No Clicked');
        }
      },
      {
        text: 'Yes',
        handler: data => {
          this.learningStyles.push({ style: "Auditory", value: AudioTotal });
          this.learningStyles.push({ style: "Logical", value: LogicalTotal });
          this.learningStyles.push({ style: "Physical", value: PhysicalTotal });
          this.learningStyles.push({ style: "Social", value: SocialTotal });
          this.learningStyles.push({ style: "Solitary", value: SolitaryTotal });
          this.learningStyles.push({ style: "Visual", value: VisualTotal });
          this.learningStyles.push({ style: "Verbal", value: VerbalTotal });
          this.userChecker.update( this.currentUser, { Checker: 'true' });
          this.navCtrl.push(SplashscreenPage);
        }
      }
      ]
    });
    confirm.present();
  }
}
