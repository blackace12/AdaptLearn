import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import firebase from 'firebase/app';
/*
  Generated class for the SettingsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SettingsProvider {

  private theme:BehaviorSubject<String>;
  public currentUser:firebase.User;
  constructor() {

    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.currentUser = user;
      }
    });

    this.theme = new BehaviorSubject('day-theme'); //start theme of the app
  }

  updatePassword(newPassword: string, oldPassword: string): firebase.Promise<any> {
    const credential =  firebase.auth.EmailAuthProvider
      .credential(this.currentUser.email, oldPassword);

    return this.currentUser.reauthenticateWithCredential(credential).then( user => {
      this.currentUser.updatePassword(newPassword).then( user => {
        console.log("Password Changed");
      }, error => {
        console.log(error);
      });
    });
  }

  setActiveTheme(val){
    this.theme.next(val);
  }

  getActiveTheme(){
    return this.theme.asObservable();
  }




}
