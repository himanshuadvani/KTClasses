import { Component } from '@angular/core';
import {SessionStorageService} from 'angular-web-storage';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'KT';

  currentUser;
  constructor(private _session:SessionStorageService)
  {
    this.currentUser=this._session.get('user');
  }
}
