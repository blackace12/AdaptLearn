import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataSolarsystemProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataSolarsystemProvider {

  data: any;
  constructor(public http: Http) {
    console.log('Hello DataProvider Provider');
  }

  load(){

        if(this.data){
         return Promise.resolve(this.data);
        }

        return new Promise(resolve => {

        this.http.get('assets/data/questionsSolar.json').map(res => res.json()).subscribe(data => {
             this.data = data.questions;
             resolve(this.data);
             });
           });
       }



}
