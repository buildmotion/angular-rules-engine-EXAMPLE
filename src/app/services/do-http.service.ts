import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Thing} from './../shared/models/index';

@Injectable()
export class DoHttpService {

  constructor() { }
  data: Observable<Thing>;
  /**
   * Use this function to emulate a web api call to save information.
   */
  public saveSomething(thing: Thing){
    this.data = new Observable<Thing>(observer => {
     setTimeout(() => {
              observer.name = 'do: ' + thing.name;
              observer.isDone = true;
              observer.createDate = new Date();
          }, 1000);
    });
    return this.data;
  }
}
