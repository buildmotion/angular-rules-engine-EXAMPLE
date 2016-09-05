import { Component } from '@angular/core';
import { Action } from 'angular-rules-engine/action/index';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'app works!';
  myAction: Action;

  constructor(){
    this.myAction = new Action();
    this.myAction.execute();
  }
}
