import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';
/* import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

public http: Http
 */
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {
  x: any;

  constructor(public afAuth: AngularFireAuth) {
     console.log('Hello AuthProvider Provider');
  }

  loginUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword)
       .then(newUser => {
        const x = this.afAuth.auth.currentUser.uid;
        //var x = firebase.auth().currentUser.uid;
        if (x != null) {
          firebase.database().ref('/Users').child(newUser.uid).update({
            Email: newEmail,
          })
        } else {
          firebase.database().ref('/Users').child(newUser.uid)
        }
      })
  }

  resetPassword(email: string): firebase.Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): firebase.Promise<any> {
    return this.afAuth.auth.signOut();
  }



  signupUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
  }

}
