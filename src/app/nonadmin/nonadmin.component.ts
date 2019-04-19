import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'angular-web-storage';
import { ClassdataService } from '../classdata.service';

@Component({
  selector: 'app-nonadmin',
  templateUrl: './nonadmin.component.html',
  styleUrls: ['./nonadmin.component.css']
})
export class NonadminComponent implements OnInit {
  currentUser="";
  fullname="";
  username="";
  email="";
  contact="";
  user="";
  isAdmin=false;
  users=[];
    constructor(private _serv:SessionStorageService,private _data:ClassdataService) {
  this.currentUser=this._serv.get('user');
  this.fullname=this._serv.get('user').fullname;
  
  if(this._serv.get('user').username=="kajoltilokchandani")
  {
    this.isAdmin=true;
  }
  
  this._data.getUsers().subscribe(
    list => {
      this.users = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
    });
  
    this.username=this._serv.get('user').username;
    this.email=this._serv.get('user').email;
    this.contact=this._serv.get('user').contact;
  
  
     }
  
  

  ngOnInit() {
  }

}
